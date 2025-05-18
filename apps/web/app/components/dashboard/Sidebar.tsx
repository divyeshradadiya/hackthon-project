'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, MoonIcon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { icon: '🏠', name: 'Home', href: '/dashboard' },
  { icon: '➕', name: 'Create a Module', href: '/courses/create' },
  { icon: '📚', name: 'My Modules', href: '/courses' },
  // { icon: '📖', name: 'Learning', href: '/learning' },
  { icon: '🧠', name: 'Quiz Me', href: '/quiz' },
  { icon: '⚙️', name: 'Settings', href: '/settings' },
  { icon: '🔙', name: 'Go to Home Page', href: '/' }
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <div
      className={`h-screen transition-all duration-300 ease-in-out flex flex-col border-r dark:border-[#383838] bg-white text-gray-900 dark:bg-[#111113] dark:text-white ${
        isOpen ? 'w-52' : 'w-20'
      } `}
    >
      {/* Header */}
      <div className="flex items-center p-4 border-b dark:border-[#383838] border-gray-200">
        <button
          onClick={toggleSidebar}
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none mr-2"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        {isOpen && (
          <h1 className="text-xl font-bold tracking-tight whitespace-nowrap flex-1 text-center">
            <span className="text-green-600">Selflearn</span>.AI
          </h1>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {sidebarItems.map(({ icon, name, href }) => (
            <li key={name}>
              <Link
                href={href}
                className={`flex items-center justify-start px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${!isOpen ? 'justify-center' : 'justify-start'}
                  ${pathname === href 
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                <span className="text-lg">{icon}</span>
                <span className={`${!isOpen && 'hidden'} whitespace-nowrap ml-3`}>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer - center items */}
      <div className="p-4 border-t dark:border-gray-700 border-gray-200">
        <div className="flex items-center justify-center gap-2">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
