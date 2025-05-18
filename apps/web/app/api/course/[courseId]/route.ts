import { auth } from '@clerk/nextjs/server';
import { courses, db, modules } from '@repo/database';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const courseId = url.pathname.split('/').pop();

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
