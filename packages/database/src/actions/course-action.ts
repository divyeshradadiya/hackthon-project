import { OpenAI } from "openai";
import { and, eq } from "drizzle-orm";
import { courses, modules } from "../schema";
import { db } from "..";
import { z } from 'zod';
import { zodTextFormat } from 'openai/helpers/zod';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface CreateCourseInput {
  learningInput: string;
  userId: string;
}

const ModuleSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const ModuleListSchema = z.object({
  modules: z.array(ModuleSchema)
});

const ModuleContentSchema = z.object({
  details: z.array(z.string())
});

// Add retry utility
const retry = async <T>(fn: () => Promise<T>, attempts = 3): Promise<T> => {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === attempts - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Retry failed');
};

export async function createCourse({ learningInput, userId }: CreateCourseInput) {
  if (!learningInput?.trim()) {
    throw new Error("learningInput is required");
  }

  try {
    // Phase 1: Generate modules with improved prompts
    const moduleListResult = await retry(async () => {
      const systemPrompt = `You are an expert course creator. Create well-structured, comprehensive learning modules.`;
      const listPrompt = `
Create 5-8 learning modules for "${learningInput}".
Ensure modules follow a logical learning progression.
Return a JSON array of modules with clear titles and descriptions.`.trim();

      const listResp = await openai.responses.create({
        model: "gpt-4o-mini",
        max_output_tokens: 14000,
        input: [
          { role: "system", content: systemPrompt },
          { role: "user", content: listPrompt }
        ],
        text: { format: zodTextFormat(ModuleListSchema, 'modules') }
      });

      const parsed = ModuleListSchema.parse(JSON.parse(listResp.output_text));
      if (!parsed.modules?.length) throw new Error("No modules generated");
      return parsed.modules;
    });

    // Insert course
    const [course] = await db
      .insert(courses)
      .values({
        title: `${learningInput}`,
        learningInput,
        userId,
      })
      .returning();

    if (!course?.id) throw new Error("Course insertion failed");

    // Insert modules
    const insertedModules = await db
      .insert(modules)
      .values(
        moduleListResult.map((m) => ({
          title: m.title,
          description: m.description,
          content: "",
          courseId: course.id,
          createdAt: new Date(),
        }))
      )
      .returning();

    // Generate content with improved prompts
    const detailsArray = await retry(async () => {
      const systemPrompt = `You are an expert content creator. Create detailed, engaging educational content.`;
      const detailsPrompt = `
Create detailed markdown content for each module about "${learningInput}".
Each module's content must be in a separate item, in the same order, with minimal overlap.
Modules: ${JSON.stringify(moduleListResult, null, 2)}

Return a JSON array of strings, one string per module in order.
`.trim();

      const resp = await openai.responses.create({
        model: "gpt-4o-mini",
                max_output_tokens: 14000,
        input: [
          { role: "system", content: systemPrompt },
          { role: "user", content: detailsPrompt }
        ],
        text: { format: zodTextFormat(ModuleContentSchema, 'details') }
      });

      const parsed = ModuleContentSchema.parse(JSON.parse(resp.output_text));
      if (!parsed.details?.length) throw new Error("No content generated");
      return parsed.details;
    });    // Update modules with content sequentially to maintain order
    const updatedModules = [];
    for (let i = 0; i < insertedModules.length; i++) {
      if (!insertedModules[i]) {
        return null;
      }
      const result = await db
        .update(modules)
        .set({ content: detailsArray[i] || '' })
        .where(eq(modules.id, insertedModules[i]!.id))
        .returning();
      
      if (!result[0]) {
        throw new Error(`Failed to update module at index ${i}`);
      }
      updatedModules.push(result[0]);
    }

    return {
      courseId: course.id,
      title: course.title,
      learningInput: course.learningInput,
      createdAt: course.createdAt,
      modules: updatedModules.map(m => ({
        id: m.id,
        title: m.title,
        description: m.description,
        content: m.content,
      })),
    };

  } catch (error) {
    console.error('Course creation error:', error);
    throw new Error(`Failed to create course: ${(error as Error).message}`);
  }
}


export async function deleteCourse(courseId: string, userId: string) {
  if (!courseId || !userId) {
    throw new Error("courseId and userId are required");
  }

  // Ensure the course belongs to the user
  const course = await db
    .select()
    .from(courses)
    .where(and(eq(courses.id, courseId), eq(courses.userId, userId)))
    .then(rows => rows[0]);

  if (!course) {
    throw new Error("Course not found or access denied");
  }

  // Delete modules and return deleted rows
  const deletedModules = await db
    .delete(modules)
    .where(eq(modules.courseId, courseId))
    .returning();

  // Delete the course and return deleted row
  const deletedCourse = await db
    .delete(courses)
    .where(eq(courses.id, courseId))
    .returning();

  return { success: true, deletedCourse, deletedModules };
}

export async function updateModuleContent(moduleId: string, content: string, userId: string) {
  if (!moduleId || !content || !userId) {
    throw new Error("moduleId, content and userId are required");
  }

  const moduleWithCourse = await db
    .select({
      moduleId: modules.id,
      courseUserId: courses.userId,
    })
    .from(modules)
    .innerJoin(courses, eq(modules.courseId, courses.id))
    .where(eq(modules.id, moduleId))
    .then(rows => rows[0]);

  if (!moduleWithCourse) {
    throw new Error("Module not found");
  }

  if (moduleWithCourse.courseUserId !== userId) {
    throw new Error("Access denied");
  }

  // Update the module content
  const [updatedModule] = await db
    .update(modules)
    .set({ content })
    .where(eq(modules.id, moduleId))
    .returning();

  return updatedModule;
}

export async function getCourses(userId: string) {
  if (!userId) {
    throw new Error("userId is required");
  }

  const allCourses = await db
    .select({
      courses: {
        id: courses.id,
        title: courses.title,
        learningInput: courses.learningInput,
        createdAt: courses.createdAt,
      },
      modules: {
        id: modules.id,
        title: modules.title,
      },
    })
    .from(courses)
    .leftJoin(modules, eq(modules.courseId, courses.id))
    .where(eq(courses.userId, userId)).
    orderBy(courses.createdAt)
    .execute();

  if (!allCourses || allCourses.length === 0) {
    return [];
  }

  // Group courses and their modules
  const coursesMap = new Map();

  allCourses.forEach((result) => {
    if (!result.courses) return;

    if (!coursesMap.has(result.courses.id)) {
      coursesMap.set(result.courses.id, {
        courseId: result.courses.id,
        title: result.courses.title,
        learningInput: result.courses.learningInput,
        createdAt: result.courses.createdAt,
        moduleCount: 0,
      });
    }

    if (result.modules) {
      coursesMap.get(result.courses.id).moduleCount += 1;
    }
  });

  return Array.from(coursesMap.values());
}