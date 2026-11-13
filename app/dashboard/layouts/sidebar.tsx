"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { seekerNavItems } from "@/app/dashboard/seeker/seekerNavItems";
import { adminNavItems } from "@/app/dashboard/admin/adminNavItems";
import { recruiterNavItems } from "@/app/dashboard/recruiter/recruiterNavItems";

import {
    LucideIcon,
    X,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";

interface SidebarProps {
    mobileOpen?: boolean;
    onCloseMobile?: () => void;
}

interface NavItem {
    name: string;
    href: string;
    icon: LucideIcon;
}

export default function DashboardSidebar({
    mobileOpen = false,
    onCloseMobile,
}: SidebarProps) {
    const pathname = usePathname();

    const session = useSession();

    const userRole = session?.data?.user?.role;

    const navItems: NavItem[] = [];

    if (userRole === "admin") {
        navItems.push(...adminNavItems);
    } else if (userRole === "recruiter") {
        navItems.push(...recruiterNavItems);
    } else if (userRole === "seeker") {
        navItems.push(...seekerNavItems);
    }

    // user info 
    const user = session?.data?.user;

    const sidebarContent = (
        <div className="flex h-full flex-col justify-between p-5">
            {/* Top Area: Logo + Profile + Navigation */}
            <div>
                {/* Logo and close button on mobile */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-start gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/images/logo.png"
                                width={34}
                                height={34}
                                alt="HireLoop"
                                className="h-8 w-auto object-contain"
                            />
                        </Link>
                        <span className="text-sm font-normal tracking-wide text-white">
                            Admin Console
                        </span>
                    </div>

                    {onCloseMobile && (
                        <button
                            type="button"
                            onClick={onCloseMobile}
                            className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white lg:hidden"
                        >
                            <X className="size-5" />
                        </button>
                    )}
                </div>

                {/* Navigation Menu */}
                <nav className="mt-6 space-y-1.5">
                    {navItems.map((item, i) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={i}
                                href={item.href}
                                onClick={onCloseMobile}
                                className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all duration-200 sm:text-sm ${isActive
                                    ? "bg-[#222228] text-white shadow-sm"
                                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                {/* Left Active Bar Indicator */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-white" />
                                )}

                                <Icon
                                    className={`size-4.5 shrink-0 transition-colors ${isActive
                                        ? "text-white"
                                        : "text-gray-400 group-hover:text-white"
                                        }`}
                                />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom User Profile */}
            <div className="pt-4">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#16161a] p-2.5 shadow-sm">
                    <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15">
                        <Image
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                            alt="Alex Rivera"
                            width={32}
                            height={32}
                            unoptimized
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="truncate text-xs font-bold text-white">
                            {user?.name}
                        </div>
                        <div className="truncate text-[10px] text-muted-foreground">
                            {user?.email}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Static Sidebar */}
            <aside className="fixed top-0 left-0 z-40 hidden h-screen w-72 shrink-0 flex-col border-r border-white/5 bg-[#0f0f12] lg:flex">
                {sidebarContent}
            </aside>

            {/* Mobile Sidebar Overlay Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 flex lg:hidden">
                    <div
                        onClick={onCloseMobile}
                        className="fixed inset-0 bg-black/70 backdrop-blur-xs"
                    />
                    <div className="relative z-10 h-full w-72 border-r border-white/10 bg-[#0f0f12] shadow-2xl">
                        {sidebarContent}
                    </div>
                </div>
            )}
        </>
    );
}