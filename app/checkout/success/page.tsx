
import Link from "next/link";
import {
    Check,
    CheckCircle2,
    ShieldCheck,
    Sparkles,
    ArrowRight,
    BriefcaseBusiness,
    CreditCard,
    CalendarDays,
    Home,
} from "lucide-react";

interface SuccessPageProps {
    searchParams: Promise<{
        session_id?: string;
    }>;
}

export default async function PaymentSuccessPage({
    searchParams,
}: SuccessPageProps) {
    const { session_id } = await searchParams;

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">

            {/* Background Effects */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />

            <div className="relative mx-auto w-full max-w-lg">

                {/* Success Card */}
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">

                    {/* Success Header */}
                    <div className="relative border-b border-border bg-emerald-500/[0.06] px-6 py-10 text-center sm:px-10">

                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/25">
                                <Check size={34} strokeWidth={3} />
                            </div>
                        </div>

                        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
                            <CheckCircle2 size={14} />
                            Payment Successful
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Congratulations!
                        </h1>

                        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                            Your payment has been received. You're one step closer
                            to finding your dream job with Hire Loop Pro.
                        </p>
                    </div>

                    {/* Plan Details */}
                    <div className="p-6 sm:p-8">

                        <div className="mb-6 flex items-center gap-4 rounded-xl border border-primary/20 bg-primary/[0.06] p-4">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                <Sparkles size={23} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h2 className="font-bold">Job Seeker Pro</h2>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    One-time purchase · Lifetime access
                                </p>
                            </div>

                            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
                                Pro
                            </span>
                        </div>

                        {/* Payment Summary */}
                        <div className="space-y-4">

                            <h3 className="text-sm font-semibold">
                                Payment Summary
                            </h3>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Plan
                                </span>
                                <span className="font-medium">
                                    Job Seeker Pro
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Payment Type
                                </span>
                                <span className="font-medium">
                                    One-time Payment
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Payment Status
                                </span>
                                <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-500">
                                    <CheckCircle2 size={15} />
                                    Paid
                                </span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Transaction ID
                                </span>
                                <span className="max-w-[180px] truncate font-mono text-xs">
                                    {session_id || "Not available"}
                                </span>
                            </div>

                            <div className="border-t border-dashed border-border pt-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">
                                        Total Paid
                                    </span>
                                    <span className="text-2xl font-bold text-emerald-500">
                                        $9.99
                                    </span>
                                </div>
                            </div>

                        </div>

                        {/* Features */}
                        <div className="my-7 rounded-xl bg-muted/40 p-4">
                            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                                <BriefcaseBusiness size={17} className="text-primary" />
                                Your Pro Benefits
                            </h3>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {[
                                    "Unlimited job applications",
                                    "Track your applications",
                                    "Access all job listings",
                                    "Priority job tracking",
                                ].map((feature) => (
                                    <div
                                        key={feature}
                                        className="flex items-center gap-2 text-xs text-muted-foreground"
                                    >
                                        <CheckCircle2
                                            size={15}
                                            className="shrink-0 text-emerald-500"
                                        />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-3">

                            <Link
                                href="/browse-jobs"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90"
                            >
                                Explore Jobs
                                <ArrowRight size={17} />
                            </Link>

                            <Link
                                href="/dashboard"
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-muted"
                            >
                                <Home size={16} />
                                Go to Dashboard
                            </Link>

                        </div>

                        {/* Footer */}
                        <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                            <ShieldCheck size={15} className="text-emerald-500" />
                            Secure payment powered by Stripe
                        </div>

                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                    Thank you for choosing Hire Loop. Happy job hunting!
                </p>

            </div>
        </div>
    );
}
