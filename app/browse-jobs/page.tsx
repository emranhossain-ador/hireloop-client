"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    Bookmark,
    ChevronDown,
    Banknote,
    Clock,
    Zap,
    Flame,
    Star,
    Sparkles,
    SlidersHorizontal,
    X,
    Check,
    Layers,
    MapPin,
    Briefcase,
} from "lucide-react";

interface JobItem {
    id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    type: "Full-time" | "Contract" | "Freelance";
    workModel?: "Remote" | "Hybrid" | "On-site";
    experience?: string;
    isEasyApply?: boolean;
    isHot?: boolean;
    logoColor: string;
    logoType: "techflow" | "fingrid" | "creative" | "healthai" | "cloud" | "mobile";
}

const initialJobs: JobItem[] = [
    {
        id: "job-1",
        title: "Senior Product Designer",
        company: "TechFlow Systems",
        location: "San Francisco, CA (Remote)",
        salary: "$140k - $180k",
        type: "Full-time",
        isEasyApply: true,
        logoColor: "from-teal-400 to-cyan-600",
        logoType: "techflow",
    },
    {
        id: "job-2",
        title: "Lead Frontend Engineer",
        company: "FinGrid Solutions",
        location: "New York, NY",
        salary: "$165k - $210k",
        type: "Full-time",
        workModel: "Hybrid",
        logoColor: "from-blue-500 to-indigo-600",
        logoType: "fingrid",
    },
    {
        id: "job-3",
        title: "UX Researcher",
        company: "CreativeStudio",
        location: "Austin, TX",
        salary: "$110k - $145k",
        type: "Contract",
        logoColor: "from-amber-400 to-orange-600",
        logoType: "creative",
    },
    {
        id: "job-4",
        title: "Machine Learning Engineer",
        company: "HealthAI Corp",
        location: "Boston, MA (Remote)",
        salary: "$180k - $250k",
        type: "Full-time",
        experience: "Senior",
        isHot: true,
        logoColor: "from-cyan-400 to-blue-600",
        logoType: "healthai",
    },
    {
        id: "job-5",
        title: "Cloud Infrastructure Architect",
        company: "Apex Cloud Services",
        location: "Seattle, WA (Remote)",
        salary: "$175k - $230k",
        type: "Full-time",
        isEasyApply: true,
        logoColor: "from-purple-500 to-indigo-600",
        logoType: "cloud",
    },
    {
        id: "job-6",
        title: "Senior Mobile Engineer (iOS / Swift)",
        company: "Pulse Mobility",
        location: "Chicago, IL",
        salary: "$135k - $170k",
        type: "Contract",
        workModel: "Hybrid",
        logoColor: "from-pink-500 to-rose-600",
        logoType: "mobile",
    },
];

