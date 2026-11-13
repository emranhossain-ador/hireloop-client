"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
    Bug,
    ClipboardList,
    Cloud,
    Code,
    Cpu,
    Database,
    Download,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    LifeBuoy,
    Megaphone,
    Palette,
    Server,
    ShieldCheck,
    Smartphone,
    X,
} from "lucide-react";

type ApplicationStatus =
    | "Applied"
    | "Review"
    | "Interviewing"
    | "Shortlisted"
    | "Offered"
    | "Rejected";

type IconKey =
    | "code"
    | "palette"
    | "database"
    | "cloud"
    | "cpu"
    | "shield"
    | "server"
    | "mobile"
    | "clipboard"
    | "megaphone"
    | "bug"
    | "lifebuoy";

interface ApplicationItem {
    id: string;
    role: string;
    company: string;
    meta: string;
    applied: string;
    status: ApplicationStatus;
    icon: IconKey;
    archived?: boolean;
}

const mockApplications: ApplicationItem[] = [
    { id: "app-1", role: "Senior Frontend Engineer", company: "Stark Industries", meta: "Full-time • Remote", applied: "2 hours ago", status: "Applied", icon: "code" },
    { id: "app-2", role: "Product Designer", company: "Cyberdyne Systems", meta: "Contract • Hybrid", applied: "1 day ago", status: "Review", icon: "palette" },
    { id: "app-3", role: "Lead Data Scientist", company: "Wayne Enterprises", meta: "Full-time • On-site", applied: "4 days ago", status: "Shortlisted", icon: "database" },
    { id: "app-4", role: "Cloud Architect", company: "Oscorp Tech", meta: "Full-time • Remote", applied: "1 week ago", status: "Rejected", icon: "cloud" },
    { id: "app-5", role: "AI Research Engineer", company: "Hooli Corp", meta: "Full-time • Hybrid", applied: "2 weeks ago", status: "Offered", icon: "cpu" },
    { id: "app-6", role: "Backend Engineer", company: "Umbrella Corp", meta: "Full-time • Remote", applied: "2 weeks ago", status: "Applied", icon: "code" },
    { id: "app-7", role: "UX Designer", company: "Wayne Enterprises", meta: "Full-time • Hybrid", applied: "3 weeks ago", status: "Review", icon: "palette" },
    { id: "app-8", role: "DevOps Engineer", company: "Stark Industries", meta: "Full-time • On-site", applied: "3 weeks ago", status: "Shortlisted", icon: "cloud" },
    { id: "app-9", role: "Mobile Developer", company: "Hooli Corp", meta: "Contract • Remote", applied: "1 month ago", status: "Interviewing", icon: "mobile" },
    { id: "app-10", role: "Data Analyst", company: "Cyberdyne Systems", meta: "Full-time • Hybrid", applied: "1 month ago", status: "Applied", icon: "database" },
    { id: "app-11", role: "Security Engineer", company: "Oscorp Tech", meta: "Full-time • Remote", applied: "1 month ago", status: "Rejected", icon: "shield" },
    { id: "app-12", role: "Machine Learning Engineer", company: "Wayne Enterprises", meta: "Full-time • On-site", applied: "1 month ago", status: "Offered", icon: "cpu" },
    { id: "app-13", role: "QA Automation Engineer", company: "Umbrella Corp", meta: "Contract • Remote", applied: "2 months ago", status: "Applied", icon: "bug" },
    { id: "app-14", role: "Technical Product Manager", company: "Stark Industries", meta: "Full-time • Hybrid", applied: "2 months ago", status: "Review", icon: "clipboard" },
    { id: "app-15", role: "Site Reliability Engineer", company: "Hooli Corp", meta: "Full-time • Remote", applied: "2 months ago", status: "Shortlisted", icon: "server" },
    { id: "app-16", role: "Full Stack Developer", company: "Cyberdyne Systems", meta: "Full-time • On-site", applied: "2 months ago", status: "Interviewing", icon: "code" },
    { id: "app-17", role: "Growth Marketer", company: "Umbrella Corp", meta: "Contract • Hybrid", applied: "3 months ago", status: "Applied", icon: "megaphone" },
    { id: "app-18", role: "Platform Engineer", company: "Oscorp Tech", meta: "Full-time • Remote", applied: "3 months ago", status: "Applied", icon: "server" },
    { id: "app-19", role: "Solutions Architect", company: "Wayne Enterprises", meta: "Full-time • Hybrid", applied: "3 months ago", status: "Review", icon: "cloud" },
    { id: "app-20", role: "iOS Developer", company: "Hooli Corp", meta: "Contract • Remote", applied: "4 months ago", status: "Rejected", icon: "mobile" },
    { id: "app-21", role: "Analytics Engineer", company: "Stark Industries", meta: "Full-time • On-site", applied: "4 months ago", status: "Shortlisted", icon: "database" },
    { id: "app-22", role: "Design Systems Lead", company: "Cyberdyne Systems", meta: "Full-time • Hybrid", applied: "5 months ago", status: "Offered", icon: "palette" },
    { id: "app-23", role: "Customer Support Engineer", company: "Umbrella Corp", meta: "Full-time • Remote", applied: "5 months ago", status: "Applied", icon: "lifebuoy" },
    { id: "app-24", role: "Junior Web Developer", company: "Oscorp Tech", meta: "Contract • On-site", applied: "6 months ago", status: "Rejected", icon: "code" },
    { id: "app-25", role: "Backend Developer", company: "Meta", meta: "Full-time • Hybrid", applied: "4 months ago", status: "Rejected", icon: "code", archived: true },
    { id: "app-26", role: "Product Designer", company: "Spotify", meta: "Full-time • Remote", applied: "5 months ago", status: "Offered", icon: "palette", archived: true },
    { id: "app-27", role: "Data Engineer", company: "Airbnb", meta: "Contract • Hybrid", applied: "6 months ago", status: "Applied", icon: "database", archived: true },
    { id: "app-28", role: "Frontend Developer", company: "Netlify", meta: "Full-time • Remote", applied: "7 months ago", status: "Review", icon: "code", archived: true },
];

