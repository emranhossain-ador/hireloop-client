import { Check } from "lucide-react"

const JobSearchFilter = () => {
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
                        {/* Full-time Filter */}
                        <label
                            className="group flex cursor-pointer select-none items-center justify-between text-xs sm:text-sm"
                        >
                            <div className="flex items-center gap-2.5">
                                <div
                                    className={`flex size-4.5 items-center justify-center rounded-md border transition-all border-white bg-white text-black`}
                                >
                                    <Check className="size-3 stroke-3" />
                                </div>
                                <span className="font-medium text-foreground/90 transition-colors group-hover:text-white">
                                    Full-time
                                </span>
                            </div>
                            <span className="font-mono text-xs text-muted-foreground">
                                1.2k
                            </span>
                        </label>

                        {/* Contract Filter */}
                        <label
                            className="group flex cursor-pointer select-none items-center justify-between text-xs sm:text-sm"
                        >
                            <div className="flex items-center gap-2.5">
                                <div
                                    className={`flex size-4.5 items-center justify-center rounded-md border transition-all border-white/20 bg-white/5 group-hover:border-white/40`}
                                >
                                </div>
                                <span className="font-medium text-foreground/90 transition-colors group-hover:text-white">
                                    Contract
                                </span>
                            </div>
                            <span className="font-mono text-xs text-muted-foreground">
                                432
                            </span>
                        </label>

                        {/* Freelance Filter */}
                        <label
                            className="group flex cursor-pointer select-none items-center justify-between text-xs sm:text-sm"
                        >
                            <div className="flex items-center gap-2.5">
                                <div
                                    className={`flex size-4.5 items-center justify-center rounded-md border transition-all border-white/20 bg-white/5 group-hover:border-white/40`}
                                >
                                    <Check className="size-3 stroke-3" />
                                </div>
                                <span className="font-medium text-foreground/90 transition-colors group-hover:text-white">
                                    Freelance
                                </span>
                            </div>
                            <span className="font-mono text-xs text-muted-foreground">
                                156
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default JobSearchFilter;