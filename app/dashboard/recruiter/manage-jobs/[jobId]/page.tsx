import Link from "next/link";
import { format, formatDistance } from "date-fns";
import {
    ArrowLeft,
    BangladeshiTaka,
    Building2,
    Calendar,
    ChevronRight,
    Clock,
    FileText,
    Globe,
    GraduationCap,
    ListChecks,
    MapPin,
    Pencil,
    ShieldCheck,
    Users,
    Zap,
} from "lucide-react";

import { getJobById } from "@/lib/api/Jobs";
import { JobType } from "@/type/JobType";
import { FormatSalary } from "@/components/ui/FormatSalary";
import { JobDeleteDialog } from "@/components/JobDeleteDialog";

const JobDetailsPage = async ({
    params,
}: {
    params: Promise<{ jobId: string }>;
}) => {
    const { jobId } = await params;

    let jobDetails: JobType | null = null;
    try {
        jobDetails = await getJobById(jobId);
    } catch {
        jobDetails = null;
    }

    if (!jobDetails || !jobDetails._id) {
        return (
            <div className="mx-auto max-w-4xl py-16 text-center">
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-[#16161a] text-muted-foreground">
                    <FileText className="size-7" />
                </div>
                <h2 className="text-xl font-bold text-white">Job Not Found</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                    The requested job posting does not exist or has been removed.
                </p>
                <div className="mt-6">
                    <Link
                        href="/dashboard/recruiter/manage-jobs"
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary/90"
                    >
                        <ArrowLeft className="size-3.5" />
                        Back to Manage Jobs
                    </Link>
                </div>
            </div>
        );
    }

    const isActive = jobDetails.status?.toLowerCase() === "active";
    const deadlineDate = jobDetails.deadline ? new Date(jobDetails.deadline) : null;

    // Helper to format multiline text as bullet points or clean paragraphs
    const renderFormattedText = (text: string | undefined) => {
        if (!text) return <p className="text-muted-foreground">None specified</p>;

        const lines = text
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);

        if (lines.length > 1) {
            return (
                <ul className="space-y-2.5">
                    {lines.map((line, idx) => {
                        const cleanLine = line.replace(/^[•\-\*]\s*/, "");
                        return (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 sm:text-sm">
                                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                                <span className="leading-relaxed">{cleanLine}</span>
                            </li>
                        );
                    })}
                </ul>
            );
        }

        return (
            <p className="whitespace-pre-line text-xs leading-relaxed text-gray-300 sm:text-sm">
                {text}
            </p>
        );
    };

    return (
        <div className="mx-auto max-w-6xl pb-20">
            {/* ============================================================
                1. BREADCRUMB & TOP ACTIONS BAR
            ============================================================ */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Link
                            href="/dashboard/recruiter/manage-jobs"
                            className="transition-colors hover:text-white"
                        >
                            Manage Jobs
                        </Link>
                        <ChevronRight className="size-3" />
                        <span className="font-medium text-primary">Job Details</span>
                    </nav>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {jobDetails.jobTitle}
                    </h1>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                        <span className="font-medium text-white">{jobDetails.companyName}</span>
                        <span>&bull;</span>
                        <span>{jobDetails.jobCategory}</span>
                        <span>&bull;</span>
                        <span>
                            Posted{" "}
                            {jobDetails.createdAt
                                ? formatDistance(new Date(jobDetails.createdAt), new Date(), {
                                      addSuffix: true,
                                  })
                                : "recently"}
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    {/* View Applications Button */}
                    <Link
                        href={`/dashboard/recruiter/manage-jobs/${jobDetails._id}/applications`}
                        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-[#6d5efc] px-3.5 text-xs font-semibold text-white shadow-lg shadow-[#6d5efc]/20 transition-all hover:bg-[#7b6dff]"
                    >
                        <Users className="size-3.5" />
                        View Applications
                    </Link>

                    <Link
                        href="/dashboard/recruiter/manage-jobs"
                        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-[#16161a] px-3.5 text-xs font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                    >
                        <ArrowLeft className="size-3.5" />
                        Back to List
                    </Link>

                    <Link
                        href={`/dashboard/recruiter/add-job?edit=${jobDetails._id}`}
                        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                    >
                        <Pencil className="size-3.5" />
                        Edit Job
                    </Link>

                    <JobDeleteDialog jobId={jobDetails._id as string} />
                </div>
            </div>

            {/* ============================================================
                2. HEADER SUMMARY BANNER
            ============================================================ */}
            <div className="mt-6 rounded-2xl border border-white/8 bg-[#121216] p-5 shadow-xl sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#181820] text-primary shadow-inner sm:size-16">
                            <Building2 className="size-7" />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-2.5">
                                <span className="text-lg font-bold text-white sm:text-xl">
                                    {jobDetails.companyName}
                                </span>
                                {isActive ? (
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                                        Active
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-0.5 text-xs font-medium text-rose-400">
                                        <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                                        Expired
                                    </span>
                                )}
                                {jobDetails.remote && (
                                    <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-300">
                                        <Globe className="size-3" />
                                        Remote
                                    </span>
                                )}
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground sm:text-sm">
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="size-3.5 text-gray-400" />
                                    {jobDetails.jobLocation || "Not specified"}
                                </span>
                                <span>&bull;</span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="size-3.5 text-gray-400" />
                                    {jobDetails.jobType}
                                </span>
                                <span>&bull;</span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="size-3.5 text-gray-400" />
                                    Deadline:{" "}
                                    {deadlineDate
                                        ? format(deadlineDate, "MMM dd, yyyy")
                                        : "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-[#16161a] p-4 text-left sm:text-right">
                        <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                            Compensation Range
                        </div>
                        <div className="mt-1 flex items-center gap-1 text-lg font-bold text-white sm:justify-end sm:text-xl">
                            <BangladeshiTaka className="size-5 text-primary" />
                            <span>
                                {FormatSalary(jobDetails.minSalary)} &ndash;{" "}
                                {FormatSalary(jobDetails.maxSalary)}
                            </span>
                        </div>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                            Per {jobDetails.frequency || "month"}
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================================
                3. STAT CARDS ROW
            ============================================================ */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                <Link
                    href={`/dashboard/recruiter/manage-jobs/${jobDetails._id}/applications`}
                    className="group rounded-2xl border border-white/8 bg-[#121216] p-4 transition-all hover:border-primary/40 hover:bg-[#16161f]"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                            Applications
                        </span>
                        <Users className="size-4 text-primary" />
                    </div>
                    <div className="mt-2 text-base font-bold text-white sm:text-lg flex items-center gap-2">
                        <span>View Candidates</span>
                        <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                        Review applicants for this post
                    </div>
                </Link>

                <div className="rounded-2xl border border-white/8 bg-[#121216] p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Job Status</span>
                        <ShieldCheck className="size-4 text-primary" />
                    </div>
                    <div className="mt-2 text-base font-bold capitalize text-white sm:text-lg">
                        {jobDetails.status}
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                        {isActive ? "Active on platform" : "Not accepting applications"}
                    </div>
                </div>

                <div className="rounded-2xl border border-white/8 bg-[#121216] p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Workplace</span>
                        <Globe className="size-4 text-primary" />
                    </div>
                    <div className="mt-2 text-base font-bold text-white sm:text-lg">
                        {jobDetails.remote ? "Remote Friendly" : "On-site / Hybrid"}
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground truncate">
                        {jobDetails.jobLocation}
                    </div>
                </div>

                <div className="rounded-2xl border border-white/8 bg-[#121216] p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Application Deadline</span>
                        <Calendar className="size-4 text-primary" />
                    </div>
                    <div className="mt-2 text-base font-bold text-white sm:text-lg">
                        {deadlineDate ? format(deadlineDate, "MM/dd/yyyy") : "N/A"}
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                        {deadlineDate
                            ? formatDistance(deadlineDate, new Date(), { addSuffix: true })
                            : "No deadline"}
                    </div>
                </div>
            </div>

            {/* ============================================================
                4. MAIN DETAILS & SPECIFICATIONS (2 COLUMNS)
            ============================================================ */}
            <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
                {/* Left Column: Responsibilities & Qualifications */}
                <div className="space-y-6 lg:col-span-8">
                    {/* Responsibilities Section */}
                    <div className="rounded-2xl border border-white/8 bg-[#121216] p-6 shadow-sm">
                        <div className="flex items-center gap-2.5 border-b border-white/6 pb-4">
                            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <ListChecks className="size-4.5" />
                            </div>
                            <h2 className="text-base font-bold text-white sm:text-lg">
                                Key Responsibilities
                            </h2>
                        </div>
                        <div className="pt-5">
                            {renderFormattedText(jobDetails.responsibilities)}
                        </div>
                    </div>

                    {/* Qualifications / Description Section */}
                    <div className="rounded-2xl border border-white/8 bg-[#121216] p-6 shadow-sm">
                        <div className="flex items-center gap-2.5 border-b border-white/6 pb-4">
                            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <GraduationCap className="size-4.5" />
                            </div>
                            <h2 className="text-base font-bold text-white sm:text-lg">
                                Requirements &amp; Qualifications
                            </h2>
                        </div>
                        <div className="pt-5">
                            {renderFormattedText(jobDetails.qualifications)}
                        </div>
                    </div>
                </div>

                {/* Right Column: Overview Sidebar */}
                <aside className="space-y-6 lg:col-span-4">
                    {/* Applications Quick Link Card */}
                    <div className="rounded-2xl border border-[#6d5efc]/25 bg-gradient-to-b from-[#6d5efc]/10 to-[#121216] p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#6d5efc]/20 px-2.5 py-0.5 text-[11px] font-semibold text-[#8b7eff]">
                                <Users className="size-3" />
                                Applicants Hub
                            </span>
                        </div>
                        <h3 className="mt-3 text-base font-bold text-white">
                            Candidate Applications
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                            View all applicants who applied for this position, review resumes, and update recruitment stages.
                        </p>
                        <Link
                            href={`/dashboard/recruiter/manage-jobs/${jobDetails._id}/applications`}
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6d5efc] py-2.5 text-xs font-semibold text-white shadow-md shadow-[#6d5efc]/20 transition-all hover:bg-[#7b6dff]"
                        >
                            <span>Manage Applications</span>
                            <ChevronRight className="size-3.5" />
                        </Link>
                    </div>

                    {/* Job Overview Card */}
                    <div className="rounded-2xl border border-white/8 bg-[#121216] p-5 shadow-sm sm:p-6">
                        <h3 className="text-sm font-bold text-white sm:text-base">
                            Job Overview
                        </h3>

                        <div className="mt-4 divide-y divide-white/6 text-xs sm:text-sm">
                            <div className="flex items-center justify-between py-3">
                                <span className="text-muted-foreground">Category</span>
                                <span className="font-medium text-white">
                                    {jobDetails.jobCategory}
                                </span>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <span className="text-muted-foreground">Job Type</span>
                                <span className="font-medium text-white">
                                    {jobDetails.jobType}
                                </span>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <span className="text-muted-foreground">Workplace</span>
                                <span className="font-medium text-white">
                                    {jobDetails.remote ? "Remote" : "On-site / Hybrid"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <span className="text-muted-foreground">Location</span>
                                <span className="font-medium text-right text-white">
                                    {jobDetails.jobLocation || "N/A"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <span className="text-muted-foreground">Compensation</span>
                                <span className="font-medium text-right text-white">
                                    {FormatSalary(jobDetails.minSalary)} -{" "}
                                    {FormatSalary(jobDetails.maxSalary)} /{" "}
                                    {jobDetails.frequency}
                                </span>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <span className="text-muted-foreground">Deadline</span>
                                <span className="font-medium text-right text-white">
                                    {deadlineDate
                                        ? format(deadlineDate, "MMMM dd, yyyy")
                                        : "N/A"}
                                </span>
                            </div>

                            {jobDetails.createdAt && (
                                <div className="flex items-center justify-between py-3">
                                    <span className="text-muted-foreground">Posted Date</span>
                                    <span className="font-medium text-right text-white">
                                        {format(new Date(jobDetails.createdAt), "MMMM dd, yyyy")}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 border-t border-white/6 pt-5">
                            <Link
                                href={`/browse-jobs/${jobDetails._id}`}
                                target="_blank"
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#16161a] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-white/5 sm:text-sm"
                            >
                                <Zap className="size-3.5 text-primary" />
                                <span>Preview Public Listing</span>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Management Actions Card */}
                    <div className="rounded-2xl border border-white/8 bg-[#121216] p-5 shadow-sm">
                        <h3 className="text-sm font-bold text-white">Actions</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Update details or remove this job listing from active searches.
                        </p>

                        <div className="mt-4 flex flex-col gap-2.5">
                            <Link
                                href={`/dashboard/recruiter/add-job?edit=${jobDetails._id}`}
                                className="flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-semibold text-white transition-colors hover:bg-primary/90"
                            >
                                <Pencil className="size-3.5" />
                                <span>Edit Posting</span>
                            </Link>

                            <Link
                                href="/dashboard/recruiter/manage-jobs"
                                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent py-2.5 text-xs font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                            >
                                <span>All Postings</span>
                            </Link>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default JobDetailsPage;
