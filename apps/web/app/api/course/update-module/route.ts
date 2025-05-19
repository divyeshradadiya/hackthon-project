import { updateModuleContent } from "@repo/database";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { moduleId, content } = body;

    if (!moduleId || !content) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const updatedModule = await updateModuleContent(moduleId, content, userId);

    return NextResponse.json(updatedModule);
  } catch (error) {
    console.error("[MODULE_UPDATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
