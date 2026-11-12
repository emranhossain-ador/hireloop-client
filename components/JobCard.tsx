import { JobType } from "@/type/JobType";
import { BangladeshiTaka, Bookmark, Clock, Zap } from "lucide-react"
import Link from "next/link";
import { FormatSalary } from "./ui/FormatSalary";


const JobCard = ({ job }: { job: JobType }) => {

    return (
        <>
            <article
                className="group relative rounded-2xl border border-white/8 bg-[#16161a] p-5 shadow-sm transition-all duration-200 hover:border-white/20 hover:bg-[#19191f] hover:shadow-lg sm:p-6"
            >
                <div className="flex items-start gap-4 sm:gap-5">
                    {/* Company Logo Thumbnail */}
                    <div className="flex size-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300">
                        <Zap className="size-4" />
                    </div>

                    {/* Job Content Info */}
                    <div className="flex-1 min-w-0">
                        {/* Top Row: Title & Bookmark */}
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-white sm:text-lg">
                                    <Link
                                        href={`/browse-jobs/${job._id}`}
                                        className="hover:underline"
                                    >
                                        {job.jobTitle}
                                    </Link>
                                </h3>

                                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                                    {job.companyName} &bull; {job.jobLocation}
                                </p>
                            </div>

                            {/* Bookmark Button */}
                            <button
                                type="button"
                                aria-label="Save job"
                                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
                            >
                                <Bookmark
                                    className={`size-4.5 sm:size-5 transition-transform active:scale-90 text-muted-foreground`}
                                />
                            </button>
                        </div>

                        {/* Badges / Tags Row */}
                        <div className="mt-3.5 flex flex-wrap items-center gap-2 sm:gap-2.5">
                            {/* Salary Badge */}
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/6 bg-[#1f1f26] px-2.5 py-1 text-[11px] font-medium text-foreground/80 sm:text-xs">
                                <BangladeshiTaka className="size-3.5 text-muted-foreground" />
                                <span>{FormatSalary(job.minSalary)} - {FormatSalary(job.maxSalary)}</span>
                            </span>

                            {/* Job Type Badge */}
                            {job.jobType && (
                                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/6 bg-[#1f1f26] px-2.5 py-1 text-[11px] font-medium text-foreground/80 sm:text-xs">
                                    <Clock className="size-3.5 text-muted-foreground" />
                                    <span>{job.jobType}</span>
                                </span>
                            )}

                            {/* Hybrid / Remote Badge */}
                            <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/6 bg-[#1f1f26] px-2.5 py-1 text-[11px] font-medium text-foreground/80 sm:text-xs">
                                <span className="text-[10px] text-muted-foreground">
                                    ◇
                                </span>
                                <span>{job.jobCategory}</span>
                            </span>

                            {/* Easy Apply Tag (Green) */}
                            {/* <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400 sm:text-xs">
                                <Zap className="size-3.5 fill-current" />
                                <span>Easy Apply</span>
                            </span> */}

                            {/* Hot Job Tag (Amber) */}
                            {/* <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/25 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-400 sm:text-xs">
                                <Flame className="size-3.5" />
                                <span>Hot Job</span>
                            </span> */}
                        </div>
                    </div>
                </div>
            </article>

        </>
    )
};

export default JobCard;