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
    User,
    Building2,
    Check,
    Star,
    Loader2,
    BriefcaseBusiness,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

type AccountRole = "seeker" | "employer";

export default function SignUpPage() {
    const [role, setRole] = useState<AccountRole>("seeker");
    const [name, setName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState(false);

    // Dynamic password strength calculation
    const getPasswordStrength = (pwd: string) => {
        if (!pwd) return { score: 0, label: "", color: "" };
        let score = 0;
        if (pwd.length >= 8) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[A-Z]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score++;

        if (score === 1) return { score: 1, label: "Weak", color: "bg-rose-500", text: "text-rose-400" };
        if (score === 2) return { score: 2, label: "Medium", color: "bg-amber-500", text: "text-amber-400" };
        return { score: 3, label: "Strong", color: "bg-emerald-500", text: "text-emerald-400" };
    };

    const pwdStrength = getPasswordStrength(password);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreedToTerms) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setFormSuccess(true);
        }, 1200);
    };

    const handleSocialSignUp = (provider: string) => {
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
                        <div className="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-md">
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
                            <div className="flex items-center gap-3.5 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-white/10 hover:bg-white/[0.04]">
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                                    <Check className="size-4" />
                                </div>
                                <span className="text-xs font-medium text-foreground/90 sm:text-sm">
                                    100% verified salary transparency on every single role
                                </span>
                            </div>

                            <div className="flex items-center gap-3.5 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-white/10 hover:bg-white/[0.04]">
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                                    <Check className="size-4" />
                                </div>
                                <span className="text-xs font-medium text-foreground/90 sm:text-sm">
                                    Confidential search — hide your identity from current employers
                                </span>
                            </div>

                            <div className="flex items-center gap-3.5 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors hover:border-white/10 hover:bg-white/[0.04]">
                                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                                    <Check className="size-4" />
                                </div>
                                <span className="text-xs font-medium text-foreground/90 sm:text-sm">
                                    Direct messages with hiring engineers, no automated recruiters
                                </span>
                            </div>
                        </div>

                        {/* Social Proof Numbers */}
                        <div className="mt-8 flex max-w-lg items-center justify-between rounded-2xl border border-white/10 bg-linear-to-b from-white/[0.04] to-transparent p-5 backdrop-blur-md">
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

                            {/* Role Switcher Tabs */}
                            <div className="mt-5 grid grid-cols-2 rounded-xl border border-white/10 bg-white/[0.03] p-1">
                                <button
                                    type="button"
                                    onClick={() => setRole("seeker")}
                                    className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium transition-all duration-200 ${
                                        role === "seeker"
                                            ? "bg-primary text-white shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    <User className="size-3.5" />
                                    <span>Job Seeker</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole("employer")}
                                    className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium transition-all duration-200 ${
                                        role === "employer"
                                            ? "bg-primary text-white shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    <Building2 className="size-3.5" />
                                    <span>Employer</span>
                                </button>
                            </div>

                            {/* Success Notification Alert */}
                            {formSuccess && (
                                <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-400">
                                    <CheckCircle2 className="size-4 shrink-0" />
                                    <span>Account created successfully! Preparing your onboarding...</span>
                                </div>
                            )}

                            {/* Social Sign Up Buttons */}
                            <div className="mt-5 space-y-2.5">
                                <button
                                    type="button"
                                    onClick={() => handleSocialSignUp("google")}
                                    disabled={isLoading || socialLoading !== null}
                                    className="group relative flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-foreground transition-all duration-200 hover:border-white/25 hover:bg-white/[0.08] hover:shadow-md active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 sm:text-sm"
                                >
                                    {socialLoading === "google" ? (
                                        <Loader2 className="size-4 animate-spin text-primary" />
                                    ) : (
                                        <FcGoogle className="size-5 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                                    )}
                                    <span>Sign up with Google</span>
                                </button>

                                <div className="grid grid-cols-2 gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => handleSocialSignUp("github")}
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
                                        onClick={() => handleSocialSignUp("linkedin")}
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
                            <div className="relative my-5 flex items-center justify-center">
                                <div className="w-full border-t border-border" />
                                <span className="absolute bg-sidebar px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    or register with email
                                </span>
                            </div>

                            {/* Sign Up Form */}
                            <form onSubmit={handleSubmit} className="space-y-3.5">
                                {/* Name Field */}
                                <div className="space-y-1">
                                    <label
                                        htmlFor="name"
                                        className="block text-xs font-medium text-foreground sm:text-sm"
                                    >
                                        {role === "seeker" ? "Full Name" : "Your Name & Title"}
                                    </label>
                                    <div className="group relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground transition-colors group-focus-within:text-primary">
                                            <User className="size-4" />
                                        </div>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder={role === "seeker" ? "Alex Morgan" : "Alex Morgan (Head of Talent)"}
                                            autoComplete="name"
                                            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 hover:border-white/20 focus:border-primary focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Employer Company Name Field (if Employer) */}
                                {role === "employer" && (
                                    <div className="space-y-1">
                                        <label
                                            htmlFor="companyName"
                                            className="block text-xs font-medium text-foreground sm:text-sm"
                                        >
                                            Company Name
                                        </label>
                                        <div className="group relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground transition-colors group-focus-within:text-primary">
                                                <BriefcaseBusiness className="size-4" />
                                            </div>
                                            <input
                                                id="companyName"
                                                name="companyName"
                                                type="text"
                                                required
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                placeholder="Acme Technologies Ltd."
                                                autoComplete="organization"
                                                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 hover:border-white/20 focus:border-primary focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Email Field */}
                                <div className="space-y-1">
                                    <label
                                        htmlFor="email"
                                        className="block text-xs font-medium text-foreground sm:text-sm"
                                    >
                                        {role === "seeker" ? "Email address" : "Work email"}
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
                                            placeholder={role === "seeker" ? "alex@example.com" : "alex@company.com"}
                                            autoComplete="email"
                                            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 hover:border-white/20 focus:border-primary focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-1">
                                    <label
                                        htmlFor="password"
                                        className="block text-xs font-medium text-foreground sm:text-sm"
                                    >
                                        Password
                                    </label>
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
                                            placeholder="Create a strong password"
                                            autoComplete="new-password"
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

                                    {/* Password Strength Indicator */}
                                    {password.length > 0 && (
                                        <div className="pt-1.5">
                                            <div className="flex items-center justify-between text-[11px]">
                                                <span className="text-muted-foreground">Strength:</span>
                                                <span className={`font-semibold ${pwdStrength.text}`}>
                                                    {pwdStrength.label}
                                                </span>
                                            </div>
                                            <div className="mt-1 flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-white/10">
                                                <div
                                                    className={`h-full transition-all duration-300 ${
                                                        pwdStrength.score >= 1 ? pwdStrength.color : "bg-transparent"
                                                    } w-1/3`}
                                                />
                                                <div
                                                    className={`h-full transition-all duration-300 ${
                                                        pwdStrength.score >= 2 ? pwdStrength.color : "bg-transparent"
                                                    } w-1/3`}
                                                />
                                                <div
                                                    className={`h-full transition-all duration-300 ${
                                                        pwdStrength.score >= 3 ? pwdStrength.color : "bg-transparent"
                                                    } w-1/3`}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Terms & Conditions Checkbox */}
                                <div className="pt-1">
                                    <label className="flex cursor-pointer items-start gap-2.5 select-none">
                                        <input
                                            type="checkbox"
                                            required
                                            checked={agreedToTerms}
                                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                                            className="mt-0.5 size-4 rounded-sm border-white/20 bg-white/5 text-primary accent-primary transition-colors focus:ring-2 focus:ring-primary/30"
                                        />
                                        <span className="text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                                            I agree to HireLoop&apos;s{" "}
                                            <Link href="#terms" className="text-primary hover:underline">
                                                Terms of Service
                                            </Link>{" "}
                                            and{" "}
                                            <Link href="#privacy" className="text-primary hover:underline">
                                                Privacy Policy
                                            </Link>
                                        </span>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading || !agreedToTerms}
                                    className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-primary/30 active:translate-y-0 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50 sm:text-sm"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            <span>Creating account...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Create Free Account</span>
                                            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                                        </>
                                    )}
                                </button>
                            </form>

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

                            {/* Trust Footnote */}
                            <div className="mt-5 flex items-center justify-center gap-2 border-t border-border pt-3.5 text-[11px] text-muted-foreground">
                                <ShieldCheck className="size-3.5 text-emerald-400" />
                                <span>No credit card required &bull; Free forever for candidates</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}