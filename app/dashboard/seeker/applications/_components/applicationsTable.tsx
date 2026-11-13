import { myApplications } from "@/lib/api/JobApplications";
import { auth } from "@/lib/auth";
import { ApplicationStatus } from "@/type/ApplicationStatus";
import { JobApplicationType } from "@/type/JobApplications";
import { formatDistance } from "date-fns";
import { Eye, EyeIcon, RowsIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";


const GRID_COLS =
    "md:grid-cols-[minmax(0,2.4fr)_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_auto]";

const statusStyles: Record<ApplicationStatus, string> = {
    Pending: "border-yellow-500/20 bg-yellow-500/10 text-yellow-500",
    Applied: "border-blue-500/20 bg-blue-500/10 text-blue-500",
    Review: "border-purple-500/20 bg-purple-500/10 text-purple-500",
    Interviewing: "border-indigo-500/20 bg-indigo-500/10 text-indigo-500",
    Shortlisted: "border-cyan-500/20 bg-cyan-500/10 text-cyan-500",
    Offered: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
    Rejected: "border-red-500/20 bg-red-500/10 text-red-500",
};

const ApplicationsTable = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;

    const myApplyInfo = await myApplications(user?.id as string);

    const myApplyJobs: JobApplicationType[] = myApplyInfo.result;

    return (
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/8 bg-[#16161a] shadow-sm">

            {/* Table Header (desktop) */}
            <div className={`hidden gap-4 bg-white/2 px-6 py-3.5 text-xs font-medium text-muted-foreground md:grid ${GRID_COLS}`}>
                <div>Job Title</div>
                <div>Company</div>
                <div>Applied</div>
                <div>Status</div>
                <div className="justify-self-end pr-1">Action</div>
            </div>

            {/* Table Rows */}
            {
                myApplyJobs.length === 0 ?
                    <div className="px-6 py-14 text-center">
                        <p className="text-sm font-medium text-white">
                            Not found applications.
                        </p>
                    </div>
                    :

                    myApplyJobs.map(job =>

                        <div
                            key={job._id}
                            className={`flex flex-col gap-3 border-t border-white/6 px-4 py-4 transition-colors hover:bg-white/2 md:grid md:items-center md:gap-4 md:px-6 md:py-4.5 ${GRID_COLS}`}
                        >
                            {/* Stacked wrapper becomes grid cells on desktop */}
                            <div className="flex min-w-0 items-center gap-3">
                                <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl border bg-accent `}>
                                    <RowsIcon className="size-4.5" />
                                </div>
                                <div className="min-w-0">
                                    <div className="truncate text-sm font-semibold text-white">
                                        {job.jobList.jobTitle}
                                    </div>
                                    <div className="mt-0.5 truncate text-xs text-muted-foreground">
                                        {job.jobList.jobType} - {job.jobList.remote ? "Remote" : "On-Site"}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 md:contents">
                                <div className="text-sm text-gray-300">{job.jobList.companyName}</div>
                                <div className="text-xs text-muted-foreground">
                                    {formatDistance(new Date(job.appliedAt), new Date(), {
                                        addSuffix: true
                                    })}
                                </div>
                                <div>
                                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusStyles[job.status]}`}>
                                        {job.status}
                                    </span>
                                </div>
                                <div className="md:justify-self-end">
                                    <Link href={`/browse-jobs/${job.jobId}`} target="_blank"
                                        className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold text-white bg-sky-500 transition-colors hover:bg-sky-600"
                                    >
                                        <EyeIcon size={15} />
                                        <span className="hidden sm:block">Details</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )

            }


        </div>
    );
};


export default ApplicationsTable;