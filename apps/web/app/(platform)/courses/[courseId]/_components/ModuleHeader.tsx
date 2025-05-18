interface ModuleHeaderProps {
  title: string;
}

export function ModuleHeader({ title }: ModuleHeaderProps) {
  return (
    <header className="px-6 py-4 border-b border-gray-200/10 dark:border-gray-800 bg-white/50 dark:bg-black/90 backdrop-blur-sm">
      <h1 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
        {title}
      </h1>
    </header>
  );
}
