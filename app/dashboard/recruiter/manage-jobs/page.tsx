import Link from "next/link";
import {
    BangladeshiTaka,
    ChevronRight,
    Code,
    Globe,
    MapPin,
    Pencil,
    Plus,
    Search,
    Users,
} from "lucide-react";
import { getJobs, getJobsByUserId } from "@/lib/api/Jobs";
import { JobType } from "@/type/JobType";
import { format, formatDistance } from "date-fns";
import { JobDeleteDialog } from "@/components/JobDeleteDialog";
import { FormatSalary } from "@/components/ui/FormatSalary";
import { getSession } from "@/lib/core/server";



const ManageJobsPage = async () => {
    const session = await getSession();
    const userId = session?.user.id;
    const jobs: JobType[] = await getJobsByUserId(userId as string);

    return (
        <div className="pb-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>Manage Jobs {jobs.length}</span>
                        <ChevronRight className="size-3" />
                        <span className="font-medium text-primary">
                            Job Listings & Postings
                        </span>
                    </nav>

                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Manage Job Posts
                    </h1>
                    <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
                        Review live listings, monitor applicants, and update job details
                        across your organization.
                    </p>
                </div>

                <Link
                    href="/dashboard/recruiter/add-job"
                    className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#6d5efc] px-4 text-sm font-semibold text-white shadow-lg shadow-[#6d5efc]/20 transition-colors hover:bg-[#7b6dff]"
                >
                    <Plus className="size-4 stroke-[2.5]" />
                    New Job Post
                </Link>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/8 bg-[#121216]">
                {
                    jobs.length === 0 ?
                        <div className="p-6 min-h-50 flex items-center flex-col justify-center gap-3">
                            <h1><Search size={30} className="text-foreground/80" /></h1>
                            <h2 className="text-lg font-semibold">No Job Post Found</h2>
                        </div>
                        :
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-275 text-left">
                                <thead>
                                    <tr className="border-b border-white/6 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                        <th className="px-5 py-4 font-medium sm:px-6">
                                            Job Title & Dept
                                        </th>
                                        <th className="px-4 py-4 font-medium">
                                            Company & Location
                                        </th>
                                        <th className="px-4 py-4 font-medium">Type</th>
                                        <th className="px-4 py-4 font-medium">Compensation</th>
                                        <th className="px-4 py-4 font-medium">Applicants</th>
                                        <th className="px-4 py-4 font-medium">Status</th>
                                        <th className="px-4 py-4 font-medium">Deadline</th>
                                        <th className="px-4 py-4 pr-5 text-right font-medium sm:pr-6">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {jobs.map((job) => {

                                        return (
                                            <tr
                                                key={job._id}
                                                className="transition-colors hover:bg-white/2"
                                            >
                                                <td className="px-5 py-4 sm:px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`flex size-10 shrink-0 items-center justify-center rounded-xl`}
                                                        >
                                                            <Code className="size-4.5" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-semibold text-white">
                                                                {job.jobTitle}
                                                            </p>
                                                            <p
                                                                className={`mt-0.5 text-xs font-medium`}
                                                            >
                                                                {job.jobCategory}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-1.5 text-sm text-white">
                                                        <Globe className="size-3.5 shrink-0 text-muted-foreground" />
                                                        <span className="truncate">{job.companyName}</span>
                                                    </div>
                                                    <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                                                        <MapPin className="size-3.5 shrink-0" />
                                                        <span className="truncate">{job.jobLocation}</span>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="inline-flex rounded-full whitespace-nowrap border border-white/10 bg-white/4 px-2.5 py-1 text-[11px] font-medium text-gray-300">
                                                        {job.jobType}
                                                    </span>
                                                </td>

                                                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-200 flex items-center gap-1">
                                                    <BangladeshiTaka size={15} />{FormatSalary(job.minSalary)} - {FormatSalary(job.maxSalary)} / {job.frequency}
                                                </td>

                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-1.5 text-sm font-medium text-violet-300">
                                                        <Users className="size-5" />
                                                        5 Candidates
                                                    </div>
                                                </td>

                                                <td className="px-4 py-4">
                                                    {job.status.toLocaleLowerCase() === "active" ? (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-400">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                                                            Expired
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="whitespace-nowrap px-4 py-4">
                                                    <p className="text-sm text-white">{format(new Date(job.deadline), "MM/dd/yyyy")}</p>
                                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                                        {job.createdAt ? formatDistance(new Date(job.createdAt), new Date(), {
                                                            addSuffix: true
                                                        }) : "N/A"}
                                                    </p>
                                                </td>

                                                <td className="px-4 py-4 pr-5 sm:pr-6">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#2a2550] px-3 py-1.5 text-xs font-medium text-violet-200 transition-colors hover:bg-[#352e63]"
                                                        >
                                                            <Pencil className="size-3.5" />
                                                            Update
                                                        </button>
                                                        <JobDeleteDialog jobId={job._id as string} />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                }

            </div>
        </div>
    );
};

export default ManageJobsPage;
