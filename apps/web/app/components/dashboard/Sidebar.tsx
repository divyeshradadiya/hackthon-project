"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, MoonIcon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";

const sidebarItems = [
  { icon: "🏠", name: "Home", href: "/" },
  { icon: "📚", name: "My Courses", href: "/courses" },
  { icon: "📖", name: "Learn", href: "/learn" },
  { icon: "🧠", name: "Quiz Me", href: "/quiz" },
  { icon: "📈", name: "Dashboard", href: "/dashboard" },
  { icon: "⚙️", name: "Settings", href: "/settings" },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { theme, setTheme } = useTheme();

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <aside
      className={`h-screen transition-all duration-300 ease-in-out flex flex-col border-r ${
        isOpen ? "w-64" : "w-20"
      } bg-white text-gray-900 dark:bg-gray-900 dark:text-white`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 border-gray-200">
        {isOpen && (
          <h1 className="text-xl font-bold tracking-tight whitespace-nowrap">
            Maths Platform
          </h1>
        )}
        <button
          onClick={toggleSidebar}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {sidebarItems.map(({ icon, name, href }) => (
            <li key={name}>
              <Link
                href={href}
                className="flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-lg">{icon}</span>
                <span className={`${!isOpen && "hidden"} whitespace-nowrap`}>
                  {name}
                </span>
              </Link>
            </li>
          ))}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-xl text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            title="Toggle Dark Mode"
          >
            {theme === "dark" ? <Sun /> : <MoonIcon />}
          </button>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
