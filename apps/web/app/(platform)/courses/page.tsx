'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateCourse } from '@/app/services/course-service';

const examplePrompts = [
  'Python for Beginners',
  'Machine Learning Basics',
  'Web Development with React',
  'Data Structures & Algorithms',
  'Introduction to Databases',
];

export default function CreateCoursePage() {
  const [topic, setTopic] = useState('');
  const { mutate, isPending } = useCreateCourse();
  const router = useRouter();

  const handleGenerate = () => {
    if (!topic.trim()) return;
    mutate(topic.trim(), {
      onSuccess: (data) => {
        router.push(`/courses/${data.courseId}`);
      },
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Create Your AI Course
        </h1>
      </header>

      {/* Main */}
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Prompt Input */}
          <textarea
            rows={2}
            placeholder="What do you want to learn?"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          />

          {/* Example Chips */}
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((p) => (
              <button
                key={p}
                onClick={() => setTopic(p)}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!topic.trim() || isPending}
            className="flex items-center justify-center w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isPending ? 'Generating…' : 'Generate Course'}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
        Powered by AI Course Generator
      </footer>
    </div>
  );
}
