"use client"

import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation";

const ApplyNowButton = ({ jobId }: { jobId: string }) => {

    const session = useSession();
    const user = session?.data?.user;

    const router = useRouter();

    const handleAppyNow = () => {
        if (!user) {
            router.push(`/sign-in?redirectTo=/browse-jobs/${jobId}`)
            return;
        } else {
            alert('logined')
        }

    }

    return (
        <button
            type="button"
            onClick={handleAppyNow}
            className="flex items-center justify-center rounded-xl bg-white px-6 py-2.5 text-xs font-semibold text-black shadow-md transition-all duration-200 hover:bg-white/90 active:scale-[0.99] sm:px-7 sm:py-3 sm:text-sm cursor-pointer"
        >
            Apply Now
        </button>
    )
}

export default ApplyNowButton