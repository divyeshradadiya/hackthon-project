interface Module {
  id: string;
  title: string;
}

interface ModuleSidebarProps {
  modules: Module[];
  selectedModuleId: string | null;
  onSelectModule: (moduleId: string) => void;
}

export function ModuleSidebar({ modules, selectedModuleId, onSelectModule }: ModuleSidebarProps) {
  return (
    <div className="w-80 border-r border-gray-200/10 dark:border-gray-800 overflow-y-auto custom-scrollbar-thin bg-white/50 dark:bg-black/90 backdrop-blur-sm">
      <nav className="p-4">
        <ul className="space-y-1.5">
          {modules.map((mod, idx) => (
            <li key={mod.id}>
              <button
                onClick={() => onSelectModule(mod.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                  selectedModuleId === mod.id
                    ? "bg-primary/10 dark:bg-gray-800 shadow-lg shadow-primary/5 dark:shadow-black/40"
                    : "hover:bg-gray-100 dark:hover:bg-gray-900"
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
  );
}
