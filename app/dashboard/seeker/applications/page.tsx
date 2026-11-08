"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Clock,
    Search,
    ExternalLink,
    ChevronRight,
    Building2,
    X,
} from "lucide-react";

type ApplicationStatus = "All" | "In Review" | "Interviewing" | "Offer Received" | "Archived";

interface ApplicationItem {
    id: string;
    role: string;
    company: string;
    location: string;
    appliedDate: string;
    stage: string;
    status: "In Review" | "Interviewing" | "Offer Received" | "Archived";
    statusColor: string;
    recruiter: {
        name: string;
        title: string;
    };
    nextStep?: string;
    salary: string;
}

const mockApplications: ApplicationItem[] = [
    {
        id: "app-1",
        role: "Senior Product Designer",
        company: "TechFlow Systems",
        location: "San Francisco, CA (Hybrid)",
        appliedDate: "Oct 24, 2026",
        stage: "Stage 3 of 4: Technical Presentation",
        status: "Interviewing",
        statusColor: "border-purple-500/30 bg-purple-500/10 text-purple-300",
        recruiter: {
            name: "Sarah Jenkins",
            title: "Design Lead",
        },
        nextStep: "Interview on Tuesday, Nov 11 at 2:00 PM EST",
        salary: "$160k - $200k",
    },
    {
        id: "app-2",
        role: "Lead Frontend Engineer",
        company: "FinGrid Solutions",
        location: "New York, NY",
        appliedDate: "Oct 28, 2026",
        stage: "Stage 4 of 4: Offer Negotiation",
        status: "Offer Received",
        statusColor: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        recruiter: {
            name: "David Kim",
            title: "Head of Engineering",
        },
        nextStep: "Formal written offer expires in 5 days",
        salary: "$165k - $210k",
    },
    {
        id: "app-3",
        role: "UX Researcher",
        company: "CreativeStudio",
        location: "Austin, TX (Remote)",
        appliedDate: "Nov 02, 2026",
        stage: "Stage 1 of 4: Resume Screening",
        status: "In Review",
        statusColor: "border-blue-500/30 bg-blue-500/10 text-blue-400",
        recruiter: {
            name: "Elena Rostova",
            title: "Talent Acquisition",
        },
        nextStep: "Hiring manager review in progress",
        salary: "$110k - $145k",
    },
    {
        id: "app-4",
        role: "Staff UX Researcher",
        company: "Linear",
        location: "San Francisco, CA (Remote)",
        appliedDate: "Nov 04, 2026",
        stage: "Stage 2 of 4: Hiring Manager Chat",
        status: "Interviewing",
        statusColor: "border-purple-500/30 bg-purple-500/10 text-purple-300",
        recruiter: {
            name: "Marcus Vance",
            title: "VP of Product",
        },
        nextStep: "Call scheduled for Thursday at 11:00 AM PST",
        salary: "$180k - $220k",
    },
    {
        id: "app-5",
        role: "Full Stack Developer",
        company: "Meta",
        location: "Menlo Park, CA",
        appliedDate: "Sep 15, 2026",
        stage: "Process Completed",
        status: "Archived",
        statusColor: "border-white/10 bg-white/5 text-gray-400",
        recruiter: {
            name: "Recruiting Operations",
            title: "Engineering Team",
        },
        salary: "$150k - $210k",
    },
];

