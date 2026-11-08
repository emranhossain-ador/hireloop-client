import Link from "next/link";
import {
    Sparkles,
    ShieldCheck,
    Check,
    Star,
} from "lucide-react";
import SignupForm from "@/components/auth/SignupForm";

export default function SignUpPage() {


    return (
        <main className="relative flex min-h-[calc(100vh-80px)] w-full items-center justify-center overflow-hidden py-8 sm:py-14 lg:py-16">
            {/* Ambient Background Glows */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-32 left-1/2 h-96 w-full max-w-4xl -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-[#8076ff]/10 blur-[140px]"
            />

            {/* Background Particles Pattern */}
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

                    {/* Left Column: Platform Value & Stats (Hidden on mobile/tablet, shown on desktop) */}
                    <div className="hidden flex-col justify-center lg:col-span-6 lg:flex xl:col-span-7">
                        {/* Status Badge */}
                        <div className="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/4 px-4 py-1.5 backdrop-blur-md">
                            <Sparkles className="size-3.5 text-primary" />
                            <span className="text-xs font-medium tracking-wide text-foreground/90">
                                Join 50,000+ top engineering & product candidates
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl font-semibold leading-[1.15] tracking-tight text-foreground xl:text-5xl">
                            Fast-track your next big career leap with{" "}
                            <span className="bg-linear-to-r from-white via-foreground to-primary bg-clip-text text-transparent">
                                HireLoop.
                            </span>
                        </h1>

                        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                            Create your verified profile in 3 minutes. Let top hiring managers discover your verified skills, or post high-impact roles directly.
                        </p>

                        {/* Three Key Value Pillars */}
                        <div className="mt-8 space-y-4 max-w-lg">
                            <div className="flex items-center gap-3.5 rounded-xl border border-white/5 bg-white/2 p-3 transition-colors hover:border-white/10 hover:bg-white/4">
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                                    <Check className="size-4" />
                                </div>
                                <span className="text-xs font-medium text-foreground/90 sm:text-sm">
                                    100% verified salary transparency on every single role
                                </span>
                            </div>

                            <div className="flex items-center gap-3.5 rounded-xl border border-white/5 bg-white/2 p-3 transition-colors hover:border-white/10 hover:bg-white/4">
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                                    <Check className="size-4" />
                                </div>
                                <span className="text-xs font-medium text-foreground/90 sm:text-sm">
                                    Confidential search — hide your identity from current employers
                                </span>
                            </div>

                            <div className="flex items-center gap-3.5 rounded-xl border border-white/5 bg-white/2 p-3 transition-colors hover:border-white/10 hover:bg-white/4">
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                                    <Check className="size-4" />
                                </div>
                                <span className="text-xs font-medium text-foreground/90 sm:text-sm">
                                    Direct messages with hiring engineers, no automated recruiters
                                </span>
                            </div>
                        </div>

                        {/* Social Proof Numbers */}
                        <div className="mt-8 flex max-w-lg items-center justify-between rounded-2xl border border-white/10 bg-linear-to-b from-white/4 to-transparent p-5 backdrop-blur-md">
                            <div>
                                <div className="text-2xl font-bold tracking-tight text-foreground">50k+</div>
                                <div className="text-xs text-muted-foreground">Active Tech Roles</div>
                            </div>
                            <div className="h-8 w-px bg-border" />
                            <div>
                                <div className="text-2xl font-bold tracking-tight text-foreground">85%</div>
                                <div className="text-xs text-muted-foreground">Interview Rate</div>
                            </div>
                            <div className="h-8 w-px bg-border" />
                            <div>
                                <div className="flex items-center gap-1 text-2xl font-bold tracking-tight text-foreground">
                                    4.9
                                    <Star className="size-4 fill-amber-400 text-amber-400" />
                                </div>
                                <div className="text-xs text-muted-foreground">Candidate Rating</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sign-Up Card */}
                    <div className="w-full lg:col-span-6 xl:col-span-5">
                        <div className="relative mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-sidebar/85 p-6 shadow-2xl backdrop-blur-xl sm:p-8">

                            {/* Card Header */}
                            <div className="text-center sm:text-left">
                                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                    Create your account
                                </h2>
                                <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
                                    Join HireLoop today — start discovering your ideal match
                                </p>
                            </div>

                            {/* Sign Up Form */}
                            <SignupForm />

                            {/* Switch to Sign In */}
                            <p className="mt-5 text-center text-xs text-muted-foreground sm:text-sm">
                                Already have an account?{" "}
                                <Link
                                    href="/sign-in"
                                    className="font-medium text-primary transition-colors hover:text-[#8076ff] hover:underline"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}