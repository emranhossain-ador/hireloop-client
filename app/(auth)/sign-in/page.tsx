
import Link from "next/link";
import {
    Sparkles,
    ShieldCheck,
    Briefcase,
    TrendingUp,
    Star,
} from "lucide-react";
import SigninForm from "@/components/auth/SigninForm";

export default function SignInPage() {

    return (
        <main className="relative flex min-h-[calc(100vh-80px)] w-full items-center justify-center overflow-hidden py-8 sm:py-14 lg:py-16">
            {/* Ambient Background Glows */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-32 left-1/2 h-96 w-full max-w-4xl -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#8076ff]/10 blur-[140px]"
            />

            {/* Subtle Star/Grid pattern */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-30"
                style={{
                    backgroundImage: `
                        radial-gradient(circle, #6255ff 1px, transparent 1.5px),
                        radial-gradient(circle, #8b5cf6 1px, transparent 1.5px)
                    `,
                    backgroundSize: "220px 160px, 280px 200px",
                    backgroundPosition: "30px 25px, 120px 80px",
                    maskImage: "linear-gradient(to bottom, black 30%, transparent 95%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 95%)",
                }}
            />

            <div className="section-container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">

                    {/* Left Column: Visual Showcase & Social Proof (Hidden on mobile/tablet, shown on desktop) */}
                    <div className="hidden flex-col justify-center lg:col-span-6 lg:flex xl:col-span-7">
                        {/* Live Status Badge */}
                        <div className="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                            </span>
                            <span className="text-xs font-medium tracking-wide text-foreground/90">
                                1,420+ new tech jobs posted today
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl font-semibold leading-[1.15] tracking-tight text-foreground xl:text-5xl">
                            Welcome back to your <br />
                            <span className="bg-linear-to-r from-white via-foreground to-primary bg-clip-text text-transparent">
                                personalized career loop.
                            </span>
                        </h1>

                        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                            Access your curated matches, salary benchmark data, and private recruiter conversations in one unified hub.
                        </p>

                        {/* Feature Points */}
                        <div className="mt-8 grid max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition-colors hover:border-white/10 hover:bg-white/[0.04]">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Sparkles className="size-4.5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-foreground">AI Career Radar</h4>
                                    <p className="mt-0.5 text-xs text-muted-foreground">Matches that fit your exact stack and salary goals.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition-colors hover:border-white/10 hover:bg-white/[0.04]">
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Briefcase className="size-4.5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-foreground">Direct Access</h4>
                                    <p className="mt-0.5 text-xs text-muted-foreground">Skip blackhole ATS queues directly to team leads.</p>
                                </div>
                            </div>
                        </div>

                        {/* Candidate Testimonial Card */}
                        <div className="mt-8 max-w-lg rounded-2xl border border-white/10 bg-linear-to-b from-white/[0.05] to-white/[0.01] p-5 shadow-lg backdrop-blur-md">
                            <div className="flex items-center gap-1 text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="size-3.5 fill-current" />
                                ))}
                                <span className="ml-2 text-xs font-semibold text-foreground">5.0 / 5</span>
                            </div>
                            <p className="mt-3 text-xs leading-relaxed text-foreground/85">
                                &ldquo;HireLoop completely changed my job search. Within 48 hours of updating my profile, I had three interviews lined up with top European scale-ups.&rdquo;
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="flex size-8 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-600 font-mono text-xs font-bold text-white">
                                    SC
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-foreground">Sarah Chen</div>
                                    <div className="text-[11px] text-muted-foreground">Senior Systems Engineer &bull; Formerly at Monzo</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sign-In Card */}
                    <div className="w-full lg:col-span-6 xl:col-span-5">
                        <div className="relative mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-sidebar/85 p-6 shadow-2xl backdrop-blur-xl sm:p-8">

                            {/* Card Header */}
                            <div className="text-center sm:text-left">
                                <div className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                    <TrendingUp className="size-3.5" />
                                    <span>Sign in to continue</span>
                                </div>
                                <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                    Welcome back
                                </h2>
                                <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
                                    Enter your details below to access your HireLoop account
                                </p>
                            </div>

                            <SigninForm />

                            {/* Switch to Sign Up */}
                            <p className="mt-6 text-center text-xs text-muted-foreground sm:text-sm">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/sign-up"
                                    className="font-medium text-primary transition-colors hover:text-[#8076ff] hover:underline"
                                >
                                    Create a free account
                                </Link>
                            </p>

                            {/* Trust Badge */}
                            <div className="mt-6 flex items-center justify-center gap-2 border-t border-border pt-4 text-[11px] text-muted-foreground">
                                <ShieldCheck className="size-3.5 text-emerald-400" />
                                <span>Enterprise-grade 256-bit encryption</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}