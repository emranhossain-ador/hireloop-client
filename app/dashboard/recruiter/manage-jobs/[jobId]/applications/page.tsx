"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import {
    ArrowLeft,
    Check,
    ChevronDown,
    ChevronRight,
    Clock,
    Mail,
    Users,
} from "lucide-react";
import { ApplicationStatus } from "@/type/ApplicationStatus";
import { getApplicationsByJobId } from "@/lib/api/JobApplications";
import { changeJobApplicationStatus } from "@/lib/actions/JobApply";


interface Application {
    _id: string;
    status: ApplicationStatus;
    appliedAt: string;
    userInfo: {
        name: string;
        email: string;
    };
    jobInfo: {
        jobTitle: string;
        companyName: string;
    };
}

const statusOptions: { value: ApplicationStatus; label: string; badgeClass: string; dotClass: string }[] = [
    {
        value: "Pending",
        label: "Pending",
        badgeClass: "border-amber-500/25 bg-amber-500/10 text-amber-300",
        dotClass: "bg-amber-400",
    },
    {
        value: "Review",
        label: "In Review",
        badgeClass: "border-blue-500/25 bg-blue-500/10 text-blue-300",
        dotClass: "bg-blue-400",
    },
    {
        value: "Interviewing",
        label: "Interviewing",
        badgeClass: "border-purple-500/25 bg-purple-500/10 text-purple-300",
        dotClass: "bg-purple-400",
    },
    {
        value: "Shortlisted",
        label: "Shortlisted",
        badgeClass: "border-indigo-500/25 bg-indigo-500/10 text-indigo-300",
        dotClass: "bg-indigo-400",
    },
    {
        value: "Offered",
        label: "Offered",
        badgeClass: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
        dotClass: "bg-emerald-400 shadow-[0_0_6px_#34d399]",
    },
    {
        value: "Rejected",
        label: "Rejected",
        badgeClass: "border-rose-500/25 bg-rose-500/10 text-rose-300",
        dotClass: "bg-rose-400",
    },
];



const getStatusConfig = (status: ApplicationStatus) => {
    return (
        statusOptions.find((opt) => opt.value === status) || {
            value: status,
            label: status,
            badgeClass: "border-white/10 bg-white/5 text-gray-300",
            dotClass: "bg-gray-400",
        }
    );
};



