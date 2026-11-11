"use client";

import Image from "next/image";
import { Search, Bell, Menu, Plus } from "lucide-react";

interface TopHeaderProps {
    onOpenMobileMenu?: () => void;
}

export default function TopHeader({ onOpenMobileMenu }: TopHeaderProps) {

    return (
        <header className="fixed w-full top-0 left-0 lg:pl-72 z-30 border-b border-white/5 bg-[#0f0f12]/95 backdrop-blur-md">

            {/* Main Header Row */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                {/* Left Area: Mobile Menu Toggle + Search Bar */}
                <div className="flex items-center gap-3">
                    {/* Mobile Menu Toggle Button */}
                    <button
                        type="button"
                        onClick={onOpenMobileMenu}
                        aria-label="Open sidebar menu"
                        className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-[#16161a] text-gray-300 transition-colors hover:text-white lg:hidden"
                    >
                        <Menu className="size-4.5" />
                    </button>

                    {/* Search Bar Input */}
                    <div className="relative flex items-center">
                        <Search className="pointer-events-none absolute left-3 size-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search jobs, companies, or skills..."
                            className="w-52 rounded-xl border border-white/10 bg-[#16161a] py-2 pl-9 pr-3.5 text-xs text-white placeholder:text-gray-500 transition-all focus:w-64 focus:border-white/25 focus:outline-none sm:w-72 sm:text-sm sm:focus:w-80"
                        />
                    </div>
                </div>

                {/* Right Area: Notifications, Upload Resume & Profile Avatar */}
                <div className="flex items-center gap-2.5 sm:gap-3.5">
                    {/* Notifications Icon Button */}
                    <button
                        type="button"
                        aria-label="Notifications"
                        className="relative flex size-9 items-center justify-center rounded-xl text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                    >
                        <Bell className="size-4.5" />
                        {/* Green notification dot indicator */}
                        <span className="absolute right-2 top-2 size-2 rounded-full bg-emerald-400" />
                    </button>

                    {/* Upload Resume Button */}
                    <button
                        type="button"
                        className="hidden items-center gap-1.5 rounded-xl border border-white/10 bg-[#16161a] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-white/10 sm:inline-flex"
                    >
                        <Plus className="size-3.5" />
                        <span>Upload Resume</span>
                    </button>

                    {/* User Profile Avatar */}
                    <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 ring-2 ring-white/10">
                        <Image
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                            alt="User"
                            width={32}
                            height={32}
                            unoptimized
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}