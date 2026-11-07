import Link from "next/link";
import {
    MapPin,
    BriefcaseBusiness,
    ArrowRight,
    CircleDollarSign,
} from "lucide-react";


interface JobType {
    id: string | number,
    title: string,
    description: string,
    location: string,
    type: string,
    salary: string,
}

const FeatureJobsCard = ({ job }: { job: JobType }) => {
    return (
        <article className="group flex min-h-57 flex-col rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-(--primary)/50 hover:shadow-lg">

            {/* Job Title */}
            <div>
                <h3 className="text-xl font-semibold tracking-tight text-card-foreground">
                    {job.title}
                </h3>

                <p className="mt-2 max-w-77.5 text-sm leading-6 text-muted-foreground">
                    {job.description}
                </p>
            </div>

            {/* Job Information */}
            <div className="mt-5 flex flex-wrap gap-2">

                {/* Location */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1.5 text-xs font-medium text-secondary-foreground">
                    <MapPin
                        size={13}
                        className="text-primary"
                    />
                    {job.location}
                </span>

                {/* Job Type */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1.5 text-xs font-medium text-secondary-foreground">
                    <BriefcaseBusiness
                        size={13}
                        className="text-primary"
                    />
                    {job.type}
                </span>

                {/* Salary */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1.5 text-xs font-medium text-secondary-foreground">
                    <CircleDollarSign
                        size={13}
                        className="text-primary"
                    />
                    {job.salary}
                </span>
            </div>

            {/* Apply Button */}
            <div className="mt-auto pt-7">
                <Link
                    href={`/jobs/${job.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-card-foreground transition-colors hover:text-primary"
                >
                    Apply Now

                    <ArrowRight
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                </Link>
            </div>
        </article>
    );
}

export default FeatureJobsCard;