"use client";

import { Search, X } from "lucide-react"
import { useState } from "react";

const JobSearchBox = () => {

    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="rounded-2xl border border-white/8 bg-[#16161a] p-2.5 shadow-xl sm:p-3">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                {/* Search Input */}
                <div className="relative flex flex-1 items-center">
                    <Search className="pointer-events-none absolute left-3.5 size-4.5 text-muted-foreground" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by job title, keywords..."
                        className="w-full rounded-xl border border-white/5 bg-[#101014] py-3 pl-11 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 sm:text-sm"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 text-muted-foreground hover:text-foreground"
                        >
                            <X className="size-4" />
                        </button>
                    )}
                </div>

                {/* Search Action Button */}
                <button
                    type="button"
                    className="flex items-center justify-center rounded-xl bg-white px-7 py-3 text-xs font-semibold text-black shadow-md transition-all duration-200 hover:bg-white/90 active:scale-[0.99] sm:text-sm"
                >
                    Search Jobs
                </button>
            </div>
        </div>
    )
}

export default JobSearchBox