const ApplicationPage = ({ params }: { params: Promise<{ jobId: string }>; }) => {
    const { jobId } = use(params);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        async function fetchApplications() {
            try {
                const response = await getApplicationsByJobId(jobId);
                setApplications(response.result || []);
            } catch (error) {
                console.error(error);
            }
        }

        fetchApplications();
    }, [jobId]);

    const handleStatusChange = async (candidateId: string, newStatus: ApplicationStatus) => {

        await changeJobApplicationStatus(candidateId, { status: newStatus });

        setApplications((prev) =>
            prev.map((c) => (c._id === candidateId ? { ...c, status: newStatus } : c))
        );
        setOpenDropdownId(null);
    };


    return (
        <div className="mx-auto max-w-7xl pb-20">
            {/* ============================================================
                1. BREADCRUMBS & TOP HEADER
            ============================================================ */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Link
                            href="/dashboard/recruiter/manage-jobs"
                            className="transition-colors hover:text-white"
                        >
                            Manage Jobs
                        </Link>
                        <ChevronRight className="size-3" />
                        <Link
                            href={`/dashboard/recruiter/manage-jobs/${jobId}`}
                            className="transition-colors hover:text-white"
                        >
                            Job Details
                        </Link>
                        <ChevronRight className="size-3" />
                        <span className="font-medium text-primary">Applications</span>
                    </nav>

                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Job Applications
                    </h1>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        Review candidate submissions, track application timelines, and update recruitment stages.
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <Link
                        href={`/dashboard/recruiter/manage-jobs/${jobId}`}
                        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-[#16161a] px-3.5 text-xs font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                    >
                        <ArrowLeft className="size-3.5" />
                        Back to Job
                    </Link>
                </div>
            </div>

            {/* ============================================================
                2. STATS SUMMARY ROW
            ============================================================ */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 sm:gap-4">
                <div className="rounded-2xl border border-white/8 bg-[#121216] p-3.5">
                    <span className="text-[11px] font-medium text-muted-foreground">Total Applicants</span>
                    <div className="mt-1.5 text-xl font-bold text-white sm:text-2xl">
                        1
                    </div>
                </div>

                <div className="rounded-2xl border border-white/8 bg-[#121216] p-3.5">
                    <span className="text-[11px] font-medium text-amber-400">Pending</span>
                    <div className="mt-1.5 text-xl font-bold text-white sm:text-2xl">
                        2
                    </div>
                </div>

                <div className="rounded-2xl border border-white/8 bg-[#121216] p-3.5">
                    <span className="text-[11px] font-medium text-blue-400">In Review</span>
                    <div className="mt-1.5 text-xl font-bold text-white sm:text-2xl">
                        3
                    </div>
                </div>

                <div className="rounded-2xl border border-white/8 bg-[#121216] p-3.5">
                    <span className="text-[11px] font-medium text-purple-400">Interviewing</span>
                    <div className="mt-1.5 text-xl font-bold text-white sm:text-2xl">
                        4
                    </div>
                </div>

                <div className="rounded-2xl border border-white/8 bg-[#121216] p-3.5">
                    <span className="text-[11px] font-medium text-indigo-400">Shortlisted</span>
                    <div className="mt-1.5 text-xl font-bold text-white sm:text-2xl">
                        5
                    </div>
                </div>

                <div className="rounded-2xl border border-white/8 bg-[#121216] p-3.5">
                    <span className="text-[11px] font-medium text-emerald-400">Offered</span>
                    <div className="mt-1.5 text-xl font-bold text-white sm:text-2xl">
                        6
                    </div>
                </div>
            </div>


            {/* ============================================================
                4. APPLICANTS TABLE
            ============================================================ */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/8 bg-[#121216] shadow-xl">
                {applications.length === 0 ? (
                    <div className="flex min-h-60 flex-col items-center justify-center p-8 text-center">
                        <Users className="size-10 text-muted-foreground/60" />
                        <h3 className="mt-3 text-base font-semibold text-white">No applicants match your criteria</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Try adjusting your search query or status filter.
                        </p>
                        <button
                            type="button"
                            className="mt-4 text-xs font-medium text-primary hover:underline"
                        >
                            Reset all filters
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left">
                            <thead>
                                <tr className="border-b border-white/6 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    <th className="px-5 py-3.5 font-medium sm:px-6">Candidate</th>
                                    <th className="px-4 py-3.5 font-medium">Applied</th>
                                    <th className="px-4 py-3.5 font-medium">Status</th>
                                    <th className="px-4 py-3.5 pr-5 text-right font-medium sm:pr-6">
                                        Update Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {applications.map((candidate, i) => {
                                    const config = getStatusConfig(candidate.status);
                                    const isDropdownOpen = openDropdownId === candidate._id;

                                    return (
                                        <tr
                                            key={i}
                                            className="transition-colors hover:bg-white/[0.02]"
                                        >
                                            {/* Candidate Name & Contact */}
                                            <td className="px-5 py-4 sm:px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#181820] text-primary font-bold text-sm shadow-inner">
                                                        {candidate.userInfo.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")
                                                            .toUpperCase()
                                                            .slice(0, 2)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-semibold text-white">
                                                            {candidate.userInfo.name}
                                                        </div>
                                                        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                                                            <Mail className="size-3 text-gray-500" />
                                                            <span>{candidate.userInfo.email}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Applied Time */}
                                            <td className="px-4 py-4 text-xs">
                                                <div className="flex items-center gap-1.5 font-medium text-white">
                                                    <Clock className="size-3 text-muted-foreground" />
                                                    <span>
                                                        {formatDistanceToNow(candidate.appliedAt, {
                                                            addSuffix: true,
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="mt-0.5 text-[11px] text-muted-foreground">
                                                    {format(candidate.appliedAt, "MMM dd, yyyy")}
                                                </div>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="px-4 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${config.badgeClass}`}
                                                >
                                                    <span className={`size-1.5 rounded-full ${config.dotClass}`} />
                                                    {config.label}
                                                </span>
                                            </td>

                                            {/* Action Button: Status Change Dropdown */}
                                            <td className="relative px-4 py-4 pr-5 text-right sm:pr-6">
                                                <div className="relative inline-block text-left">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setOpenDropdownId(
                                                                isDropdownOpen ? null : candidate._id
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#16161a] px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:border-white/20 hover:bg-[#1f1f26]"
                                                    >
                                                        <span>Change Status</span>
                                                        <ChevronDown
                                                            className={`size-3 text-muted-foreground transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                                                                }`}
                                                        />
                                                    </button>

                                                    {/* Dropdown Menu */}
                                                    {isDropdownOpen && (
                                                        <div className="absolute right-0 z-30 mt-1.5 w-44 rounded-xl border border-white/10 bg-[#181820] py-1 shadow-2xl backdrop-blur-md">
                                                            <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                                                Select New Status
                                                            </div>
                                                            {statusOptions.map((opt) => {
                                                                const isCurrent =
                                                                    candidate.status === opt.value;
                                                                return (
                                                                    <button
                                                                        key={opt.value}
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleStatusChange(
                                                                                candidate._id,
                                                                                opt.value
                                                                            )
                                                                        }
                                                                        className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors hover:bg-white/5 ${isCurrent
                                                                            ? "font-semibold text-white bg-white/5"
                                                                            : "text-gray-300"
                                                                            }`}
                                                                    >
                                                                        <div className="flex items-center gap-2">
                                                                            <span
                                                                                className={`size-1.5 rounded-full ${opt.dotClass}`}
                                                                            />
                                                                            <span>{opt.label}</span>
                                                                        </div>
                                                                        {isCurrent && (
                                                                            <Check className="size-3 text-primary" />
                                                                        )}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicationPage;