const statusStyles: Record<ApplicationStatus, string> = {
    Applied: "border-white/10 bg-white/5 text-gray-300",
    Review: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    Interviewing: "border-purple-500/30 bg-purple-500/10 text-purple-300",
    Shortlisted: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    Offered: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    Rejected: "border-red-500/30 bg-red-500/10 text-red-400",
};

const iconMap: Record<IconKey, { icon: typeof Code; accent: string }> = {
    code: { icon: Code, accent: "border-white/10 bg-[#101014] text-gray-300" },
    palette: { icon: Palette, accent: "border-white/10 bg-[#101014] text-gray-300" },
    database: { icon: Database, accent: "border-white/10 bg-[#101014] text-gray-300" },
    cloud: { icon: Cloud, accent: "border-red-500/30 bg-red-500/15 text-red-400" },
    cpu: { icon: Cpu, accent: "border-white/10 bg-[#101014] text-gray-300" },
    shield: { icon: ShieldCheck, accent: "border-white/10 bg-[#101014] text-gray-300" },
    server: { icon: Server, accent: "border-white/10 bg-[#101014] text-gray-300" },
    mobile: { icon: Smartphone, accent: "border-white/10 bg-[#101014] text-gray-300" },
    clipboard: { icon: ClipboardList, accent: "border-white/10 bg-[#101014] text-gray-300" },
    megaphone: { icon: Megaphone, accent: "border-white/10 bg-[#101014] text-gray-300" },
    bug: { icon: Bug, accent: "border-white/10 bg-[#101014] text-gray-300" },
    lifebuoy: { icon: LifeBuoy, accent: "border-white/10 bg-[#101014] text-gray-300" },
};

const stats = [
    { label: "Total Applied", value: "24", valueClass: "text-white" },
    { label: "Shortlisted", value: "8", valueClass: "text-white" },
    { label: "Interviews", value: "3", valueClass: "text-amber-400" },
    { label: "Success Rate", value: "12%", valueClass: "text-emerald-400" },
];

const PAGE_SIZE = 5;
const GRID_COLS =
    "md:grid-cols-[minmax(0,2.4fr)_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_auto]";

