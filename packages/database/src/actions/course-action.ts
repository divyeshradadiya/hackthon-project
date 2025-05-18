import { courses, db, modules } from "..";
import { OpenAI } from "openai";
import { eq } from "drizzle-orm";

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

  // 1. Phase-1: get module titles & summaries
  const listPrompt = `
You are an expert AI course generator.

Based on the learning input "${learningInput}", create modules that are best suited for learning.

Return **only** a JSON array of objects, each with:
- "title": short module title
- "description": one-line summary

Do **not** include details yet, and do **not** wrap in Markdown fences.
`;

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

  // 2. Insert course + placeholder modules
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
      }))
    )
    .returning();

  // 3. Phase-2: Generate detailed content for modules
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
`;

    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_completion_tokens: 14000,
      messages: [{ role: "user", content: detailsPrompt }],
    });

    let raw = (resp.choices[0]?.message?.content ?? "")
      .trim()
      .replace(/^```(?:json)?\s*/, "")
      .replace(/\s*```$/, "");

    // Sanitize stray backslashes before parse
    raw = raw.replace(/\\(?!["\\/bfnrtu])/g, "\\\\");

    const parsed = JSON.parse(raw) as { details?: string[] };
    if (!parsed.details || !Array.isArray(parsed.details)) {
      throw new Error("AI did not return a valid details array");
    }
    return parsed.details;
  };

  const detailsArray = await makeDetails();

  // 4. Update modules with generated content
  await Promise.all(
    insertedModules.map((mod, idx) =>
      db
        .update(modules)
        .set({ content: detailsArray[idx] })
        .where(eq(modules.id, mod.id))
    )
  );

  // 5. Return the complete course data
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