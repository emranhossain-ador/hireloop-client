"use client"
import { useRouter } from "next/navigation";

const EmptyContent = () => {

    const router = useRouter();
    const handleResetFilter = () => {
        router.push('/browse-jobs')
    }

    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/8 bg-[#16161a] p-12 text-center">
            <p className="text-sm font-medium text-foreground">
                No jobs found matching your filters.
            </p>
            <button
                type="button"
                onClick={handleResetFilter}
                className="mt-3 text-xs font-medium text-white hover:bg-primary/90 rounded-md cursor-pointer px-4 py-3 bg-primary"
            >
                Reset all filters
            </button>
        </div>
    )
}

export default EmptyContent;