export default function MyApplicationsPage() {
    const [view, setView] = useState<"Active" | "Archived">("Active");
    const [page, setPage] = useState(1);
    const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);

    const filtered = useMemo(
        () => mockApplications.filter((app) => (view === "Archived" ? app.archived : !app.archived)),
        [view]
    );

    const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);
    const visible = filtered.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const rangeStart = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
    const rangeEnd = Math.min(currentPage * PAGE_SIZE, filtered.length);

    const switchView = (next: "Active" | "Archived") => {
        setView(next);
        setPage(1);
    };

    return (
        <div className="mx-auto max-w-7xl pb-16">

            {/* ============================================================
                1. PAGE HEADER (Title + Active/Archived + Export PDF)
            ============================================================ */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        My Applications
                    </h1>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        Track your job applications and interview progress in real-time.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Active / Archived Segmented Toggle */}
                    <div className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-[#16161a] p-1">
                        {(["Active", "Archived"] as const).map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => switchView(tab)}
                                className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
                                    view === tab
                                        ? "bg-white/10 text-white shadow-sm"
                                        : "text-muted-foreground hover:text-white"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Export PDF Button */}
                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black shadow-md transition-all hover:bg-white/90 active:scale-[0.99]"
                    >
                        <Download className="size-3.5" />
                        <span>Export PDF</span>
                    </button>
                </div>
            </div>

            {/* ============================================================
                2. SUMMARY STAT CARDS
            ============================================================ */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-2xl border border-white/[0.08] bg-[#16161a] px-5 py-4 shadow-sm"
                    >
                        <div className="text-xs font-medium text-muted-foreground">
                            {stat.label}
                        </div>
                        <div className={`mt-1.5 text-2xl font-bold sm:text-3xl ${stat.valueClass}`}>
                            {stat.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* ============================================================
                3. APPLICATIONS TABLE
            ============================================================ */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#16161a] shadow-sm">

                {/* Table Header (desktop) */}
                <div className={`hidden gap-4 bg-white/[0.02] px-6 py-3.5 text-xs font-medium text-muted-foreground md:grid ${GRID_COLS}`}>
                    <div>Job Title</div>
                    <div>Company</div>
                    <div>Applied</div>
                    <div>Status</div>
                    <div className="justify-self-end pr-1">Action</div>
                </div>

                {/* Table Rows */}
                {visible.length === 0 ? (
                    <div className="px-6 py-14 text-center">
                        <p className="text-sm font-medium text-white">
                            No {view.toLowerCase()} applications.
                        </p>
                        <button
                            type="button"
                            onClick={() => switchView(view === "Active" ? "Archived" : "Active")}
                            className="mt-2 text-xs font-medium text-primary hover:underline"
                        >
                            Switch to {view === "Active" ? "Archived" : "Active"}
                        </button>
                    </div>
                ) : (
                    visible.map((item) => {
                        const { icon: RowIcon, accent } = iconMap[item.icon];

                        return (
                            <div
                                key={item.id}
                                className={`flex flex-col gap-3 border-t border-white/[0.06] px-4 py-4 transition-colors hover:bg-white/[0.02] md:grid md:items-center md:gap-4 md:px-6 md:py-4.5 ${GRID_COLS}`}
                            >
                                {/* Stacked wrapper becomes grid cells on desktop */}
                                <div className="flex min-w-0 items-center gap-3">
                                    <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${accent}`}>
                                        <RowIcon className="size-4.5" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="truncate text-sm font-semibold text-white">
                                            {item.role}
                                        </div>
                                        <div className="mt-0.5 truncate text-xs text-muted-foreground">
                                            {item.meta}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 md:contents">
                                    <div className="text-sm text-gray-300">{item.company}</div>
                                    <div className="text-xs text-muted-foreground">{item.applied}</div>
                                    <div>
                                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusStyles[item.status]}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <div className="md:justify-self-end">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedApp(item)}
                                            className="rounded-lg px-1 text-xs font-semibold text-gray-300 transition-colors hover:text-white"
                                        >
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}

                {/* Table Footer: Count + Pagination */}
                <div className="flex flex-col gap-3 border-t border-white/[0.06] bg-white/[0.02] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <p className="text-xs text-muted-foreground">
                        Showing {rangeStart}-{rangeEnd} of {filtered.length} applications
                    </p>

                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            aria-label="Previous page"
                            disabled={currentPage <= 1}
                            onClick={() => setPage(currentPage - 1)}
                            className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-[#16161a] text-gray-400 transition-colors hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                        >
                            <ChevronLeft className="size-4" />
                        </button>

                        {Array.from({ length: pageCount }, (_, i) => i + 1).map((num) => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => setPage(num)}
                                className={`flex size-8 items-center justify-center rounded-lg border text-xs font-semibold transition-all ${
                                    currentPage === num
                                        ? "border-white bg-white text-black shadow-sm"
                                        : "border-white/10 bg-[#16161a] text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                {num}
                            </button>
                        ))}

                        <button
                            type="button"
                            aria-label="Next page"
                            disabled={currentPage >= pageCount}
                            onClick={() => setPage(currentPage + 1)}
                            className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-[#16161a] text-gray-400 transition-colors hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                        >
                            <ChevronRight className="size-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ============================================================
                APPLICATION DETAILS MODAL
            ============================================================ */}
            {selectedApp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
                    <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#16161a] p-6 shadow-2xl">
                        <div className="flex items-start justify-between border-b border-white/10 pb-4">
                            <div className="flex items-center gap-3">
                                <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${iconMap[selectedApp.icon].accent}`}>
                                    {(() => {
                                        const RowIcon = iconMap[selectedApp.icon].icon;
                                        return <RowIcon className="size-4.5" />;
                                    })()}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{selectedApp.role}</h3>
                                    <p className="text-xs text-muted-foreground">
                                        {selectedApp.company} &bull; {selectedApp.meta}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedApp(null)}
                                aria-label="Close details"
                                className="rounded-lg p-1 text-gray-400 hover:bg-white/10 hover:text-white"
                            >
                                <X className="size-4.5" />
                            </button>
                        </div>

                        <div className="mt-5 space-y-4 text-xs sm:text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Applied:</span>
                                <span className="font-semibold text-white">{selectedApp.applied}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Status:</span>
                                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusStyles[selectedApp.status]}`}>
                                    {selectedApp.status}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Job Type:</span>
                                <span className="text-white">{selectedApp.meta}</span>
                            </div>

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
