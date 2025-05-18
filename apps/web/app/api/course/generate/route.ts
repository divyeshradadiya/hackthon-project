import { currentUser } from "@clerk/nextjs/server";
import { createCourse } from "@repo/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
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

    // 2. Create course using the database action
    const result = await createCourse({
      learningInput,
      userId: user.id,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json(
      { error: "Course generation failed", rawError: (err as Error).message },
      { status: 500 }
    );
  }
}
