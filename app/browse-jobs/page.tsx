
import {
    SlidersHorizontal,
} from "lucide-react";
import JobSearchBox from "./_components/jobSearchBox";
import JobSearchFilter from "./_components/jobSearchFilter";
import { getJobs } from "@/lib/api/Jobs";
import { JobType } from "@/type/JobType";
import JobCard from "@/components/JobCard";
import EmptyContent from "./_components/emptyContent";



const BrowseJobsPage = async ({ searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {

    const search = await searchParams;

    const query = new URLSearchParams(search as Record<string, string>).toString();

    const jobs: JobType[] = await getJobs(query);

    return (
        <div className="min-h-screen bg-background pb-16 pt-6 sm:pb-24 sm:pt-8">
            <div className="section-container">

                {/* ================= TOP SEARCH BAR CARD ======== */}
                <JobSearchBox />

                {/* Mobile Filter Toggle Button */}
                <div className="mt-4 flex items-center justify-between lg:hidden">
                    <button
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#16161a] px-4 py-2 text-xs font-medium text-foreground hover:bg-white/5"
                    >
                        <SlidersHorizontal className="size-3.5" />
                        <span>Filters 5</span>
                    </button>

                    <div className="text-xs text-muted-foreground">
                        Found <span className="font-semibold text-foreground">{jobs.length}</span> Jobs
                    </div>
                </div>

                {/* ============================================================
                    MAIN CONTENT GRID (FILTERS + JOBS LIST)
                ============================================================ */}
                <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-7">

                    {/* ===========  FILTERS SIDEBAR =============== */}
                    <JobSearchFilter />

                    {/* ========================================================
                        RIGHT COLUMN: JOBS LISTING
                    ======================================================== */}
                    <main className="lg:col-span-9 xl:col-span-9">

                        {/* Top Header Row: Counter + Sort Dropdown */}
                        <div>
                            <h1 className="text-base font-bold tracking-tight text-foreground sm:text-xl">
                                Found {jobs?.length} Professional Jobs
                            </h1>
                        </div>

                        {/* Job Cards Stack */}
                        <div className="mt-4 space-y-3.5">
                            {
                                jobs.length === 0 ?
                                    <EmptyContent />
                                    :

                                    jobs?.map((job) => (
                                        <JobCard key={job._id} job={job} />
                                    ))
                            }
                        </div>

                    </main>

                </div>
            </div>

            {/* ============================================================
                MOBILE FILTERS DRAWER MODAL
            ============================================================ */}
            {/* {mobileFiltersOpen && (
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
            )} */}
        </div>
    );
}

export default BrowseJobsPage;