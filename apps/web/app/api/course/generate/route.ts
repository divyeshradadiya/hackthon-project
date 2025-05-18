import { currentUser } from "@clerk/nextjs/server";
import { courses, db, modules } from "@repo/database";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { eq } from "drizzle-orm";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  // 1. Auth & input validation
  const user = await currentUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { learningInput } = await req.json();
  if (!learningInput || typeof learningInput !== "string") {
    return NextResponse.json(
      { error: "learningInput is required" },
      { status: 400 }
    );
  }

  // 2. Phase-1: get module titles & summaries
  const listPrompt = `
You are an expert AI course generator.

Based on the learning input "${learningInput}", create modules that are best suited for learning.

Return **only** a JSON array of objects, each with:
- "title": short module title
- "description": one-line summary

Do **not** include details yet, and do **not** wrap in Markdown fences.
`;
  try {
    const listResp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: listPrompt }],
      max_completion_tokens: 14000, // Adjust as needed for your use case
    });

    let rawList = (listResp.choices[0]?.message?.content ?? "[]")
      .trim()
      .replace(/^```(?:json)?\s*/, "")
      .replace(/\s*```$/, "");

    const moduleList: Array<{ title: string; description: string }> =
      JSON.parse(rawList);
    if (!Array.isArray(moduleList) || moduleList.length === 0) {
      throw new Error("AI returned invalid module list");
    }

    // 3. Insert course + placeholder modules
    const [course] = await db
      .insert(courses)
      .values({
        title: `Intro to ${learningInput}`,
        learningInput,
        userId: user.id,
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

    // 4. Phase-2: batch generate details, asking the model to properly escape for JSON
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
// - **Do not** wrap in code fences.
      const resp = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        // tools: [ { type: "web_search_preview" } ],
        max_completion_tokens : 14000,
        messages: [{ role: "user", content: detailsPrompt }],
      });

      let raw = (resp.choices[0]?.message?.content ?? "")
        .trim()
        .replace(/^```(?:json)?\s*/, "")
        .replace(/\s*```$/, "");

      // Sanitize stray backslashes before parse:
      // Replace any "\" that isn’t followed by a valid escape char with "\\"
      raw = raw.replace(/\\(?!["\\/bfnrtu])/g, "\\\\");

      const parsed = JSON.parse(raw) as { details?: string[] };
      if (!parsed.details || !Array.isArray(parsed.details)) {
        throw new Error("AI did not return a valid details array");
      }
      return parsed.details;
    };

    // First attempt
    let detailsArray = await makeDetails();


    // // Retry once if the length doesn’t match
    // if (detailsArray.length !== insertedModules.length) {
    //   console.warn(
    //     `Length mismatch: expected ${insertedModules.length}, got ${detailsArray.length}. Retrying once.`
    //   );
    //   detailsArray = await makeDetails();
    // }

    // // Final fallback: pad/truncate
    // if (detailsArray.length !== insertedModules.length) {
    //   console.error(
    //     `Final mismatch: expected ${insertedModules.length}, got ${detailsArray.length}. Padding/truncating.`
    //   );
    //   detailsArray = detailsArray.slice(0, insertedModules.length);
    //   while (detailsArray.length < insertedModules.length) {
    //     detailsArray.push("");
    //   }
    // }

    console.log('detailed---', detailsArray)

    // 5. Bulk‐update modules with returned details
    await Promise.all(
      insertedModules.map((mod, idx) =>
        db
          .update(modules)
          .set({ content: detailsArray[idx] })
          .where(eq(modules.id, mod.id))
      )
    );

    // 6. Return the full payload
    return NextResponse.json({
      courseId: course.id,
      title: course.title,
      learningInput: course.learningInput,
      createdAt: course.createdAt,
      modules: insertedModules.map((m, idx) => ({
        title: m.title,
        description: m.description,
        details: detailsArray[idx],
      })),
    });
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json(
      { error: "Course generation failed", rawError: (err as Error).message },
      { status: 500 }
    );
  }
}
