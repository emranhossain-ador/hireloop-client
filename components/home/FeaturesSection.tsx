"use client";

import {
    BarChart3,
    Bookmark,
    BriefcaseBusiness,
    FileText,
    Hexagon,
    MousePointer2,
    Search,
    TrendingUp,
} from "lucide-react";

const features = [
    {
        title: "Smart Search",
        description: "Find your ideal job with advanced filters.",
        icon: Search,
    },
    {
        title: "Salary Insights",
        description: "Get real salary data to negotiate confidently.",
        icon: BarChart3,
    },
    {
        title: "Top Companies",
        description: "Apply to vetted companies that are hiring.",
        icon: BriefcaseBusiness,
    },
    {
        title: "Saved Jobs",
        description: "Manage apps & favorites on your dashboard.",
        icon: Bookmark,
    },
    {
        title: "One-Click Apply",
        description: "Simplify your job applications for an easier process!",
        icon: MousePointer2,
    },
    {
        title: "Resume Builder",
        description: "Create professional resumes with modern templates.",
        icon: FileText,
    },
    {
        title: "Skill-Based Matching",
        description: "Discover jobs that match your skills and experience.",
        icon: Hexagon,
    },
    {
        title: "Career Growth Resources",
        description: "Boost your career with quick interview tips.",
        icon: TrendingUp,
    },
];

export default function FeaturesSection() {
    return (
        <section className="relative w-full overflow-hidden bg-background py-20 text-foreground transition-colors duration-300 sm:py-24 lg:py-28">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
                {/* Section Heading */}
                <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14 lg:mb-16">
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-xs bg-primary" />

                        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-xs">
                            Features Job
                        </span>

                        <span className="h-1.5 w-1.5 rounded-xs bg-primary" />
                    </div>

                    <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-4xl lg:text-[42px]">
                        Everything you need
                        <br />
                        to succeed
                    </h2>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-10">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="group flex min-w-0 gap-4"
                            >
                                {/* Icon */}
                                <div className=" relative flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-border bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border--primary/40 group-hover:shadow-[0_8px_30px_rgba(98,85,255,0.12)] sm:h-12 sm:w-12"
                                >
                                    <Icon
                                        strokeWidth={1.5}
                                        className=" h-5 w-5 text-[#d76ff4] transition-all duration-300 group-hover:scale-110 group-hover:text-primary"
                                    />

                                    {/* Small glow */}
                                    <span className="pointer-events-none absolute inset-0 rounded-md bg-primary opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-10" />
                                </div>

                                {/* Content */}
                                <div className="min-w-0 pt-0.5">
                                    <h3 className="text-[13px] font-medium leading-5 text-foreground sm:text-sm">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-1.5 max-w-47.5 text-[11px] leading-[1.55] text-muted-foreground sm:text-xs">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}