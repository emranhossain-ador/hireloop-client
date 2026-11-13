import { myApplications } from "@/lib/api/JobApplications";
import { auth } from "@/lib/auth";
import { JobApplicationType } from "@/type/JobApplications";
import { headers } from "next/headers";

const ApplySummaryOverview = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;

    const myApplyInfo = await myApplications(user?.id as string);

    const myApplyJobs: JobApplicationType[] = myApplyInfo.result;


    // Calculate
    const totalApplied = myApplyJobs.length;
    const shortlisted = myApplyJobs.filter(job => job.status === "Shortlisted").length;
    const interviews = myApplyJobs.filter(job => job.status === "Interviewing").length;
    const Offered = myApplyJobs.filter(job => job.status === "Offered").length;

    const successRate = totalApplied > 0 ? Math.round((Offered / totalApplied) * 100) : 0;

    const stats = [
        { label: "Total Applied", value: totalApplied.toString(), valueClass: "text-white" },
        { label: "Shortlisted", value: shortlisted.toString(), valueClass: "text-white" },
        { label: "Interviews", value: interviews.toString(), valueClass: "text-amber-400" },
        { label: "Success Rate", value: `${successRate.toString()}%`, valueClass: "text-emerald-400" },
    ];

    return (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="rounded-2xl border border-white/8 bg-[#16161a] px-5 py-4 shadow-sm"
                >
                    <div className="text-xs font-medium text-muted-foreground">
                        {stat.label}
                    </div>
                    <div className={`mt-1.5 text-2xl font-bold sm:text-3xl ${stat.valueClass}`}>
                        {stat.value}
                    </div>
                </div>
            ))}
        </div>
    );
};


export default ApplySummaryOverview;