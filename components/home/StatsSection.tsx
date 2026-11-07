import Image from "next/image";
import {
    BarChart3,
    Briefcase,
    Star,
    UserSearch,
} from "lucide-react";

const stats = [
    {
        value: "50K",
        label: "Active Jobs",
        icon: Briefcase,
    },
    {
        value: "12K",
        label: "Companies",
        icon: BarChart3,
    },
    {
        value: "2M",
        label: "Job Seekers",
        icon: UserSearch,
    },
    {
        value: "97%",
        label: "Satisfaction Rate",
        icon: Star,
    },
];

const globeMask = {
    WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent)",
    maskImage: "linear-gradient(to bottom, black 85%, transparent)",
};

const starField = {
    backgroundImage: `
        radial-gradient(circle, #6255ff 1px, transparent 1.5px),
        radial-gradient(circle, #8b5cf6 1px, transparent 1.5px),
        radial-gradient(circle, #4338ca 1px, transparent 1.5px)
    `,
    backgroundSize: "170px 120px, 230px 160px, 290px 190px",
    backgroundPosition: "20px 20px, 90px 65px, 140px 100px",
    WebkitMaskImage: "linear-gradient(to bottom, black 35%, transparent)",
    maskImage: "linear-gradient(to bottom, black 35%, transparent)",
};

export default function StatsSection() {
    return (
        <section className="relative isolate overflow-hidden">
            {/* Globe background */}
            <Image
                src="/images/globe.png"
                alt=""
                aria-hidden="true"
                width={1440}
                height={1882}
                sizes="(max-width: 639px) 120vw, (max-width: 2133px) 75vw, 1600px"
                style={globeMask}
                className="pointer-events-none absolute left-1/2 top-0 -z-10 w-[120%] max-w-[1600px] -translate-x-1/2 translate-y-[-34%] select-none sm:w-[75%]"
            />

            {/* Stars */}
            <div
                aria-hidden="true"
                style={starField}
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 opacity-40 sm:h-80"
            />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-32 sm:pt-[23vw] sm:pb-20">
                <h2 className="mx-auto max-w-120 text-center text-2xl leading-snug font-normal tracking-tight text-white sm:text-[26px]">
                    Assisting over 15,000 job seekers
                    <br className="hidden sm:block" /> find their dream
                    positions.
                </h2>

                {/* Stats Grid */}
                <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.label}
                                className="flex min-h-40 flex-col rounded-2xl border border-white/10 bg-[#0a0a0a] p-5 sm:p-6"
                            >
                                <Icon
                                    size={20}
                                    strokeWidth={1.75}
                                    className="text-neutral-300"
                                />

                                <div className="mt-auto pt-8">
                                    <div className="text-4xl leading-none font-medium tracking-tight text-white sm:text-5xl">
                                        {stat.value}
                                    </div>

                                    <div className="mt-2.5 text-[13px] text-neutral-400">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Fade to black at the bottom */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-linear-to-t from-black to-transparent"
            />
        </section>
    );
}
