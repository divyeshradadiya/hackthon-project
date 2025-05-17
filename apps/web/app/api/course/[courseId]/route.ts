import { currentUser } from '@clerk/nextjs/server';
import { courses, db, modules } from '@repo/database';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  const courseId = params?.courseId;

  if (!courseId) {
    return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });
  }
  const results = await db
    .select()
    .from(courses)
    .where(eq(courses.id, courseId))
    .leftJoin(modules, eq(modules.courseId, courses.id))
    .execute();

  if (!results || results.length === 0) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }

  

  // Group modules for the course
  const courseData = results[0]?.courses;
  const modulesList = results
    .filter(r => r.modules)
    .map(r => r.modules);

    if (!courseData) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
  const course = {
    courseId: courseData.id,
    title: courseData.title,
    learningInput: courseData.learningInput,
    createdAt: courseData.createdAt,
    modules: modulesList,
  };

  if (!course) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }

  return NextResponse.json(course);
}
