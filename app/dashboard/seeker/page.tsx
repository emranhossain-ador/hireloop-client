"use client";

import Link from "next/link";
import {
    Bookmark,
    Send,
    Calendar,
    Award,
    Megaphone,
    Mail,
    FileEdit,
    Plus,
} from "lucide-react";

interface ActivityItem {
    id: string;
    type: "status" | "alert" | "message";
    content: React.ReactNode;
    time: string;
}

export default function SeekerDashboardPage() {
    const stats = [
        {
            title: "Saved Jobs",
            value: "12",
            icon: Bookmark,
            iconColor: "text-gray-400",
        },
        {
            title: "Applications Submitted",
            value: "24",
            icon: Send,
            iconColor: "text-gray-400",
        },
        {
            title: "Interviews Scheduled",
            value: "3",
            icon: Calendar,
            iconColor: "text-amber-400",
        },
        {
            title: "Offers Received",
            value: "1",
            icon: Award,
            iconColor: "text-emerald-400",
        },
    ];

    const activities: ActivityItem[] = [
        {
            id: "act-1",
            type: "status",
            content: (
                <span>
                    Application for Senior Product Designer at TechFlow updated to{" "}
                    <span className="font-medium text-amber-400">&lsquo;Under Review&rsquo;</span>
                </span>
            ),
            time: "2 hours ago",
        },
        {
            id: "act-2",
            type: "alert",
            content: (
                <span>
                    New Job Alert: Lead Frontend Engineer at FinGrid matches your profile.
                </span>
            ),
            time: "5 hours ago",
        },
        {
            id: "act-3",
            type: "message",
            content: (
                <span>
                    You have a new message from Sarah Jenkins (Hiring Manager at CloudOps).
                </span>
            ),
            time: "1 day ago",
        },
        {
            id: "act-4",
            type: "status",
            content: (
                <span>
                    Application for Senior Product Designer at TechFlow updated to{" "}
                    <span className="font-medium text-amber-400">&lsquo;Under Review&rsquo;</span>
                </span>
            ),
            time: "2 hours ago",
        },
        {
            id: "act-5",
            type: "alert",
            content: (
                <span>
                    New Job Alert: Lead Frontend Engineer at FinGrid matches your profile.
                </span>
            ),
            time: "5 hours ago",
        },
        {
            id: "act-6",
            type: "message",
            content: (
                <span>
                    You have a new message from Sarah Jenkins (Hiring Manager at CloudOps).
                </span>
            ),
            time: "1 day ago",
        },
    ];

    const renderActivityIcon = (type: ActivityItem["type"]) => {
        if (type === "status") {
            return (
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-gray-300">
                    <FileEdit className="size-4" />
                </div>
            );
        }
        if (type === "alert") {
            return (
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <Megaphone className="size-4" />
                </div>
            );
        }
        return (
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-gray-300">
                <Mail className="size-4" />
            </div>
        );
    };

    return (
        <div className="relative mx-auto max-w-7xl pb-16">
            
            {/* ============================================================
                1. TOP STATS 4-CARD GRID
            ============================================================ */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.title}
                            className="rounded-2xl border border-white/[0.08] bg-[#16161a] p-5 shadow-sm transition-all duration-200 hover:border-white/15"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-muted-foreground">
                                    {stat.title}
                                </span>
                                <Icon className={`size-4.5 ${stat.iconColor}`} />
                            </div>

                            <div className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                {stat.value}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ============================================================
                2. RECENT ACTIVITY SECTION
            ============================================================ */}
            <div className="mt-8">
                {/* Section Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold text-white sm:text-lg">
                        Recent Activity
                    </h2>
                    <Link
                        href="/dashboard/activity"
                        className="text-xs font-medium text-muted-foreground transition-colors hover:text-white"
                    >
                        View All Activity
                    </Link>
                </div>

                {/* Activity List Container */}
                <div className="mt-4 space-y-2.5">
                    {activities.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col gap-2 rounded-2xl border border-white/[0.06] bg-[#141418] p-4 transition-all duration-200 hover:border-white/10 hover:bg-[#18181f] sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                        >
                            <div className="flex items-center gap-3.5">
                                {renderActivityIcon(item.type)}
                                <div className="text-xs text-foreground/90 sm:text-sm">
                                    {item.content}
                                </div>
                            </div>

                            <span className="pl-12 text-[11px] text-muted-foreground shrink-0 sm:pl-0 sm:text-xs">
                                {item.time}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ============================================================
                3. FLOATING ACTION BUTTON (+)
            ============================================================ */}
            <button
                type="button"
                aria-label="Create new application or search"
                className="fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center rounded-full bg-white text-black shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-white/95 active:scale-95 sm:size-13"
            >
                <Plus className="size-6 stroke-[2.5]" />
            </button>

        </div>
    );
}