"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Bookmark,
    Clock,
    ChevronDown,
    MapPin,
    Banknote,
    XCircle,
    Hexagon,
    Triangle,
    Asterisk,
    Infinity as InfinityIcon,
    Flower2,
    Check,
    X,
    Loader2,
} from "lucide-react";

type CategoryFilter = "All Saved" | "Design (8)" | "Engineering (12)" | "Product (4)";

interface SavedJob {
    id: string;
    title: string;
    company: string;
    category: "Design" | "Engineering" | "Product";
    location: string;
    salary: string;
    savedTime: string;
    closesIn?: string;
    isClosed?: boolean;
    isDraftStarted?: boolean;
    logoType: "techflow" | "vercel" | "linear" | "meta" | "spotify";
}

const initialSavedJobs: SavedJob[] = [
    {
        id: "sj-1",
        title: "Senior Product Designer",
        company: "TECHFLOW",
        category: "Design",
        location: "San Francisco, CA (Hybrid)",
        salary: "$160k - $200k + Equity",
        savedTime: "Saved 2 hours ago",
        closesIn: "Closes in 3 days",
        logoType: "techflow",
    },
    {
        id: "sj-2",
        title: "Frontend Engineer",
        company: "VERCEL",
        category: "Engineering",
        location: "Remote, Global",
        salary: "$140k - $180k",
        savedTime: "Saved yesterday",
        logoType: "vercel",
    },
    {
        id: "sj-3",
        title: "Staff UX Researcher",
        company: "LINEAR",
        category: "Product",
        location: "New York, NY (On-site)",
        salary: "$180k - $220k",
        savedTime: "Saved 3 days ago",
        isDraftStarted: true,
        logoType: "linear",
    },
    {
        id: "sj-4",
        title: "Full Stack Developer",
        company: "META",
        category: "Engineering",
        location: "Menlo Park, CA (Hybrid)",
        salary: "$150k - $210k + Bonus",
        savedTime: "Saved 5 days ago",
        logoType: "meta",
    },
    {
        id: "sj-5",
        title: "Design Systems Lead",
        company: "SPOTIFY",
        category: "Design",
        location: "Remote, USA",
        salary: "$155k - $190k",
        savedTime: "Closed yesterday",
        isClosed: true,
        logoType: "spotify",
    },
];

