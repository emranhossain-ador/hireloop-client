"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    ShieldCheck,
    Briefcase,
    TrendingUp,
    Star,
    Loader2,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate auth flow
        setTimeout(() => {
            setIsLoading(false);
            setFormSuccess(true);
        }, 1200);
    };

    const handleSocialLogin = (provider: string) => {
        setSocialLoading(provider);
        setTimeout(() => {
            setSocialLoading(null);
            setFormSuccess(true);
        }, 1000);
    };

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

                            {/* Success Notification Alert */}
                            {formSuccess && (
                                <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-400">
                                    <CheckCircle2 className="size-4 shrink-0" />
                                    <span>Welcome back! Authenticating and redirecting to your dashboard...</span>
                                </div>
                            )}

                            {/* Social Login Buttons Section */}
                            <div className="mt-6 space-y-2.5">
                                {/* Google Social Button (Full Width) */}
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin("google")}
                                    disabled={isLoading || socialLoading !== null}
                                    className="group relative flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-foreground transition-all duration-200 hover:border-white/25 hover:bg-white/[0.08] hover:shadow-md active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 sm:text-sm"
                                >
                                    {socialLoading === "google" ? (
                                        <Loader2 className="size-4 animate-spin text-primary" />
                                    ) : (
                                        <FcGoogle className="size-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                                    )}
                                    <span>Continue with Google</span>
                                </button>

                                {/* GitHub & LinkedIn Buttons (Two Columns) */}
                                <div className="grid grid-cols-2 gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => handleSocialLogin("github")}
                                        disabled={isLoading || socialLoading !== null}
                                        className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs font-medium text-foreground transition-all duration-200 hover:border-white/25 hover:bg-white/[0.08] hover:shadow-md active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 sm:text-sm"
                                    >
                                        {socialLoading === "github" ? (
                                            <Loader2 className="size-4 animate-spin text-primary" />
                                        ) : (
                                            <FaGithub className="size-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                                        )}
                                        <span>GitHub</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleSocialLogin("linkedin")}
                                        disabled={isLoading || socialLoading !== null}
                                        className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-xs font-medium text-foreground transition-all duration-200 hover:border-white/25 hover:bg-white/[0.08] hover:shadow-md active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 sm:text-sm"
                                    >
                                        {socialLoading === "linkedin" ? (
                                            <Loader2 className="size-4 animate-spin text-primary" />
                                        ) : (
                                            <FaLinkedinIn className="size-4 shrink-0 text-[#0a66c2] transition-transform duration-200 group-hover:scale-110" />
                                        )}
                                        <span>LinkedIn</span>
                                    </button>
                                </div>
                            </div>

                            {/* Divider with Text */}
                            <div className="relative my-6 flex items-center justify-center">
                                <div className="w-full border-t border-border" />
                                <span className="absolute bg-sidebar px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    or continue with email
                                </span>
                            </div>

                            {/* Sign In Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Email Field */}
                                <div className="space-y-1.5">
                                    <label
                                        htmlFor="email"
                                        className="block text-xs font-medium text-foreground sm:text-sm"
                                    >
                                        Email address
                                    </label>
                                    <div className="group relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground transition-colors group-focus-within:text-primary">
                                            <Mail className="size-4" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="alex@example.com"
                                            autoComplete="email"
                                            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 hover:border-white/20 focus:border-primary focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="block text-xs font-medium text-foreground sm:text-sm"
                                        >
                                            Password
                                        </label>
                                        <Link
                                            href="#forgot-password"
                                            className="text-xs font-medium text-primary transition-colors hover:text-[#8076ff] hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="group relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground transition-colors group-focus-within:text-primary">
                                            <Lock className="size-4" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••••••"
                                            autoComplete="current-password"
                                            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-10 text-xs text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 hover:border-white/20 focus:border-primary focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="size-4" />
                                            ) : (
                                                <Eye className="size-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me Checkbox */}
                                <div className="flex items-center justify-between pt-1">
                                    <label className="flex cursor-pointer select-none items-center gap-2.5">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="size-4 rounded-sm border-white/20 bg-white/5 text-primary accent-primary transition-colors focus:ring-2 focus:ring-primary/30"
                                        />
                                        <span className="text-xs text-muted-foreground sm:text-sm">
                                            Remember me for 30 days
                                        </span>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/30 active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60 sm:text-sm"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            <span>Signing in...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Sign In</span>
                                            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                                        </>
                                    )}
                                </button>
                            </form>

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