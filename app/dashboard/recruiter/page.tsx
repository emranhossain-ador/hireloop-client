import Image from "next/image";
import { CircleCheckBig, FileText, Plus, Users, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCard {
    title: string;
    value: string;
    icon: LucideIcon;
}

interface Application {
    id: string;
    avatar: string;
    name: string;
    role: string;
    date: string;
    experience: string;
    status: "Interviewing" | "New" | "Reviewing" | "Rejected";
}

const stats: StatCard[] = [
    {
        title: "Total Job Posts",
        value: "48",
        icon: FileText,
    },
    {
        title: "Total Applicants",
        value: "1,284",
        icon: Users,
    },
    {
        title: "Active Jobs",
        value: "18",
        icon: Zap,
    },
    {
        title: "Jobs Closed",
        value: "32",
        icon: CircleCheckBig,
    },
];

const applications: Application[] = [
    {
        id: "app-1",
        avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
        name: "Julianne Moore",
        role: "Senior Product Designer",
        date: "Oct 24, 2023",
        experience: "6 years",
        status: "Interviewing",
    },
    {
        id: "app-2",
        avatar:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
        name: "Robert Downey",
        role: "Backend Engineer",
        date: "Oct 23, 2023",
        experience: "4 years",
        status: "New",
    },
    {
        id: "app-3",
        avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
        name: "Emma Stone",
        role: "Marketing Lead",
        date: "Oct 22, 2023",
        experience: "8 years",
        status: "Reviewing",
    },
    {
        id: "app-4",
        avatar:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
        name: "Chris Pratt",
        role: "Product Manager",
        date: "Oct 21, 2023",
        experience: "5 years",
        status: "Rejected",
    },
];

const statusStyles: Record<Application["status"], string> = {
    Interviewing: "bg-indigo-500",
    New: "bg-blue-500",
    Reviewing: "bg-amber-500",
    Rejected: "bg-red-500",
};

const RecruiterDashboardpage = () => {
    return (
        <div className="mx-auto max-w-7xl pb-16">
            {/* ============================================================
                1. WELCOME HEADING
            ============================================================ */}
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Welcome back, Alex Sterling
            </h1>

            {/* ============================================================
                2. STATS CARDS (4-COLUMN GRID)
            ============================================================ */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="flex min-h-40 flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#16161a] p-5 shadow-sm transition-all duration-200 hover:border-white/15"
                        >
                            <div className="flex size-11 items-center justify-center rounded-xl border border-white/[0.06] bg-[#1c1c22] text-white">
                                <Icon className="size-5" />
                            </div>

                            <div className="mt-6">
                                <p className="text-xs font-medium text-muted-foreground">
                                    {stat.title}
                                </p>
                                <p className="mt-1 text-3xl font-bold tracking-tight text-white">
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ============================================================
                3. RECENT APPLICATIONS
            ============================================================ */}
            <div className="mt-8">
                {/* Section Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white sm:text-xl">
                        Recent Applications
                    </h2>
                    <button
                        type="button"
                        className="text-xs font-medium text-gray-300 transition-colors hover:text-white sm:text-sm"
                    >
                        View all
                    </button>
                </div>

                {/* Table Card */}
                <div className="mt-4 rounded-2xl border border-white/[0.08] bg-[#16161a] shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[820px] text-left">
                            <thead>
                                <tr className="border-b border-white/[0.06] bg-white/[0.02] text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    <th className="px-5 py-4 sm:px-6">Candidate Name</th>
                                    <th className="px-4 py-4">Role</th>
                                    <th className="px-4 py-4">Date Applied</th>
                                    <th className="px-4 py-4">Experience</th>
                                    <th className="px-4 py-4 sm:pr-6">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.05]">
                                {applications.map((app) => (
                                    <tr
                                        key={app.id}
                                        className="transition-colors hover:bg-white/[0.02]"
                                    >
                                        {/* Candidate Name */}
                                        <td className="px-5 py-4 sm:px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="relative size-9 shrink-0 overflow-hidden rounded-full border border-white/10">
                                                    <Image
                                                        src={app.avatar}
                                                        alt={app.name}
                                                        width={36}
                                                        height={36}
                                                        unoptimized
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <span className="truncate text-sm font-semibold text-white">
                                                    {app.name}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td className="px-4 py-4 text-sm text-gray-300">
                                            {app.role}
                                        </td>

                                        {/* Date Applied */}
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">
                                            {app.date}
                                        </td>

                                        {/* Experience */}
                                        <td className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">
                                            {app.experience}
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-4 sm:pr-6">
                                            <span
                                                className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium text-white ${statusStyles[app.status]}`}
                                            >
                                                {app.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ============================================================
                4. FLOATING ACTION BUTTON (+)
            ============================================================ */}
            <button
                type="button"
                aria-label="Add new job"
                className="fixed bottom-6 right-6 z-40 flex size-13 items-center justify-center rounded-full bg-white text-black shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-white/95 active:scale-95 sm:size-14"
            >
                <Plus className="size-6 stroke-[2.5]" />
            </button>
        </div>
    );
};

export default RecruiterDashboardpage;
