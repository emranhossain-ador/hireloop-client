
import {
    ChevronRight,
} from "lucide-react";
import AddJobForm from "./AddJobForm";



const AddJobPage = () => {


    return (
        <div className=" pb-16">
            {/* ============================================================
                1. BREADCRUMB + PAGE HEADER
            ============================================================ */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>Manage Jobs</span>
                        <ChevronRight className="size-3" />
                        <span>Create New Job</span>
                    </nav>

                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Post a New Job
                    </h1>
                    <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
                        Fill in the position specifications to attract qualified talent
                        across our network.
                    </p>
                </div>
            </div>

            <AddJobForm />

        </div>
    );
};

export default AddJobPage;
