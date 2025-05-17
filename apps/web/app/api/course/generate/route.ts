import { currentUser } from '@clerk/nextjs/server';
import { courses, db, modules } from '@repo/database';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  // 1. Auth
  const user = await currentUser();
  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Input validation
  const { learningInput } = await req.json();
  if (!learningInput || typeof learningInput !== 'string') {
    return NextResponse.json({ error: 'learningInput is required' }, { status: 400 });
  }

  // 3. New prompt: title + description + details
  const prompt = `
You are an expert AI course generator.

Create a course titled "Intro to ${learningInput}", you can make max **15 modules**.
For each module, return an object with three properties:
1. "title": a short, clear module title
2. "description": a one-sentence summary of what the module covers
3. "details": a detailed, Markdown-formatted explanation (examples,tables, code snippets, diagrams) — tailored to the module topic

Return **only** a JSON array of these objects like:

[
  {
    "title": "Module 1 Title",
    "description": "A one-line summary of module 1.",
    "details": "## Module 1\\nHere goes your in-depth Markdown content..."
  },
  …
]

 Return **only** the raw JSON array — do not wrap it in markdown code fences.
 `;

  try {
    // 4. Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });


    let raw = completion.choices?.[0]?.message?.content ?? '[]';

    // ── STRIP MARKDOWN FENCES ───────────────────────────────
    // Remove any leading/trailing ``` or ```json fences
    raw = raw.trim()
      .replace(/^```(?:json)?\s*/, '')
      .replace(/\s*```$/, '');


    // 5. Parse response
    let moduleArray: Array<{
      title: string;
      description: string;
      details: string;
    }>;
    try {
      moduleArray = JSON.parse(raw);
      if (!Array.isArray(moduleArray)) throw new Error('AI did not return an array');
    } catch (err) {
      console.error('AI parse error:', raw);
      return NextResponse.json({ error: 'Invalid AI response format' }, { status: 500 });
    }

    // 6. Insert course
    const [course] = await db
      .insert(courses)
      .values({
        title: `Intro to ${learningInput}`,
        learningInput,
        userId: user.id,
      })
      .returning();

    if (!course?.id) {
      throw new Error('Course insertion failed');
    }

    // 7. Insert modules (ensure your `modules` table has `description` and `content` columns)
    await db.insert(modules).values(
      moduleArray.map((mod) => ({
        title: mod.title,
        description: mod.description,
        content: mod.details,   // store "details" under your `content` column
        courseId: course.id,
      }))
    );

    // 8. Return the full payload
    return NextResponse.json({
      courseId: course.id,
      title: course.title,
      learningInput: course.learningInput,
      createdAt: course.createdAt,
      modules: moduleArray,
    });
  } catch (error) {
    console.error('Route error:', error);
    return NextResponse.json({ error: 'Could not generate and save course in-depth' }, { status: 500 });
  }
}
