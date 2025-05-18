import { auth } from "@clerk/nextjs/server";
import { deleteCourse } from "@repo/database";


export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const courseId = url.searchParams.get("courseId");

  if (!courseId) {
    return new Response("Course ID is required", { status: 400 });
  }

  const {userId } = await auth()
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    await deleteCourse(courseId, userId);
    return new Response("Course deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting course:", error);
    return new Response("Error deleting course", { status: 500 });
  }
}