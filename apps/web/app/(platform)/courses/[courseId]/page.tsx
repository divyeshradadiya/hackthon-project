"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCourse, useUpdateModuleProgress, useUpdateModuleContent } from "@/app/services/course-service";
import { Markdown } from "@/app/components/Markdown";
import { ModuleHeader } from "./_components/ModuleHeader";
import { ModuleSidebar } from "./_components/ModuleSidebar";
import { ModuleNavigation } from "./_components/ModuleNavigation";
import { useProgressStore } from "@/app/store/progress-store";
import { toast } from "sonner";
import { Check } from "lucide-react";

export default function ClientCoursePage() {
  const { courseId } = useParams();
  const { data, isLoading, isError, refetch } = useCourse(courseId as string);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { mutate: updateProgress } = useUpdateModuleProgress();
  const { mutate: updateContent } = useUpdateModuleContent();
  const { setModuleProgress, getModuleProgress, getCourseProgress } = useProgressStore();

  useEffect(() => {
    if (!selectedModuleId && data?.modules && data.modules.length > 0) {
      setSelectedModuleId(data.modules[0]?.id ?? null);
    }
  }, [selectedModuleId, data?.modules]);

  if (!courseId) {
    return <div className="p-6 text-red-600">Course ID is missing</div>;
  }

  if (isLoading) return <div className="p-6">Loading course…</div>;
  if (isError || !data || !data.modules)
    return <div className="p-6 text-red-600">Course not found</div>;

  const selectedModule = selectedModuleId
    ? data.modules.find((mod) => mod.id === selectedModuleId)
    : null;

  const currentModuleIndex = selectedModuleId
    ? data.modules.findIndex((mod) => mod.id === selectedModuleId)
    : -1;

  const handleModuleComplete = () => {
    if (!selectedModuleId) return;
    const newState = !getModuleProgress(selectedModuleId)?.completed;
    setModuleProgress(selectedModuleId, newState);
    updateProgress({ moduleId: selectedModuleId, completed: newState });
  };

  const handlePreviousModule = () => {
    if (currentModuleIndex > 0) {
      const prevModule = data.modules[currentModuleIndex - 1];
      if (prevModule) {
        setSelectedModuleId(prevModule.id);
      }
    }
  };

  const handleNextModule = () => {
    if (currentModuleIndex < data.modules.length - 1) {
      const nextModule = data.modules[currentModuleIndex + 1];
      if (nextModule) {
        setSelectedModuleId(nextModule.id);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f9f9f9] dark:bg-[#1E1E20]">
      <ModuleHeader title={data.title} />

      <div className="flex flex-1 overflow-hidden">
        <ModuleSidebar
          modules={data.modules}
          selectedModuleId={selectedModuleId}
          onSelectModule={setSelectedModuleId}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <div className={`flex-1 flex flex-col overflow-hidden bg-white dark:bg-[#1E1E20] backdrop-blur-sm`}>
          {selectedModule ? (
            <>
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar-thin">
                <div className="max-w-5xl mx-auto">
                  <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-200/10 dark:border-gray-800">
                    <h2 className="text-2xl font-bold">{selectedModule.title}</h2>
                    <button
                      onClick={handleModuleComplete}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                        getModuleProgress(selectedModule.id)?.completed
                          ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      {getModuleProgress(selectedModule.id)?.completed ? "Completed" : "Mark as Complete"}
                    </button>
                  </div>
                  {selectedModule.description && (
                    <p className="text-sm italic text-gray-600 dark:text-gray-400 mb-6">
                      {selectedModule.description}
                    </p>
                  )}
                  {selectedModule.content ? (
                    <div className="dark:text-[#ECECEC]">
                      <Markdown
                        editable={true}
                        onSave={async (content) => {
                          try {
                            await updateContent({ moduleId: selectedModule.id, content });
                            // Add a small delay before refetching to ensure the update is processed
                            setTimeout(async () => {
                              await refetch();
                            }, 500);
                            toast.success("Content saved successfully");
                          } catch (error) {
                            toast.error("Failed to save content");
                            console.error("Error saving content:", error);
                            throw error; // Re-throw to keep editor open
                          }
                        }}
                      >
                        {selectedModule.content}
                      </Markdown>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      No detailed content available.
                    </p>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-[#1E1E20]">
                <div className="max-w-5xl mx-auto">
                  <ModuleNavigation
                    onPrevious={handlePreviousModule}
                    onNext={handleNextModule}
                    hasPrevious={currentModuleIndex > 0}
                    hasNext={currentModuleIndex < data.modules.length - 1}
                    previousTitle={currentModuleIndex > 0 ? data.modules[currentModuleIndex - 1]?.title ?? '' : ''}
                    nextTitle={currentModuleIndex < data.modules.length - 1 ? data.modules[currentModuleIndex + 1]?.title ?? '' : ''}
                  />
                </div>
              </div>
            </>
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