export default function SavedJobsPage() {
    const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All Saved");
    const [sortBy, setSortBy] = useState("Recently Saved");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [jobs, setJobs] = useState<SavedJob[]>(initialSavedJobs);
    const [savedBookmarks, setSavedBookmarks] = useState<Set<string>>(
        new Set(initialSavedJobs.map((j) => j.id))
    );

    // Apply modal state
    const [selectedJobToApply, setSelectedJobToApply] = useState<SavedJob | null>(null);
    const [isSubmittingApply, setIsSubmittingApply] = useState(false);
    const [applySuccess, setApplySuccess] = useState(false);

    // Toggle bookmark
    const toggleBookmark = (id: string) => {
        setSavedBookmarks((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    // Remove closed job from list
    const removeJob = (id: string) => {
        setJobs((prev) => prev.filter((j) => j.id !== id));
    };

    // Filter jobs by category
    const filteredJobs = jobs.filter((job) => {
        if (selectedCategory === "Design (8)") return job.category === "Design";
        if (selectedCategory === "Engineering (12)") return job.category === "Engineering";
        if (selectedCategory === "Product (4)") return job.category === "Product";
        return true;
    });

    // Render company logos
    const renderLogo = (type: SavedJob["logoType"]) => {
        return (
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#121217] shadow-inner sm:size-14">
                {type === "techflow" && (
                    <Hexagon className="size-5 text-gray-200 stroke-[1.75]" />
                )}
                {type === "vercel" && (
                    <Triangle className="size-5 text-gray-200 fill-current" />
                )}
                {type === "linear" && (
                    <Asterisk className="size-5 text-gray-200 stroke-[2.2]" />
                )}
                {type === "meta" && (
                    <InfinityIcon className="size-5 text-gray-200 stroke-[2]" />
                )}
                {type === "spotify" && (
                    <Flower2 className="size-5 text-gray-400 stroke-[1.75]" />
                )}
            </div>
        );
    };

    const handleApply = (job: SavedJob) => {
        setSelectedJobToApply(job);
    };

    const submitApplication = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingApply(true);
        setTimeout(() => {
            setIsSubmittingApply(false);
            setApplySuccess(true);
            setTimeout(() => {
                setApplySuccess(false);
                setSelectedJobToApply(null);
            }, 1500);
        }, 1000);
    };

    return (
        <div className="mx-auto max-w-7xl pb-16">
            
            {/* ============================================================
                1. HEADER & TOP STAT CARDS
            ============================================================ */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                
                {/* Title & Description */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Saved Jobs
                    </h1>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        Manage and track your bookmarked opportunities.
                    </p>
                </div>

                {/* Stat Cards (Total Saved & Closing Soon) */}
                <div className="flex items-center gap-3.5">
                    {/* Total Saved Card */}
                    <div className="flex items-center gap-3.5 rounded-2xl border border-white/[0.08] bg-[#16161a] px-4 py-3 shadow-sm sm:px-5">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-white">
                            <Bookmark className="size-5 fill-white" />
                        </div>
                        <div>
                            <div className="text-[11px] font-medium text-muted-foreground">
                                Total Saved
                            </div>
                            <div className="text-xl font-bold text-white sm:text-2xl">
                                24
                            </div>
                        </div>
                    </div>

                    {/* Closing Soon Card */}
                    <div className="flex items-center gap-3.5 rounded-2xl border border-white/[0.08] bg-[#16161a] px-4 py-3 shadow-sm sm:px-5">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                            <Clock className="size-5" />
                        </div>
                        <div>
                            <div className="text-[11px] font-medium text-muted-foreground">
                                Closing Soon
                            </div>
                            <div className="text-xl font-bold text-white sm:text-2xl">
                                3
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* ============================================================
                2. CATEGORY PILLS & SORT CONTROLS
            ============================================================ */}
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                
                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2">
                    {(["All Saved", "Design (8)", "Engineering (12)", "Product (4)"] as CategoryFilter[]).map(
                        (cat) => {
                            const isSelected = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                                        isSelected
                                            ? "border border-white/15 bg-white/10 text-white shadow-sm"
                                            : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                    }`}
                                >
                                    {cat}
                                </button>
                            );
                        }
                    )}
                </div>

                {/* Sort By Dropdown */}
                <div className="relative flex items-center gap-2 self-end sm:self-auto">
                    <span className="text-xs text-muted-foreground">
                        Sort by:
                    </span>
                    <button
                        type="button"
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#16161a] px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:border-white/20"
                    >
                        <span>{sortBy}</span>
                        <ChevronDown
                            className={`size-3.5 transition-transform duration-200 ${
                                isSortOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {isSortOpen && (
                        <div className="absolute right-0 top-full z-20 mt-1.5 w-40 rounded-xl border border-white/10 bg-[#1b1b22] py-1 shadow-2xl backdrop-blur-md">
                            {["Recently Saved", "Closing Soonest", "Highest Salary"].map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => {
                                        setSortBy(option);
                                        setIsSortOpen(false);
                                    }}
                                    className={`w-full px-3 py-1.5 text-left text-xs transition-colors hover:bg-white/5 ${
                                        sortBy === option
                                            ? "font-semibold text-white"
                                            : "text-muted-foreground"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

            </div>

            {/* ============================================================
                3. SAVED JOB CARDS STACK
            ============================================================ */}
            <div className="mt-5 space-y-3.5">
                {filteredJobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-[#16161a] p-12 text-center">
                        <p className="text-sm font-medium text-white">
                            No saved jobs found in this category.
                        </p>
                        <button
                            onClick={() => setSelectedCategory("All Saved")}
                            className="mt-3 text-xs font-medium text-primary hover:underline"
                        >
                            Reset filter
                        </button>
                    </div>
                ) : (
                    filteredJobs.map((job) => {
                        const isBookmarked = savedBookmarks.has(job.id);

                        return (
                            <article
                                key={job.id}
                                className={`group rounded-2xl border p-4.5 transition-all duration-200 sm:p-5 ${
                                    job.isClosed
                                        ? "border-white/[0.04] bg-[#141418]/60 opacity-80"
                                        : "border-white/[0.08] bg-[#16161a] hover:border-white/20 hover:bg-[#18181f] shadow-sm"
                                }`}
                            >
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    
                                    {/* Left Area: Logo, Title, Badges */}
                                    <div className="flex items-start gap-4">
                                        {/* Company Logo */}
                                        {renderLogo(job.logoType)}

                                        {/* Info */}
                                        <div className="min-w-0">
                                            {/* Title & Company Pill */}
                                            <div className="flex flex-wrap items-center gap-2.5">
                                                <h2
                                                    className={`text-base font-bold tracking-tight sm:text-lg ${
                                                        job.isClosed
                                                            ? "text-gray-400 line-through decoration-gray-500"
                                                            : "text-white group-hover:text-primary transition-colors"
                                                    }`}
                                                >
                                                    <Link href={`/browse-jobs/${job.id}`}>
                                                        {job.title}
                                                    </Link>
                                                </h2>

                                                {/* Company Tag */}
                                                <span className="rounded-md bg-white/[0.08] px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-gray-300 uppercase">
                                                    {job.company}
                                                </span>
                                            </div>

                                            {/* Location & Salary Tags */}
                                            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                                                {/* Location Tag */}
                                                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-[#121217] px-2.5 py-1 text-gray-300">
                                                    <MapPin className="size-3 text-gray-500" />
                                                    <span>{job.location}</span>
                                                </span>

                                                {/* Salary Tag */}
                                                {!job.isClosed && (
                                                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-[#121217] px-2.5 py-1 text-gray-300">
                                                        <Banknote className="size-3 text-gray-500" />
                                                        <span>{job.salary}</span>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Area: Timestamps & Action Buttons */}
                                    <div className="flex items-center justify-between gap-4 border-t border-white/[0.04] pt-3 sm:gap-6 lg:border-t-0 lg:pt-0">
                                        {/* Status / Saved Timestamp */}
                                        <div className="text-right">
                                            {job.isClosed ? (
                                                <div className="flex items-center gap-1.5 text-xs font-medium text-rose-400">
                                                    <XCircle className="size-3.5" />
                                                    <span>Closed yesterday</span>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                        <Clock className="size-3 text-gray-500" />
                                                        <span>{job.savedTime}</span>
                                                    </div>
                                                    {job.closesIn && (
                                                        <div className="mt-0.5 text-xs font-semibold text-amber-400">
                                                            {job.closesIn}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-2.5">
                                            {/* Bookmark Toggle Icon (if not closed) */}
                                            {!job.isClosed && (
                                                <button
                                                    type="button"
                                                    onClick={() => toggleBookmark(job.id)}
                                                    aria-label="Bookmark job"
                                                    className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-[#1e1e24] text-gray-300 transition-all hover:bg-white/10 hover:text-white"
                                                >
                                                    <Bookmark
                                                        className={`size-4 ${
                                                            isBookmarked
                                                                ? "fill-white text-white"
                                                                : "text-gray-400"
                                                        }`}
                                                    />
                                                </button>
                                            )}

                                            {/* Main Action Button */}
                                            {job.isClosed ? (
                                                <button
                                                    type="button"
                                                    onClick={() => removeJob(job.id)}
                                                    className="rounded-xl border border-white/10 px-3.5 py-2 text-xs font-semibold text-gray-400 transition-colors hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-400"
                                                >
                                                    Remove from List
                                                </button>
                                            ) : job.isDraftStarted ? (
                                                <button
                                                    type="button"
                                                    onClick={() => handleApply(job)}
                                                    className="rounded-xl border border-white/15 bg-[#1e1e24] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-white/10"
                                                >
                                                    Draft Started
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => handleApply(job)}
                                                    className="rounded-xl bg-white px-4.5 py-2 text-xs font-semibold text-black shadow-md transition-all hover:bg-white/90 active:scale-[0.99]"
                                                >
                                                    Apply Now
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </article>
                        );
                    })
                )}
            </div>

            {/* ============================================================
                4. BOTTOM LOAD MORE BUTTON
            ============================================================ */}
            <div className="mt-8 flex justify-center">
                <button
                    type="button"
                    onClick={() => {
                        // Demo append additional item
                        setJobs((prev) => [
                            ...prev,
                            {
                                id: `sj-${Date.now()}`,
                                title: "Senior DevOps Engineer",
                                company: "CLOUDFLARE",
                                category: "Engineering",
                                location: "Austin, TX (Remote)",
                                salary: "$165k - $205k",
                                savedTime: "Saved 6 days ago",
                                logoType: "techflow",
                            },
                        ]);
                    }}
                    className="group inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-white"
                >
                    <span>Load More</span>
                    <ChevronDown className="size-3.5 transition-transform group-hover:translate-y-0.5" />
                </button>
            </div>

            {/* ============================================================
                APPLY MODAL
            ============================================================ */}
            {selectedJobToApply && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
                    <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#16161a] p-6 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <div>
                                <h3 className="text-base font-bold text-white">
                                    Apply for {selectedJobToApply.title}
                                </h3>
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                    {selectedJobToApply.company} &bull; {selectedJobToApply.location}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedJobToApply(null)}
                                className="rounded-lg p-1 text-gray-400 hover:bg-white/10 hover:text-white"
                            >
                                <X className="size-4.5" />
                            </button>
                        </div>

                        {applySuccess ? (
                            <div className="my-8 flex flex-col items-center justify-center text-center">
                                <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                                    <Check className="size-6" />
                                </div>
                                <h4 className="mt-3 text-base font-bold text-white">
                                    Application Submitted!
                                </h4>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    The hiring team at {selectedJobToApply.company} will review your application.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={submitApplication} className="mt-5 space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-300">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        defaultValue="Alex Rivera"
                                        className="mt-1 w-full rounded-xl border border-white/10 bg-[#121217] px-3.5 py-2.5 text-xs text-white focus:border-white/30 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        defaultValue="alex.rivera@example.com"
                                        className="mt-1 w-full rounded-xl border border-white/10 bg-[#121217] px-3.5 py-2.5 text-xs text-white focus:border-white/30 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-300">
                                        Resume / Portfolio Link
                                    </label>
                                    <input
                                        type="url"
                                        required
                                        defaultValue="https://alexrivera.design"
                                        className="mt-1 w-full rounded-xl border border-white/10 bg-[#121217] px-3.5 py-2.5 text-xs text-white focus:border-white/30 focus:outline-none"
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmittingApply}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-xs font-bold text-black shadow-md hover:bg-white/90 disabled:opacity-50"
                                    >
                                        {isSubmittingApply ? (
                                            <>
                                                <Loader2 className="size-4 animate-spin" />
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            <span>Confirm &amp; Submit Application</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}