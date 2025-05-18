import { currentUser } from "@clerk/nextjs/server";
import { courses, db, modules } from "@repo/database";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();

  try {
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
          // description: modules.description,
          // content: modules.content,
        },
      })
      .from(courses)
      .leftJoin(modules, eq(modules.courseId, courses.id))
      .where(eq(courses.userId, user?.id!))
      .execute();

    if (!allCourses || allCourses.length === 0) {
      return NextResponse.json({ courses: [] });
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

    return NextResponse.json(
      Array.from(coursesMap.values())
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
