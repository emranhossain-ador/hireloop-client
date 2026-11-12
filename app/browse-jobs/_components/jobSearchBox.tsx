"use client";

import { Search } from "lucide-react"
import { useRouter } from "next/navigation";
import React from "react";

const JobSearchBox = () => {

    const router = useRouter();

    const handleSearch = (s: React.FormEvent<HTMLFormElement>) => {
        s.preventDefault();
        const formData = new FormData(s.currentTarget);
        const search = String(formData.get('searchField') ?? "").trim();

        const params = new URLSearchParams(window.location.search);
        params.set("search", search as string);
        router.push(`/browse-jobs?${params.toString()}`)
    }

    return (
        <div className="rounded-2xl border border-white/8 bg-[#16161a] p-2.5 shadow-xl sm:p-3">
            <form onSubmit={handleSearch} className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                {/* Search Input */}
                <div className="relative flex flex-1 items-center">
                    <Search className="pointer-events-none absolute left-3.5 size-4.5 text-muted-foreground" />
                    <input
                        type="search"
                        name="searchField"
                        placeholder="Search by job title, keywords..."
                        className="w-full rounded-xl border border-white/5 bg-[#101014] py-3 pl-11 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 sm:text-sm"
                    />
                </div>

                {/* Search Action Button */}
                <button
                    type="submit"
                    className="flex items-center justify-center rounded-xl bg-white px-7 py-3 text-xs font-semibold text-black shadow-md transition-all duration-200 hover:bg-white/90 active:scale-[0.99] sm:text-sm cursor-pointer"
                >
                    Search Jobs
                </button>
            </form>
        </div>
    )
}

export default JobSearchBox