interface Module {
  id: string;
  title: string;
  completed?: boolean; // Add this optional property
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
    <div className="w-80 border-r border-gray-200/10 dark:border-gray-800 bg-white/50 dark:bg-black/90 backdrop-blur-sm flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200/10 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Course Content</h2>
        <div className="mt-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>{completedModules} of {modules.length} completed</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-600 dark:bg-primary-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Modules List */}
      <nav className="flex-1 overflow-y-auto custom-scrollbar-thin p-4">
        <ul className="space-y-2">
          {modules.map((mod, idx) => (
            <li key={mod.id}>
              <button
                onClick={() => onSelectModule(mod.id)}
                className={`group w-full text-left px-4 py-3 rounded-xl transition-all duration-200 
                  ${selectedModuleId === mod.id
                    ? "bg-gray-100 dark:bg-gray-900/20 ring-1 ring-primary-500/20"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
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
                        ? "text-primary-900 dark:text-primary-100"
                        : "text-gray-900 dark:text-gray-100"
                    }`}>
                      {mod.title}
                    </p>
                    {/* Optional estimated time or status */}
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
