"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@repo/ui";
import { Brain, Menu, X } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white/80 via-white/60 to-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Brain className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-bold text-primary">MathQuest</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              How it Works
            </Link>
            <Link
              href="/pricing"
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              Blog
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <SignedIn>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 text-white rounded-full px-6">
                  Go to Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="text-gray-600 hover:text-primary transition-all rounded-full px-5">
                  Log in
                </Button>
              </SignInButton>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 text-white rounded-full px-6">
                  Get Started
                </Button>
              </Link>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden mt-4 space-y-4 pb-4 border-t border-gray-200 pt-4">
            <Link
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-primary font-medium"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-primary font-medium"
            >
              How it Works
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-primary font-medium"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-primary font-medium"
            >
              Blog
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <SignedIn>
                <Link href="/dashboard">
                  <Button className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 text-white rounded-full">
                    Go to Dashboard
                  </Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button className="w-full text-gray-700 hover:text-primary rounded-full">
                    Log in
                  </Button>
                </SignInButton>
                <Link href="/signup">
                  <Button className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 text-white rounded-full">
                    Get Started
                  </Button>
                </Link>
              </SignedOut>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
