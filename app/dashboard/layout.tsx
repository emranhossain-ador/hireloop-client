"use client";

import { useState } from "react";
import DashboardSidebar from "./layouts/sidebar";
import TopHeader from "./layouts/topHeader";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#0a0a0c] text-white">
            {/* Sidebar Component */}
            <DashboardSidebar
                mobileOpen={mobileOpen}
                onCloseMobile={() => setMobileOpen(false)}
            />

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-x-hidden">
                {/* Top Header Component */}
                <TopHeader onOpenMobileMenu={() => setMobileOpen(true)} />

                {/* Dashboard Page View */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
