interface Module {
  id: string;
  title: string;
  completed?: boolean;
}

interface ModuleSidebarProps {
  modules: Module[];
  selectedModuleId: string | null;
  onSelectModule: (moduleId: string) => void;
}

export function ModuleSidebar({ modules, selectedModuleId, onSelectModule }: ModuleSidebarProps) {
  const completedModules = modules.filter(m => m.completed).length;
  const progress = (completedModules / modules.length) * 100;

  return (
    <div className="w-80 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111113] flex flex-col">
      {/* Sidebar Header */}
      <div className="p-3 border-b border-[#ECECEC] dark:border-[#333333]">
        <div className="rounded-xl bg-gray-100 dark:bg-[#1f1f21] shadow-sm border border-[#ECECEC] dark:border-[#111113] p-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-[#ECECEC]">Course Content</h2>
          <div className="mt-2">
        <div className="flex justify-between text-sm text-gray-700 dark:text-[#ECECEC] mb-2">
          <span>{completedModules} of {modules.length} completed</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-[#d1d1d1] dark:bg-[#111113] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#10B981] dark:bg-[#10B981] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar-thin p-4 bg-white dark:bg-[#111113]">
        <ul className="space-y-2">
          {modules.map((mod, idx) => (
            <li key={mod.id}>
              <button
                onClick={() => onSelectModule(mod.id)}
                className={`group w-full text-left px-4 py-3 rounded-xl transition-all duration-200 
                  ${selectedModuleId === mod.id
                    ? "bg-gray-100 dark:bg-gray-900 ring-1 ring-gray-500"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
              >
                <div className="flex items-center">
                  <div className={`
                    flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg
                    ${selectedModuleId === mod.id
                      ? "bg-gray-200 text-black dark:text-white dark:bg-gray-800"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }
                    group-hover:scale-105 transition-transform duration-200
                  `}>
                    {mod.completed ? "✓" : idx + 1}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className={`text-sm font-medium ${
                      selectedModuleId === mod.id
                        ? "text-gray-900 dark:text-gray-100"
                        : "text-gray-900 dark:text-gray-100"
                    }`}>
                      {mod.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {mod.completed ? "Completed" : "Not started"}
                    </p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