export default function BrowseJobsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTypes, setSelectedTypes] = useState<string[]>(["Full-time"]);
    const [sortBy, setSortBy] = useState("Most Recent");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set());
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Toggle bookmark
    const toggleBookmark = (id: string) => {
        setSavedJobIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    // Toggle job type filter
    const toggleType = (type: string) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    // Filter jobs
    const filteredJobs = initialJobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType =
            selectedTypes.length === 0 || selectedTypes.includes(job.type);

        return matchesSearch && matchesType;
    });

    // Logo renderer for dark high-end company thumbnails
    const renderLogo = (type: JobItem["logoType"], gradient: string) => {
        return (
            <div
                className={`relative flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#121217] shadow-inner sm:size-14`}
            >
                <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradient} opacity-20 blur-[6px]`}
                />
                <div className="relative z-10 flex items-center justify-center">
                    {type === "techflow" && (
                        <div className="flex size-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300">
                            <Zap className="size-4" />
                        </div>
                    )}
                    {type === "fingrid" && (
                        <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300">
                            <Layers className="size-4" />
                        </div>
                    )}
                    {type === "creative" && (
                        <div className="flex size-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300">
                            <Sparkles className="size-4" />
                        </div>
                    )}
                    {type === "healthai" && (
                        <div className="flex size-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-300">
                            <Star className="size-4" />
                        </div>
                    )}
                    {type === "cloud" && (
                        <div className="flex size-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300">
                            <Briefcase className="size-4" />
                        </div>
                    )}
                    {type === "mobile" && (
                        <div className="flex size-7 items-center justify-center rounded-lg bg-rose-500/20 text-rose-300">
                            <MapPin className="size-4" />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background pb-16 pt-6 sm:pb-24 sm:pt-8">
            <div className="section-container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                {/* ============================================================
                    TOP SEARCH BAR CARD
                ============================================================ */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#16161a] p-2.5 shadow-xl sm:p-3">
                    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                        {/* Search Input */}
                        <div className="relative flex flex-1 items-center">
                            <Search className="pointer-events-none absolute left-3.5 size-4.5 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by job title, keywords..."
                                className="w-full rounded-xl border border-white/5 bg-[#101014] py-3 pl-11 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 sm:text-sm"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="size-4" />
                                </button>
                            )}
                        </div>

                        {/* Search Action Button */}
                        <button
                            type="button"
                            className="flex items-center justify-center rounded-xl bg-white px-7 py-3 text-xs font-semibold text-black shadow-md transition-all duration-200 hover:bg-white/90 active:scale-[0.99] sm:text-sm"
                        >
                            Search Jobs
                        </button>
                    </div>
                </div>

                {/* Mobile Filter Toggle Button */}
                <div className="mt-4 flex items-center justify-between lg:hidden">
                    <button
                        onClick={() => setMobileFiltersOpen(true)}
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#16161a] px-4 py-2 text-xs font-medium text-foreground hover:bg-white/5"
                    >
                        <SlidersHorizontal className="size-3.5" />
                        <span>Filters ({selectedTypes.length})</span>
                    </button>

                    <div className="text-xs text-muted-foreground">
                        Found <span className="font-semibold text-foreground">1,248</span> Jobs
                    </div>
                </div>

                {/* ============================================================
                    MAIN CONTENT GRID (FILTERS + JOBS LIST)
                ============================================================ */}
                <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-7">

                    {/* ========================================================
                        LEFT COLUMN: FILTERS SIDEBAR
                    ======================================================== */}
                    <aside className="hidden lg:col-span-3 lg:block xl:col-span-3">
                        <div className="rounded-2xl border border-white/[0.08] bg-[#16161a] p-5 shadow-lg">
                            <h2 className="text-lg font-bold tracking-tight text-foreground">
                                Filters
                            </h2>

                            {/* Job Type Section */}
                            <div className="mt-5">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    Job Type
                                </h3>

                                <div className="mt-3.5 space-y-3">
                                    {/* Full-time Filter */}
                                    <label
                                        onClick={() => toggleType("Full-time")}
                                        className="group flex cursor-pointer select-none items-center justify-between text-xs sm:text-sm"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <div
                                                className={`flex size-4.5 items-center justify-center rounded-md border transition-all ${selectedTypes.includes("Full-time")
                                                        ? "border-white bg-white text-black"
                                                        : "border-white/20 bg-white/5 group-hover:border-white/40"
                                                    }`}
                                            >
                                                {selectedTypes.includes("Full-time") && (
                                                    <Check className="size-3 stroke-[3]" />
                                                )}
                                            </div>
                                            <span className="font-medium text-foreground/90 transition-colors group-hover:text-white">
                                                Full-time
                                            </span>
                                        </div>
                                        <span className="font-mono text-xs text-muted-foreground">
                                            1.2k
                                        </span>
                                    </label>

                                    {/* Contract Filter */}
                                    <label
                                        onClick={() => toggleType("Contract")}
                                        className="group flex cursor-pointer select-none items-center justify-between text-xs sm:text-sm"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <div
                                                className={`flex size-4.5 items-center justify-center rounded-md border transition-all ${selectedTypes.includes("Contract")
                                                        ? "border-white bg-white text-black"
                                                        : "border-white/20 bg-white/5 group-hover:border-white/40"
                                                    }`}
                                            >
                                                {selectedTypes.includes("Contract") && (
                                                    <Check className="size-3 stroke-[3]" />
                                                )}
                                            </div>
                                            <span className="font-medium text-foreground/90 transition-colors group-hover:text-white">
                                                Contract
                                            </span>
                                        </div>
                                        <span className="font-mono text-xs text-muted-foreground">
                                            432
                                        </span>
                                    </label>

                                    {/* Freelance Filter */}
                                    <label
                                        onClick={() => toggleType("Freelance")}
                                        className="group flex cursor-pointer select-none items-center justify-between text-xs sm:text-sm"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <div
                                                className={`flex size-4.5 items-center justify-center rounded-md border transition-all ${selectedTypes.includes("Freelance")
                                                        ? "border-white bg-white text-black"
                                                        : "border-white/20 bg-white/5 group-hover:border-white/40"
                                                    }`}
                                            >
                                                {selectedTypes.includes("Freelance") && (
                                                    <Check className="size-3 stroke-[3]" />
                                                )}
                                            </div>
                                            <span className="font-medium text-foreground/90 transition-colors group-hover:text-white">
                                                Freelance
                                            </span>
                                        </div>
                                        <span className="font-mono text-xs text-muted-foreground">
                                            156
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* ========================================================
                        RIGHT COLUMN: JOBS LISTING
                    ======================================================== */}
                    <main className="lg:col-span-9 xl:col-span-9">

                        {/* Top Header Row: Counter + Sort Dropdown */}
                        <div className="flex items-center justify-between">
                            <h1 className="text-base font-bold tracking-tight text-foreground sm:text-xl">
                                Found 1,248 Professional Jobs
                            </h1>

                            {/* Sort By Dropdown */}
                            <div className="relative flex items-center gap-2">
                                <span className="hidden text-xs text-muted-foreground sm:inline">
                                    Sort by:
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#1e1e24] px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-white/20"
                                >
                                    <span>{sortBy}</span>
                                    <ChevronDown
                                        className={`size-3.5 transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {isSortOpen && (
                                    <div className="absolute right-0 top-full z-30 mt-1.5 w-36 rounded-xl border border-white/10 bg-[#1b1b22] py-1 shadow-2xl backdrop-blur-md">
                                        {["Most Recent", "Highest Salary", "Most Relevant"].map(
                                            (option) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => {
                                                        setSortBy(option);
                                                        setIsSortOpen(false);
                                                    }}
                                                    className={`w-full px-3 py-1.5 text-left text-xs transition-colors hover:bg-white/5 ${sortBy === option
                                                            ? "font-semibold text-white"
                                                            : "text-muted-foreground"
                                                        }`}
                                                >
                                                    {option}
                                                </button>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Job Cards Stack */}
                        <div className="mt-4 space-y-3.5">
                            {filteredJobs.length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-[#16161a] p-12 text-center">
                                    <p className="text-sm font-medium text-foreground">
                                        No jobs found matching your filters.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSelectedTypes(["Full-time"]);
                                            setSearchQuery("");
                                        }}
                                        className="mt-3 text-xs font-medium text-primary hover:underline"
                                    >
                                        Reset all filters
                                    </button>
                                </div>
                            ) : (
                                filteredJobs.map((job) => {
                                    const isSaved = savedJobIds.has(job.id);

                                    return (
                                        <article
                                            key={job.id}
                                            className="group relative rounded-2xl border border-white/[0.08] bg-[#16161a] p-5 shadow-sm transition-all duration-200 hover:border-white/20 hover:bg-[#19191f] hover:shadow-lg sm:p-6"
                                        >
                                            <div className="flex items-start gap-4 sm:gap-5">
                                                {/* Company Logo Thumbnail */}
                                                {renderLogo(job.logoType, job.logoColor)}

                                                {/* Job Content Info */}
                                                <div className="flex-1 min-w-0">
                                                    {/* Top Row: Title & Bookmark */}
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <h3 className="text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-white sm:text-lg">
                                                                <Link
                                                                    href={`/browse-jobs/${job.id}`}
                                                                    className="hover:underline"
                                                                >
                                                                    {job.title}
                                                                </Link>
                                                            </h3>

                                                            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                                                                {job.company} &bull; {job.location}
                                                            </p>
                                                        </div>

                                                        {/* Bookmark Button */}
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleBookmark(job.id)}
                                                            aria-label={
                                                                isSaved
                                                                    ? "Remove from saved jobs"
                                                                    : "Save job"
                                                            }
                                                            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
                                                        >
                                                            <Bookmark
                                                                className={`size-4.5 sm:size-5 transition-transform active:scale-90 ${isSaved
                                                                        ? "fill-primary text-primary"
                                                                        : "text-muted-foreground"
                                                                    }`}
                                                            />
                                                        </button>
                                                    </div>

                                                    {/* Badges / Tags Row */}
                                                    <div className="mt-3.5 flex flex-wrap items-center gap-2 sm:gap-2.5">
                                                        {/* Salary Badge */}
                                                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-[#1f1f26] px-2.5 py-1 text-[11px] font-medium text-foreground/80 sm:text-xs">
                                                            <Banknote className="size-3.5 text-muted-foreground" />
                                                            <span>{job.salary}</span>
                                                        </span>

                                                        {/* Job Type Badge */}
                                                        {job.type && (
                                                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-[#1f1f26] px-2.5 py-1 text-[11px] font-medium text-foreground/80 sm:text-xs">
                                                                <Clock className="size-3.5 text-muted-foreground" />
                                                                <span>{job.type}</span>
                                                            </span>
                                                        )}

                                                        {/* Hybrid / Remote Badge */}
                                                        {job.workModel && (
                                                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-[#1f1f26] px-2.5 py-1 text-[11px] font-medium text-foreground/80 sm:text-xs">
                                                                <span className="text-[10px] text-muted-foreground">
                                                                    ◇
                                                                </span>
                                                                <span>{job.workModel}</span>
                                                            </span>
                                                        )}

                                                        {/* Seniority Badge */}
                                                        {job.experience && (
                                                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-[#1f1f26] px-2.5 py-1 text-[11px] font-medium text-foreground/80 sm:text-xs">
                                                                <Star className="size-3.5 text-muted-foreground" />
                                                                <span>{job.experience}</span>
                                                            </span>
                                                        )}

                                                        {/* Easy Apply Tag (Green) */}
                                                        {job.isEasyApply && (
                                                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400 sm:text-xs">
                                                                <Zap className="size-3.5 fill-current" />
                                                                <span>Easy Apply</span>
                                                            </span>
                                                        )}

                                                        {/* Hot Job Tag (Amber) */}
                                                        {job.isHot && (
                                                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-400 sm:text-xs">
                                                                <Flame className="size-3.5" />
                                                                <span>Hot Job</span>
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })
                            )}
                        </div>

                    </main>

                </div>
            </div>

            {/* ============================================================
                MOBILE FILTERS DRAWER MODAL
            ============================================================ */}
            {mobileFiltersOpen && (
                <div className="fixed inset-0 z-50 flex items-end bg-black/70 backdrop-blur-sm sm:items-center sm:justify-center lg:hidden">
                    <div className="w-full rounded-t-3xl border border-white/10 bg-[#16161a] p-6 shadow-2xl sm:max-w-md sm:rounded-2xl">
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <h3 className="text-base font-bold text-foreground">
                                Filter Jobs
                            </h3>
                            <button
                                onClick={() => setMobileFiltersOpen(false)}
                                className="rounded-lg p-1.5 text-muted-foreground hover:bg-white/10 hover:text-white"
                            >
                                <X className="size-4.5" />
                            </button>
                        </div>

                        <div className="mt-5 space-y-4">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Job Type
                            </h4>
                            <div className="space-y-3">
                                {[
                                    { label: "Full-time", count: "1.2k" },
                                    { label: "Contract", count: "432" },
                                    { label: "Freelance", count: "156" },
                                ].map((item) => (
                                    <label
                                        key={item.label}
                                        onClick={() => toggleType(item.label)}
                                        className="flex cursor-pointer items-center justify-between py-1 text-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`flex size-5 items-center justify-center rounded-md border ${selectedTypes.includes(item.label)
                                                        ? "border-white bg-white text-black"
                                                        : "border-white/20 bg-white/5"
                                                    }`}
                                            >
                                                {selectedTypes.includes(item.label) && (
                                                    <Check className="size-3.5 stroke-[3]" />
                                                )}
                                            </div>
                                            <span className="font-medium text-foreground">
                                                {item.label}
                                            </span>
                                        </div>
                                        <span className="font-mono text-xs text-muted-foreground">
                                            {item.count}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8">
                            <button
                                onClick={() => setMobileFiltersOpen(false)}
                                className="w-full rounded-xl bg-white py-3 text-xs font-bold text-black shadow-md hover:bg-white/90"
                            >
                                Show Results
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}