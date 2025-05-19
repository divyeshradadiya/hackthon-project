import { OpenAI } from "openai";
import { and, eq } from "drizzle-orm";
import { courses, modules } from "../schema";
import { db } from "..";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface CreateCourseInput {
  learningInput: string;
  userId: string;
}

interface ModuleSummary {
  title: string;
  description: string;
}

export async function createCourse({ learningInput, userId }: CreateCourseInput) {
  if (!learningInput || typeof learningInput !== "string") {
    throw new Error("learningInput is required");
  }

  // -------- Phase 1: Generate module titles and summaries --------
  const listPrompt = `
You are an expert AI course generator.

Based on the learning input "${learningInput}", create modules that are best suited for learning.

Return **only** a JSON array of objects, each with:
- "title": short module title
- "description": one-line summary

Do **not** include details yet, and do **not** wrap in Markdown fences.
  `.trim();

  const listResp = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: listPrompt }],
    max_completion_tokens: 14000,
  });

  let rawList = (listResp.choices[0]?.message?.content ?? "[]")
    .trim()
    .replace(/^```(?:json)?\s*/, "")
    .replace(/\s*```$/, "");

  const moduleList: ModuleSummary[] = JSON.parse(rawList);
  if (!Array.isArray(moduleList) || moduleList.length === 0) {
    throw new Error("AI returned invalid module list");
  }

  // -------- Phase 2: Insert course and placeholder modules --------
  const [course] = await db
    .insert(courses)
    .values({
      title: `Intro to ${learningInput}`,
      learningInput,
      userId,
    })
    .returning();

  if (!course?.id) throw new Error("Course insertion failed");

  const insertedModules = await db
    .insert(modules)
    .values(
      moduleList.map((m) => ({
        title: m.title,
        description: m.description,
        content: "",
        courseId: course.id,
        createdAt: new Date(),
      }))
    )
    .returning();

  // -------- Phase 3: Generate detailed content for each module --------
  const makeDetails = async () => {
    const detailsPrompt = `
You are an expert AI course generator.
Provide detailed and well-structured Markdown content for each module.
You may use code blocks, lists, tables, charts, and other Markdown features, and include appropriate links.
Do not include the module's title or description in the details.

Here is the list of ${moduleList.length} modules (title & summary):
${JSON.stringify(moduleList, null, 2)}

Now return **only** a JSON object with exactly this shape:
{
  "details": [
    "Detailed Markdown for module 1, with all backslashes \\\\ and quotes \\" properly escaped.",
    ... (one entry per module, in the same order)
  ]
}

- **Important**: Escape all backslashes and quotation marks so that this is valid JSON.
    `.trim();

    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_completion_tokens: 14000,
      messages: [{ role: "user", content: detailsPrompt }],
    });

    let raw = (resp.choices[0]?.message?.content ?? "")
      .trim()
      .replace(/^```(?:json)?\s*/, "")
      .replace(/\s*```$/, "");

    // Sanitize stray backslashes before parsing
    raw = raw.replace(/\\(?!["\\/bfnrtu])/g, "\\\\");

    const parsed = JSON.parse(raw) as { details?: string[] };
    if (!parsed.details || !Array.isArray(parsed.details)) {
      throw new Error("AI did not return a valid details array");
    }
    return parsed.details;
  };

  const detailsArray = await makeDetails();

  // -------- Phase 4: Update modules with detailed content --------
  await Promise.all(
    insertedModules.map((mod, idx) =>
      db
        .update(modules)
        .set({ content: detailsArray[idx] })
        .where(eq(modules.id, mod.id))
    )
  );

  // -------- Final: Return full course data --------
  return {
    courseId: course.id,
    title: course.title,
    learningInput: course.learningInput,
    createdAt: course.createdAt,
    modules: insertedModules.map((m, idx) => ({
      title: m.title,
      description: m.description,
      details: detailsArray[idx],
    })),
  };
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