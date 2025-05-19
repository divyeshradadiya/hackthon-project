"use client";

import Link from "next/link"
import { Button } from "@repo/ui/button"
import { Brain, Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <h1 className="text-xl font-bold tracking-tight whitespace-nowrap flex-1 text-center">
            <span className="text-green-600">Selflearn</span>.AI
          </h1>
            </div>
            <p className="text-neutral-gray text-sm mb-6">
              Transform your math learning journey with AI. Interactive lessons, games, and rewards make learning fun and effective.
            </p>
            <div className="mb-6">
              <h5 className="font-medium text-dark-gray mb-2">Join our newsletter</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Button className="bg-primary hover:bg-primary/90">Subscribe</Button>
              </div>
            </div>
            <div className="flex space-x-4">
              {[
                { icon: <span>𝕏</span>, label: "Twitter" },
                { icon: "f", label: "Facebook" },
                { icon: "in", label: "LinkedIn" },
                { icon: "yt", label: "YouTube" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-neutral-gray hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  {typeof social.icon === 'string' ? (
                    <span className="text-sm font-medium">{social.icon}</span>
                  ) : (
                    social.icon
                  )}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-dark-gray mb-4">Product</h4>
            <ul className="space-y-2">
              {[
                "Features",
                "Pricing",
                "Testimonials",
                "Parents Guide",
                "Teacher Resources"
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-neutral-gray hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-dark-gray mb-4">Resources</h4>
            <ul className="space-y-2">
              {[
                "Help Center",
                "Tutorial Videos",
                "Math Blog",
                "Community",
                "Success Stories"
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-neutral-gray hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-dark-gray mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                "About Us",
                "Careers",
                "Press Kit",
                "Contact",
                "Terms & Privacy"
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-neutral-gray hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-neutral-gray mb-4 md:mb-0">
            © 2025 selfLearn.AI. All rights reserved.
          </div>
          <div className="flex items-center gap-8">
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-neutral-gray hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-sm text-neutral-gray hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-neutral-gray hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-neutral-gray" />
              <select className="text-sm text-neutral-gray bg-transparent border-none focus:outline-none cursor-pointer">
                <option value="en">English (US)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
