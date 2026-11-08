
import Link from "next/link";
import {
    ArrowRight,
} from "lucide-react";
import FeatureJobsCard from "./FeatureJobsCard";

const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        description:
            "Showcase your commitment to diversity and inclusion by highlighting initiatives",
        location: "New York, USA",
        type: "Hybrid",
        salary: "€25–€40/hour",
    },
    {
        id: 2,
        title: "Frontend Developer",
        description:
            "Showcase your commitment to diversity and inclusion by highlighting initiatives",
        location: "New York, USA",
        type: "Hybrid",
        salary: "€25–€40/hour",
    },
    {
        id: 3,
        title: "Frontend Developer",
        description:
            "Showcase your commitment to diversity and inclusion by highlighting initiatives",
        location: "New York, USA",
        type: "Hybrid",
        salary: "€25–€40/hour",
    },
    {
        id: 4,
        title: "Frontend Developer",
        description:
            "Showcase your commitment to diversity and inclusion by highlighting initiatives",
        location: "New York, USA",
        type: "Hybrid",
        salary: "€25–€40/hour",
    },
    {
        id: 5,
        title: "Frontend Developer",
        description:
            "Showcase your commitment to diversity and inclusion by highlighting initiatives",
        location: "New York, USA",
        type: "Hybrid",
        salary: "€25–€40/hour",
    },
    {
        id: 6,
        title: "Frontend Developer",
        description:
            "Showcase your commitment to diversity and inclusion by highlighting initiatives",
        location: "New York, USA",
        type: "Hybrid",
        salary: "€25–€40/hour",
    },
];




export default function FeaturedJobs() {
    return (
        <section className="section-container my-10">

            <div className="mx-auto max-w-6xl">

                {/* Section Heading */}
                <div className="mb-10 flex flex-col items-center text-center">

                    {/* Badge */}
                    <div className="mb-4 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />

                        <span className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Smart Job Discovery
                        </span>

                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </div>

                    {/* Title */}
                    <h2 className="max-w-137.5 text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
                        The roles you&apos;d never
                        <br className="hidden sm:block" /> find by searching
                    </h2>
                </div>

                {/* Jobs Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
                    {jobs.map((job) => (
                        <FeatureJobsCard key={job.id} job={job} />
                    ))}
                </div>

                {/* View All Jobs */}
                <div className="mt-7 flex justify-center">
                    <Link
                        href="/browse-jobs"
                        className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all duration-200 hover:opacity-85"
                    >
                        View all job openings

                        <ArrowRight
                            size={15}
                            className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                    </Link>
                </div>

            </div>
        </section>
    );
}
