
import Link from "next/link";
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
    ExternalLink,
    BangladeshiTaka,
} from "lucide-react";
import { getJobById } from "@/lib/api/Jobs";
import { JobType } from "@/type/JobType";
import { FormatSalary } from "@/components/ui/FormatSalary";
import ApplyNowButton from "@/components/ApplyNowButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const JobDetailsPage = async ({ params }: { params: Promise<{ jobsId: string }> }) => {
    const { jobsId } = await params;

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user;

    const jobDetails: JobType = await getJobById(jobsId);

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
                                    {jobDetails.jobTitle}
                                </h1>
                                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                                    <span className="font-medium text-foreground/90">
                                        {jobDetails.companyName}
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
                        {
                            user?.role === 'seeker' &&

                            <div className="flex items-center gap-3 self-end sm:self-center">
                                {/* Bookmark Button */}
                                <button
                                    type="button"
                                    className={`flex size-11 items-center justify-center rounded-xl border border-white/10 bg-[#1e1e24] text-foreground transition-all duration-200 hover:border-white/25 hover:bg-[#25252c] active:scale-95 text-gray-300`}
                                >
                                    <Bookmark
                                        className={`size-4.5 text-gray-300`}
                                    />
                                </button>

                                {/* Apply Now Primary Action */}
                                <ApplyNowButton jobId={jobDetails._id as string} />
                            </div>
                        }


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
                        <div className="mt-1 text-sm flex items-center gap-1 font-bold text-white sm:text-base">
                            <BangladeshiTaka size={15} /> {FormatSalary(jobDetails.minSalary)} &ndash; <BangladeshiTaka size={15} />{FormatSalary(jobDetails.maxSalary)}
                        </div>
                    </div>

                    {/* Stat 2: Location */}
                    <div className="rounded-2xl border border-white/[0.08] bg-[#16161a] p-4 sm:p-5">
                        <MapPin className="size-4.5 text-muted-foreground" />
                        <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                            Location
                        </div>
                        <div className="mt-1 text-sm font-bold text-white sm:text-base">
                            {jobDetails.remote ? "( Remote )" : jobDetails.jobLocation}
                        </div>
                    </div>

                    {/* Stat 3: Job Type */}
                    <div className="rounded-2xl border border-white/[0.08] bg-[#16161a] p-4 sm:p-5">
                        <Clock className="size-4.5 text-muted-foreground" />
                        <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[11px]">
                            Job Type
                        </div>
                        <div className="mt-1 text-sm font-bold text-white sm:text-base">
                            {jobDetails.jobType}
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
                                {jobDetails.qualifications}
                            </p>
                        </div>

                        <div className="my-7 border-t border-white/6" />

                        {/* SECTION: RESPONSIBILITIES */}
                        <div>
                            <h2 className="text-base font-bold text-white sm:text-lg">
                                Responsibilities
                            </h2>
                            <div className="mt-3">
                                {jobDetails.responsibilities}
                            </div>
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

        </div>
    );
}

export default JobDetailsPage;