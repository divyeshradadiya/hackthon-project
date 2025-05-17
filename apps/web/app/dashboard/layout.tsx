'use client';

import React from "react";
import Sidebar from "../components/dashboard/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {    
    return (
        <main className="min-h-screen flex flex-col bg-gray-50">
            {/* <Header /> */}
            <div className="flex flex-1">
                <div className="sticky top-0 h-screen">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-y-auto">{children}</div>
            </div>
        </main>
    );
}