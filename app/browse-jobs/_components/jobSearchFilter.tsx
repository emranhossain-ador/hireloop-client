"use client"

import { Check } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
const jobCategories = ["Engineering", "Design", "Marketing", "Finance"];

const JobSearchFilter = () => {

    const [jobType, setJobType] = useState<string>();
    const [jobCategory, setJobCategory] = useState<string>();

    const router = useRouter();

    const handleJobTypeFilter = (type: string) => {
        setJobType(type);
        const params = new URLSearchParams(window.location.search);
        params.set('jobType', type as string)
        router.push(`/browse-jobs?${params.toString()}`);
    }

    const handleJobCategoryFilter = (category: string) => {
        setJobCategory(category);
        const params = new URLSearchParams(window.location.search);
        params.set('jobCategory', category as string)
        router.push(`/browse-jobs?${params.toString()}`);
    }


    return (
        <aside className="hidden lg:col-span-3 lg:block xl:col-span-3">
            <div className="rounded-2xl border border-white/8 bg-[#16161a] p-5 shadow-lg">
                <h2 className="text-lg font-bold tracking-tight text-foreground">
                    Filters
                </h2>

                {/* Job Type Section */}
                <div className="mt-5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Job Type
                    </h3>

                    <div className="mt-3.5 space-y-3">
                        {/*Job type Filter */}
                        {
                            jobTypes.map((type: string, i: number) =>
                                <label key={i}
                                    onClick={() => handleJobTypeFilter(type)}
                                    className="group flex cursor-pointer select-none items-center justify-between text-xs sm:text-sm"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div
                                            className={`flex w-5 h-5 shrink-0 items-center justify-center rounded-md border transition-all ${type === jobType ? 'border-white bg-white text-black' : 'border-white/20 bg-white/5 group-hover:border-white/40'}`}
                                        >
                                            {type === jobType && <Check className="size-3 stroke-3" />}
                                        </div>
                                        <span className="font-medium text-foreground/90 transition-colors group-hover:text-white">
                                            {type}
                                        </span>
                                    </div>
                                    <span className="font-mono text-xs text-muted-foreground">
                                        1
                                    </span>
                                </label>
                            )
                        }
                    </div>
                </div>

                {/* Job Category Section */}
                <div className="mt-5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Job Category
                    </h3>

                    <div className="mt-3.5 space-y-3">
                        {/*Job Category Filter */}
                        {
                            jobCategories.map((category: string, i: number) =>
                                <label key={i}
                                    onClick={() => handleJobCategoryFilter(category)}
                                    className="group flex cursor-pointer select-none items-center justify-between text-xs sm:text-sm"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div
                                            className={`flex w-5 h-5 shrink-0 items-center justify-center rounded-md border transition-all ${category === jobCategory ? 'border-white bg-white text-black' : 'border-white/20 bg-white/5 group-hover:border-white/40'}`}
                                        >
                                            {category === jobCategory && <Check className="size-3 stroke-3" />}
                                        </div>
                                        <span className="font-medium text-foreground/90 transition-colors group-hover:text-white capitalize">
                                            {category}
                                        </span>
                                    </div>
                                    <span className="font-mono text-xs text-muted-foreground">
                                        1
                                    </span>
                                </label>
                            )
                        }
                    </div>
                </div>

            </div>
        </aside>
    )
}

export default JobSearchFilter;