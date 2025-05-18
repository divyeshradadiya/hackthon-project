interface ModuleHeaderProps {
  title: string;
}

export function ModuleHeader({ title }: ModuleHeaderProps) {
  return (
    <header className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-[#111113] backdrop-blur-sm">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
        {title}
      </h1>
    </header>
  );
}