export default function SeekerApplicationsPage() {
    const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);

    const filtered = mockApplications.filter((app) => {
        const matchesStatus =
            selectedStatus === "All" || app.status === selectedStatus;
        const matchesSearch =
            app.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.company.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="mx-auto max-w-7xl pb-16">
            
            {/* Header and Stats */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Applications
                    </h1>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        Track your progress, interviews, and offers in real-time.
                    </p>
                </div>

                {/* 4 Summary Stats */}
                <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center">
                    <div className="rounded-xl border border-white/[0.08] bg-[#16161a] px-3.5 py-2 text-center sm:text-left">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</div>
                        <div className="text-lg font-bold text-white">24</div>
                    </div>
                    <div className="rounded-xl border border-white/[0.08] bg-[#16161a] px-3.5 py-2 text-center sm:text-left">
                        <div className="text-[10px] uppercase tracking-wider text-blue-400">Review</div>
                        <div className="text-lg font-bold text-white">14</div>
                    </div>
                    <div className="rounded-xl border border-white/[0.08] bg-[#16161a] px-3.5 py-2 text-center sm:text-left">
                        <div className="text-[10px] uppercase tracking-wider text-purple-400">Interviews</div>
                        <div className="text-lg font-bold text-white">3</div>
                    </div>
                    <div className="rounded-xl border border-white/[0.08] bg-[#16161a] px-3.5 py-2 text-center sm:text-left">
                        <div className="text-[10px] uppercase tracking-wider text-emerald-400">Offers</div>
                        <div className="text-lg font-bold text-white">1</div>
                    </div>
                </div>
            </div>

            {/* Filter Tabs and Search Bar */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Status Tabs */}
                <div className="flex flex-wrap items-center gap-2">
                    {(["All", "In Review", "Interviewing", "Offer Received", "Archived"] as ApplicationStatus[]).map(
                        (status) => (
                            <button
                                key={status}
                                type="button"
                                onClick={() => setSelectedStatus(status)}
                                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                                    selectedStatus === status
                                        ? "border border-white/20 bg-white/10 text-white shadow-sm"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                {status}
                            </button>
                        )
                    )}
                </div>

                {/* Search */}
                <div className="relative flex items-center">
                    <Search className="pointer-events-none absolute left-3 size-3.5 text-muted-foreground" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Filter by role or company..."
                        className="w-full rounded-xl border border-white/10 bg-[#16161a] py-2 pl-9 pr-3.5 text-xs text-white placeholder:text-muted-foreground/60 focus:border-white/25 focus:outline-none sm:w-64"
                    />
                </div>
            </div>

            {/* Applications List */}
            <div className="mt-5 space-y-3">
                {filtered.length === 0 ? (
                    <div className="rounded-2xl border border-white/[0.08] bg-[#16161a] p-12 text-center">
                        <p className="text-sm font-medium text-white">No applications found.</p>
                        <button
                            onClick={() => {
                                setSelectedStatus("All");
                                setSearchQuery("");
                            }}
                            className="mt-2 text-xs text-primary hover:underline"
                        >
                            Reset filters
                        </button>
                    </div>
                ) : (
                    filtered.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedApp(item)}
                            className="group flex cursor-pointer flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#16161a] p-5 shadow-sm transition-all duration-200 hover:border-white/20 hover:bg-[#181820] sm:flex-row sm:items-center sm:justify-between"
                        >
                            {/* Left Area: Role & Details */}
                            <div className="flex items-start gap-4">
                                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#101014] text-gray-300">
                                    <Building2 className="size-5" />
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-base font-bold text-white transition-colors group-hover:text-primary">
                                            {item.role}
                                        </h3>
                                        <span className="text-xs text-muted-foreground">&bull;</span>
                                        <span className="font-semibold text-xs text-gray-300">
                                            {item.company}
                                        </span>
                                    </div>
                                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                        <span>{item.location}</span>
                                        <span>&bull;</span>
                                        <span>Applied on {item.appliedDate}</span>
                                        <span>&bull;</span>
                                        <span className="font-medium text-gray-300">{item.salary}</span>
                                    </div>

                                    {item.nextStep && (
                                        <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-amber-300/90 font-medium">
                                            <Clock className="size-3" />
                                            <span>{item.nextStep}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Area: Status Badge & Chevron */}
                            <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t border-white/5 sm:border-t-0">
                                <span
                                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${item.statusColor}`}
                                >
                                    {item.status}
                                </span>
                                <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Application Detail Modal */}
            {selectedApp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
                    <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#16161a] p-6 shadow-2xl">
                        <div className="flex items-start justify-between border-b border-white/10 pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">{selectedApp.role}</h3>
                                <p className="text-xs text-muted-foreground">
                                    {selectedApp.company} &bull; {selectedApp.location}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedApp(null)}
                                className="rounded-lg p-1 text-gray-400 hover:bg-white/10 hover:text-white"
                            >
                                <X className="size-4.5" />
                            </button>
                        </div>

                        <div className="mt-5 space-y-4 text-xs sm:text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Current Stage:</span>
                                <span className="font-semibold text-white">{selectedApp.stage}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Status:</span>
                                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${selectedApp.statusColor}`}>
                                    {selectedApp.status}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Primary Contact:</span>
                                <span className="text-white">
                                    {selectedApp.recruiter.name} ({selectedApp.recruiter.title})
                                </span>
                            </div>

                            {selectedApp.nextStep && (
                                <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-300">
                                    <div className="font-bold">Next Action:</div>
                                    <div className="mt-0.5">{selectedApp.nextStep}</div>
                                </div>
                            )}

                            <div className="pt-4 flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedApp(null)}
                                    className="flex-1 rounded-xl bg-white py-2.5 text-xs font-semibold text-black shadow-md hover:bg-white/90"
                                >
                                    Close Details
                                </button>
                                <Link
                                    href="/browse-jobs"
                                    className="flex items-center gap-1.5 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                >
                                    <span>Browse Similar</span>
                                    <ExternalLink className="size-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}