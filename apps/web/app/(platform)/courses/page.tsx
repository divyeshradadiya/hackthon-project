"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateCourse, useAllCourses } from "@/app/services/course-service";
import { format } from "date-fns";

export default function CreateCoursePage() {
  const [topic, setTopic] = useState("");
  const { data: courses, isLoading } = useAllCourses();
  const router = useRouter();

  console.log("Courses:", courses);
  if (!courses && !isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400">
          No courses available.
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 h-full">
      {/* Header Section */}
      <div className="flex flex-col px-6 py-2">
        <div className="mb-4 mt-2 flex items-center justify-between">
          <div className="flex gap-6 text-[16px] text-gray-600 dark:text-gray-300">
            <button className="text-blue-700 dark:text-blue-400">
              COURSES
            </button>
          </div>
          <div className="flex space-x-4">
            <button className="rounded-[8px] px-4 py-1 text-sm text-gray-700 dark:text-gray-300">
              All Tags
            </button>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="rounded-[8px] border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              placeholder="Search courses..."
            />
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <span className="text-gray-500 dark:text-gray-400">
            Loading courses...
          </span>
        </div>
      )}

      {/* Courses Grid Section */}
      {!isLoading && (
        <div className="flex-1 overflow-y-auto px-6 py-2 pt-3">
          <div className="grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Create Course Card */}
            <div
              className="flex h-[180px] cursor-pointer flex-col rounded-xl border border-gray-300 bg-gray-200 p-4 shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:shadow-none dark:hover:shadow-md"
              onClick={() => router.push("/courses/create")}
            >
              <div className="mb-2 flex items-center justify-between text-[12px]">
                <div className="flex items-center">
                  <div className="mr-4 h-10 w-10 rounded-[8px] bg-gray-100 text-center text-2xl text-blue-700 dark:bg-gray-700 dark:text-blue-400">
                    +
                  </div>
                  <h2 className="flex flex-col text-gray-800 dark:text-gray-200">
                    <span className="text-[14px] font-semibold text-blue-700 dark:text-blue-400">
                      Create new modules
                    </span>
                  </h2>
                </div>
              </div>
              <p className="mt-6 text-[12px] text-gray-600 dark:text-gray-400">
                Generate an AI-powered modules on any topic you want to learn with visuals, examples, and more.
              </p>
            </div>

            {(courses ?? []).map((course) => (
              <div
                key={course.courseId}
                className="relative h-[180px] cursor-pointer rounded-xl border bg-white p-4 shadow transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:shadow-none dark:hover:shadow-md"
                onClick={() => router.push(`/courses/${course.courseId}`)}
              >
                <div className="flex items-center justify-start">
                  <span className="mr-2 flex h-10 w-10 items-center justify-center rounded-[8px] bg-blue-100 dark:bg-blue-700/70">
                    📚
                  </span>
                  <h2 className="flex flex-col text-gray-800 dark:text-gray-200">
                    <span className="break-words text-[14px] font-semibold">
                        {course.title.length > 40 ? course.title.slice(0, 40) + "..." : course.title}
                    </span>
                    <span className="text-[12px] text-gray-500">
                      {course.createdAt &&
                        format(new Date(course.createdAt), "MMM d, yyyy")}
                    </span>
                  </h2>
                </div>
                <p className="mt-2 text-[12px] text-gray-600 dark:text-gray-400">
                  {course.moduleCount} modules
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
