import { MapPin, Search } from "lucide-react";

const trendingPositions = [
    "Product Designer",
    "AI Engineering",
    "Dev-ops Engineer",
];

export default function HeroSection() {


    return (
        <section className="relative isolate flex min-h-147.5 w-full items-center justify-center overflow-hidden section-container px-4 py-20 sm:min-h-162.5">

            {/* Background Stars / Particles */}
            <div
                className="pointer-events-none absolute inset-0 -z-10 opacity-40"
                style={{
                    backgroundImage: `
                        radial-gradient(circle, #6255ff 1px, transparent 1.5px),
                        radial-gradient(circle, #8b5cf6 1px, transparent 1.5px),
                        radial-gradient(circle, #4338ca 1px, transparent 1.5px)
                    `,
                    backgroundSize: "170px 120px, 230px 160px, 290px 190px",
                    backgroundPosition: "20px 20px, 90px 65px, 140px 100px",
                    maskImage:
                        "linear-gradient(to bottom, transparent 45%, black 100%)",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, transparent 45%, black 100%)",
                }}
            />

            {/* Hero Content */}
            <div className="mx-auto flex w-full max-w-250 flex-col items-center text-center">

                {/* Job Statistics Badge */}
                <div className="relative mb-9 flex items-center justify-center">

                    {/* Horizontal Lines */}
                    <div className="absolute right-full top-1/2 h-px w-16 bg-linear-to-l from-[#484848] to-transparent sm:w-20" />
                    <div className="absolute left-full top-1/2 h-px w-16 bg-linear-to-r from-[#484848] to-transparent sm:w-20" />

                    <div className="flex items-center gap-3 rounded-full border border-white/15 bg-linear-to-b from-[#222222] to-[#101010] px-5 py-2.5 shadow-[0_5px_25px_rgba(0,0,0,0.5)] sm:gap-4 sm:px-6">
                        <span className="text-xl sm:text-2xl">
                            💼
                        </span>

                        <span className="font-mono text-base font-bold tracking-wide text-white sm:text-xl">
                            50,000+
                        </span>

                        <span className="font-mono text-sm tracking-wide text-white/60 sm:text-lg">
                            NEW JOBS THIS MONTH
                        </span>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="max-w-212.5 text-4xl leading-[1.15] font-semibold tracking-[-1.5px] text-foreground sm:text-5xl md:text-6xl">
                    Find Your Dream Job Today
                </h1>

                {/* Description */}
                <p className="mt-5 max-w-185 text-base leading-7 text-foreground/70 sm:text-lg sm:leading-8">
                    HireLoop connects top talent with world-class companies.
                    Browse thousands of curated opportunities and land your
                    next role — faster.
                </p>

                {/* Search Form */}
                <form
                    className="mt-12 flex w-full max-w-195.5 flex-col gap-3 rounded-2xl border border-border bg-card p-2 sm:flex-row sm:items-center sm:gap-0 sm:rounded-[17px] sm:px-3 shadow-md"
                >
                    {/* Job Search */}
                    <div className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:px-2">
                        <Search
                            size={24}
                            strokeWidth={1.7}
                            className="shrink-0 text-foreground"
                        />

                        <input
                            type="text"
                            placeholder="Job title, skill or company"
                            className="h-11 w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-neutral-400 sm:h-11.5 sm:text-[15px]"
                        />
                    </div>

                    {/* Divider */}
                    <div className="hidden h-6 w-px bg-border sm:block" />

                    {/* Location Search */}
                    <div className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:px-6">
                        <MapPin
                            size={23}
                            strokeWidth={1.7}
                            className="shrink-0 text-foreground"
                        />

                        <input
                            type="text"
                            placeholder="Location or Remote"
                            className="h-11 w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-neutral-400 sm:h-11.5 sm:text-[15px]"
                        />
                    </div>

                    {/* Search Button */}
                    <button
                        type="submit"
                        aria-label="Search jobs"
                        className="flex h-12 w-full shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-all duration-200 hover:bg-[#5144ee] hover:shadow-[0_0_20px_rgba(98,85,255,0.35)] sm:h-12 sm:w-12 cursor-pointer"
                    >
                        <Search size={25} strokeWidth={2} />
                        <span className="ml-2 sm:hidden">
                            Search Jobs
                        </span>
                    </button>
                </form>

                {/* Trending Positions */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">

                    <span className="mr-2 text-sm text-foreground sm:text-base">
                        Trending Position
                    </span>

                    {trendingPositions.map((position) => (
                        <button
                            key={position}
                            type="button"
                            className={`rounded-full border px-3 py-1.5 text-xs transition-all duration-200 sm:px-3.5 sm:py-2 sm:text-sm border-border bg-card hover:border-primary hover:bg-accent/30 text-foreground cursor-pointer`}
                        >
                            {position}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
