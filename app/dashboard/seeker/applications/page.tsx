
import { Download } from "lucide-react";
import ApplySummaryOverview from "./_components/applySummaryOverview";
import ApplicationsTable from "./_components/applicationsTable";


const MyApplicationsPage = () => {


    return (
        <div className="mx-auto max-w-7xl pb-16">

            {/* ============================================================
                1. PAGE HEADER (Title + Active/Archived + Export PDF)
            ============================================================ */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        My Applications
                    </h1>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        Track your job applications and interview progress in real-time.
                    </p>
                </div>

                <div>

                    {/* Export PDF Button */}
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black shadow-md transition-all hover:bg-white/90 active:scale-[0.99]"
                    >
                        <Download className="size-3.5" />
                        <span>Export PDF</span>
                    </button>
                </div>
            </div>

            {/* ======= SUMMARY STAT CARDS  ============== */}
            <ApplySummaryOverview />

            {/* =======  APPLICATIONS TABLE ====== */}
            <ApplicationsTable />

        </div>
    );
};

export default MyApplicationsPage;