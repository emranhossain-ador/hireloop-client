"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    Bookmark,
    CheckCircle2,
    Banknote,
    MapPin,
    Clock,
    BarChart3,
    Code2,
    Layers,
    PenTool,
    ShieldCheck,
    Coins,
    Laptop,
    Plane,
    ArrowLeft,
    Check,
    X,
    ExternalLink,
    Send,
    Loader2,
} from "lucide-react";

export default function JobDetailsPage() {
    const params = useParams();
    const jobsId = params?.jobsId as string;
    const job = getJobById(jobsId);

    const [isSaved, setIsSaved] = useState(false);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [isApplying, setIsApplying] = useState(false);
    const [applySuccess, setApplySuccess] = useState(false);

    // Form inputs for application modal
    const [applicantName, setApplicantName] = useState("");
    const [applicantEmail, setApplicantEmail] = useState("");
    const [coverNote, setCoverNote] = useState("");

    const handleApplySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsApplying(true);
        setTimeout(() => {
            setIsApplying(false);
            setApplySuccess(true);
            setTimeout(() => {
                setApplySuccess(false);
                setIsApplyModalOpen(false);
            }, 1800);
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-background pb-20 pt-6 sm:pb-28 sm:pt-8">
            <div className="section-container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                {/* Back to Browse Jobs link */}
                <div className="mb-5">
                    <Link
                        href="/browse-jobs"
                        className="group inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-white sm:text-sm"
                    >
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                        <span>Back to all jobs</span>
                    </Link>
                </div>

                {/* ============================================================
                    1. TOP HEADER CARD (JOB TITLE, COMPANY, ACTIONS)
                ============================================================ */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#16161a] p-5 shadow-xl sm:p-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        {/* Left: Company Logo & Job Title */}
                        <div className="flex items-start gap-4 sm:items-center sm:gap-5">
                            {/* Logo Thumbnail */}
                            <div className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#101014] p-3 shadow-inner sm:size-16">
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent blur-[4px]" />
                                {/* Abstract Minimalist Glowing 3D Tech Logo */}
                                <div className="relative z-10 flex size-8 items-center justify-center rounded-lg bg-gradient-to-tr from-white/10 to-white/5 shadow-md">
                                    <div className="size-4 rounded-full border border-white/70 bg-gradient-to-r from-white/90 to-transparent" />
                                </div>
                            </div>

                            {/* Title & Verified Company */}
                            <div>
                                <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
                                    {job?.title || "Senior Product Designer"}
                                </h1>
                                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                                    <span className="font-medium text-foreground/90">
                                        {job?.company || "CloudScale AI"}
                                    </span>
                                    <span className="text-muted-foreground">&bull;</span>
                                    <div className="flex items-center gap-1.5 font-medium text-emerald-400">
                                        <CheckCircle2 className="size-3.5 fill-emerald-400/20 text-emerald-400" />
                                        <span>Verified Employer</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Actions (Bookmark & Apply Now) */}
                        <div className="flex items-center gap-3 self-end sm:self-center">
                            {/* Bookmark Button */}
                            <button
                                type="button"
                                onClick={() => setIsSaved(!isSaved)}
                                aria-label={isSaved ? "Saved job" : "Save job"}
                                className={`flex size-11 items-center justify-center rounded-xl border border-white/10 bg-[#1e1e24] text-foreground transition-all duration-200 hover:border-white/25 hover:bg-[#25252c] active:scale-95 ${isSaved ? "border-primary/50 text-primary" : "text-gray-300"
                                    }`}
                            >
                                <Bookmark
                                    className={`size-4.5 ${isSaved ? "fill-primary text-primary" : ""
                                        }`}
                                />
                            </button>

                            {/* Apply Now Primary Action */}
                            <button
                                type="button"
                                onClick={() => setIsApplyModalOpen(true)}
                                className="flex items-center justify-center rounded-xl bg-white px-6 py-2.5 text-xs font-semibold text-black shadow-md transition-all duration-200 hover:bg-white/90 active:scale-[0.99] sm:px-7 sm:py-3 sm:text-sm"
                            >
                                Apply Now
                            </button>
                        </div>

                    </div>
                </div>

                {/* ============================================================
                    2. QUICK STATS 4-CARD ROW
                ============================================================ */}
                <div className="mt-5 grid grid-cols-2 gap-3.5 md:grid-cols-4 sm:gap-4">

                    {/* Stat 1: Salary Range */}
                    <div className="rounded-2xl border border-white/[0.08] bg-[#16161a] p-4 sm:p-5">
                        <Banknote className="size-4.5 text-muted-foreground" />
                        <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                            Salary Range
                        </div>
                        <div className="mt-1 text-sm font-bold text-white sm:text-base">
                            $140k &ndash; $180k
                        </div>
                    </div>

                    {/* Stat 2: Location */}
                    <div className="rounded-2xl border border-white/[0.08] bg-[#16161a] p-4 sm:p-5">
                        <MapPin className="size-4.5 text-muted-foreground" />
                        <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                            Location
                        </div>
                        <div className="mt-1 text-sm font-bold text-white sm:text-base">
                            Remote (US)
                        </div>
                    </div>

                    {/* Stat 3: Job Type */}
                    <div className="rounded-2xl border border-white/[0.08] bg-[#16161a] p-4 sm:p-5">
                        <Clock className="size-4.5 text-muted-foreground" />
                        <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                            Job Type
                        </div>
                        <div className="mt-1 text-sm font-bold text-white sm:text-base">
                            Full-time
                        </div>
                    </div>

                    {/* Stat 4: Experience */}
                    <div className="rounded-2xl border border-white/[0.08] bg-[#16161a] p-4 sm:p-5">
                        <BarChart3 className="size-4.5 text-muted-foreground" />
                        <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                            Experience
                        </div>
                        <div className="mt-1 text-sm font-bold text-white sm:text-base">
                            5+ Years
                        </div>
                    </div>

                </div>

                {/* ============================================================
                    3. MAIN CONTENT (DETAILS ON LEFT + SIDEBAR ON RIGHT)
                ============================================================ */}
                <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-7">

                    {/* LEFT COLUMN: MAIN ROLE SPECIFICATIONS */}
                    <main className="rounded-2xl border border-white/[0.08] bg-[#16161a] p-6 shadow-xl sm:p-8 lg:col-span-8">

                        {/* SECTION: JOB DESCRIPTION */}
                        <div>
                            <h2 className="text-base font-bold text-white sm:text-lg">
                                Job Description
                            </h2>
                            <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                                At CloudScale AI, we are building the next generation of infrastructure monitoring tools. We are looking for a Senior Product Designer who is passionate about translating complex technical workflows into elegant, intuitive interfaces. You will be a key member of our design team, working closely with engineering and product leadership to define the vision for our core platform experience.
                            </p>
                        </div>

                        <div className="my-7 border-t border-white/[0.06]" />

                        {/* SECTION: RESPONSIBILITIES */}
                        <div>
                            <h2 className="text-base font-bold text-white sm:text-lg">
                                Responsibilities
                            </h2>
                            <ul className="mt-4 space-y-3 text-xs text-muted-foreground sm:text-sm">
                                <li className="flex items-start gap-3">
                                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/70" />
                                    <span>Lead the end-to-end design process for major platform features, from discovery to high-fidelity implementation.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/70" />
                                    <span>Collaborate with cross-functional partners to understand user needs and translate them into functional design requirements.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/70" />
                                    <span>Maintain and evolve our design system, ensuring consistency and accessibility across the entire product suite.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/70" />
                                    <span>Conduct user research and usability testing to validate design decisions and iterate based on feedback.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="my-7 border-t border-white/[0.06]" />

                        {/* SECTION: REQUIREMENTS */}
                        <div>
                            <h2 className="text-base font-bold text-white sm:text-lg">
                                Requirements
                            </h2>

                            {/* Skills / Badges Pill Row */}
                            <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-2.5">
                                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#1e1e24] px-3 py-1.5 text-xs font-medium text-gray-200">
                                    <Code2 className="size-3.5 text-muted-foreground" />
                                    <span>Figma Expertise</span>
                                </span>

                                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#1e1e24] px-3 py-1.5 text-xs font-medium text-gray-200">
                                    <Layers className="size-3.5 text-muted-foreground" />
                                    <span>System Thinking</span>
                                </span>

                                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#1e1e24] px-3 py-1.5 text-xs font-medium text-gray-200">
                                    <PenTool className="size-3.5 text-muted-foreground" />
                                    <span>UI/UX Design</span>
                                </span>

                                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#1e1e24] px-3 py-1.5 text-xs font-medium text-gray-200">
                                    <Laptop className="size-3.5 text-muted-foreground" />
                                    <span>Basic Frontend</span>
                                </span>
                            </div>

                            {/* Requirements Bullet List */}
                            <ul className="mt-4 space-y-3 text-xs text-muted-foreground sm:text-sm">
                                <li className="flex items-start gap-3">
                                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/70" />
                                    <span>5+ years of experience designing complex B2B SaaS products or data-heavy applications.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white/70" />
                                    <span>A strong portfolio showcasing your design process and problem-solving skills.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="my-7 border-t border-white/[0.06]" />

                        {/* SECTION: BENEFITS */}
                        <div>
                            <h2 className="text-base font-bold text-white sm:text-lg">
                                Benefits
                            </h2>

                            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                                {/* Benefit 1 */}
                                <div className="flex items-center gap-3.5">
                                    <div className="flex size-9.5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#1e1e24] text-muted-foreground">
                                        <ShieldCheck className="size-4.5 text-gray-300" />
                                    </div>
                                    <span className="text-xs font-medium text-foreground sm:text-sm">
                                        Full Health &amp; Dental
                                    </span>
                                </div>

                                {/* Benefit 2 */}
                                <div className="flex items-center gap-3.5">
                                    <div className="flex size-9.5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#1e1e24] text-muted-foreground">
                                        <Coins className="size-4.5 text-gray-300" />
                                    </div>
                                    <span className="text-xs font-medium text-foreground sm:text-sm">
                                        Competitive 401k
                                    </span>
                                </div>

                                {/* Benefit 3 */}
                                <div className="flex items-center gap-3.5">
                                    <div className="flex size-9.5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#1e1e24] text-muted-foreground">
                                        <Laptop className="size-4.5 text-gray-300" />
                                    </div>
                                    <span className="text-xs font-medium text-foreground sm:text-sm">
                                        Latest Hardware Stipend
                                    </span>
                                </div>

                                {/* Benefit 4 */}
                                <div className="flex items-center gap-3.5">
                                    <div className="flex size-9.5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#1e1e24] text-muted-foreground">
                                        <Plane className="size-4.5 text-gray-300" />
                                    </div>
                                    <span className="text-xs font-medium text-foreground sm:text-sm">
                                        Unlimited PTO
                                    </span>
                                </div>
                            </div>
                        </div>

                    </main>

                    {/* RIGHT COLUMN: COMPANY OVERVIEW SIDEBAR */}
                    <aside className="lg:col-span-4">
                        <div className="rounded-2xl border border-white/[0.08] bg-[#16161a] p-5 shadow-xl sm:p-6">

                            <h2 className="text-base font-bold text-white sm:text-lg">
                                Company Overview
                            </h2>

                            {/* Workspace / Office Visual Showcase */}
                            <div className="relative mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#101014]">
                                {/* Framed modern tech workspace preview */}
                                <div className="relative h-44 w-full bg-[#0a0a0d] sm:h-48">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#16161a] via-transparent to-transparent opacity-80" />

                                    {/* Architectural Room Visual */}
                                    <div className="relative flex h-full w-full items-center justify-center p-4">
                                        {/* Desktop display screen */}
                                        <div className="relative flex h-28 w-44 flex-col items-center justify-center rounded-lg border border-white/15 bg-gradient-to-b from-[#181820] to-[#0d0d12] shadow-2xl">
                                            {/* Screen inner mock */}
                                            <div className="flex h-full w-full flex-col p-2">
                                                <div className="flex items-center gap-1 border-b border-white/10 pb-1">
                                                    <div className="size-1.5 rounded-full bg-red-400/80" />
                                                    <div className="size-1.5 rounded-full bg-yellow-400/80" />
                                                    <div className="size-1.5 rounded-full bg-green-400/80" />
                                                </div>
                                                <div className="mt-2 space-y-1.5 opacity-60">
                                                    <div className="h-1.5 w-3/4 rounded-full bg-indigo-500/40" />
                                                    <div className="h-1.5 w-1/2 rounded-full bg-white/20" />
                                                    <div className="h-1.5 w-2/3 rounded-full bg-white/20" />
                                                </div>
                                            </div>
                                            {/* Monitor stand base */}
                                            <div className="absolute -bottom-2 h-2 w-6 rounded-t-sm bg-white/30" />
                                            <div className="absolute -bottom-2.5 h-0.5 w-12 rounded-full bg-white/20" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Company Stats Information Rows */}
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between text-xs sm:text-sm">
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                        Size
                                    </span>
                                    <span className="font-medium text-foreground">
                                        250 &ndash; 500 Employees
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-xs sm:text-sm">
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                        Industry
                                    </span>
                                    <span className="font-medium text-foreground">
                                        SaaS / Artificial Intelligence
                                    </span>
                                </div>
                            </div>

                            {/* Visit Website Action Button */}
                            <div className="mt-6">
                                <a
                                    href="https://cloudscale.ai"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#1e1e24] py-2.5 text-xs font-semibold text-gray-200 transition-all duration-200 hover:border-white/20 hover:bg-[#25252c] hover:text-white sm:text-sm"
                                >
                                    <span>Visit Website</span>
                                    <ExternalLink className="size-3.5 text-muted-foreground" />
                                </a>
                            </div>

                        </div>
                    </aside>

                </div>

            </div>

            {/* ============================================================
                APPLY NOW INTERACTIVE MODAL
            ============================================================ */}
            {isApplyModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
                    <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#16161a] p-6 shadow-2xl sm:p-7">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-border pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">
                                    Apply for Senior Product Designer
                                </h3>
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                    CloudScale AI &bull; Remote (US)
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsApplyModalOpen(false)}
                                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <X className="size-4.5" />
                            </button>
                        </div>

                        {/* Success Notification Alert */}
                        {applySuccess ? (
                            <div className="my-8 flex flex-col items-center justify-center text-center">
                                <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                                    <Check className="size-6" />
                                </div>
                                <h4 className="mt-3 text-base font-bold text-white">
                                    Application Submitted!
                                </h4>
                                <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                                    CloudScale AI hiring team has received your application and will review your profile.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleApplySubmit} className="mt-5 space-y-4">
                                <div>
                                    <label
                                        htmlFor="modal-name"
                                        className="block text-xs font-medium text-foreground"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        id="modal-name"
                                        type="text"
                                        required
                                        value={applicantName}
                                        onChange={(e) => setApplicantName(e.target.value)}
                                        placeholder="Alex Morgan"
                                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#101014] px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-white/30 focus:outline-none sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="modal-email"
                                        className="block text-xs font-medium text-foreground"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id="modal-email"
                                        type="email"
                                        required
                                        value={applicantEmail}
                                        onChange={(e) => setApplicantEmail(e.target.value)}
                                        placeholder="alex@example.com"
                                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#101014] px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-white/30 focus:outline-none sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="modal-note"
                                        className="block text-xs font-medium text-foreground"
                                    >
                                        Portfolio / Note to Hiring Team
                                    </label>
                                    <textarea
                                        id="modal-note"
                                        rows={3}
                                        value={coverNote}
                                        onChange={(e) => setCoverNote(e.target.value)}
                                        placeholder="https://portfolio.design &mdash; Excited about designing infrastructure tools at CloudScale AI..."
                                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#101014] px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-white/30 focus:outline-none sm:text-sm"
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isApplying}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-xs font-bold text-black shadow-md transition-all hover:bg-white/90 disabled:opacity-50 sm:text-sm"
                                    >
                                        {isApplying ? (
                                            <>
                                                <Loader2 className="size-4 animate-spin" />
                                                <span>Submitting Application...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="size-4" />
                                                <span>Submit Application</span>
                                            </>
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