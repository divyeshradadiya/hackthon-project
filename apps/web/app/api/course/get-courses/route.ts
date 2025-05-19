import { currentUser } from "@clerk/nextjs/server";
import { getCourses } from "@repo/database/src/actions/course-action";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();

  try {
    const courses = await getCourses(user?.id!);
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
