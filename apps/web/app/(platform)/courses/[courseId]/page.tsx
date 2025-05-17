'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChevronDown } from 'lucide-react';
import { useCourse } from '@/app/services/course-service';
import { Markdown } from '@/app/components/Markdown';

export default function ClientCoursePage() {
  const { courseId } = useParams();
  if (!courseId) {
    return <div className="p-6 text-red-600">Course ID is missing</div>;
  }

  const { data, isLoading, isError } = useCourse(courseId as string);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  if (isLoading) return <div className="p-6">Loading course…</div>;
  if (isError || !data) return <div className="p-6 text-red-600">Course not found</div>;

  const selectedModule = data.modules.find(mod => mod.id === selectedModuleId);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-200/10 dark:border-gray-800 bg-white/50 dark:bg-black/90 backdrop-blur-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          {data.title}
        </h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-200/10 dark:border-gray-800 overflow-y-auto custom-scrollbar-thin bg-white/50 dark:bg-black/90 backdrop-blur-sm">
          <nav className="p-4">
            <ul className="space-y-1.5">
              {data.modules.map((mod, idx) => (
                <li key={mod.id}>
                  <button
                    onClick={() => setSelectedModuleId(mod.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      selectedModuleId === mod.id
                        ? 'bg-primary/10 dark:bg-gray-800 shadow-lg shadow-primary/5 dark:shadow-black/40'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 dark:bg-gray-800 text-primary-600 dark:text-primary-300 text-sm font-medium">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {mod.title}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar-thin bg-white/30 dark:bg-black/90 backdrop-blur-sm">
          {selectedModule ? (
            <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200/10 dark:border-gray-800">
                {selectedModule.title}
              </h2>
              {selectedModule.description && (
                <p className="text-sm italic text-gray-600 dark:text-gray-400 mb-6">
                  {selectedModule.description}
                </p>
              )}
              {selectedModule.content ? (
                <div className="bg-white/50 dark:bg-gray-950 rounded-xl shadow-xl shadow-gray-200/20 dark:shadow-black/40">
                  <Markdown>{selectedModule.content}</Markdown>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No detailed content available.
                </p>
              )}
            </div>
          ) : (
            
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3">
                <div className="text-gray-400 dark:text-gray-500 text-lg font-medium">
                  Select a module to begin
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose a module from the sidebar to view its content
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
