"use client";

import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ThemeProvider } from "../components/theme-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const { isSignedIn, user, isLoaded } = useUser();
    if(!isSignedIn && isLoaded) {
       redirect("/");
    }
  return (
     <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      disableTransitionOnChange={true}
    >
    <main className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <div className="flex flex-1">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </main>
    </ThemeProvider>
  );
}
