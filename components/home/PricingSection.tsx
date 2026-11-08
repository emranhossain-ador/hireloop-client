"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    BarChart3,
    Check,
    Crown,
    Zap,
} from "lucide-react";

type BillingCycle = "monthly" | "yearly";

const plans = [
    {
        name: "Starter",
        icon: Crown,
        monthly: 0,
        yearly: 0,
        description: "Start building your insights hub:",
        features: [
            "Daily AI match brief (top 5)",
            "Verified salary bands",
            "Company insight dashboards",
            "1-click apply, unlimited",
        ],
    },
    {
        name: "Growth",
        icon: BarChart3,
        monthly: 17,
        yearly: 13,
        description: "Start building your insights hub:",
        features: [
            "Daily AI match brief (top 5)",
            "Verified salary bands",
            "Company insight dashboards",
            "1-click apply, unlimited",
        ],
        popular: true,
    },
    {
        name: "Premium",
        icon: Zap,
        monthly: 99,
        yearly: 79,
        description: "Start building your insights hub:",
        features: [
            "Everything in Pro",
            "Multi-profile career portfolios",
            "Shared talent rooms",
            "Recruiter view (read-only)",
        ],
    },
];

export default function PricingSection() {
    const [billing, setBilling] = useState<BillingCycle>("monthly");

    return (
        <section className="min-h-screen w-full  px-4 py-12 text-foreground transition-colors duration-300 ">
            <div className="mx-auto max-w-6xl">

                {/* Heading */}
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-xs bg-primary" />

                        <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                            Pricing
                        </span>

                        <span className="h-1.5 w-1.5 rounded-xs bg-primary" />
                    </div>

                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                        Pay for the leverage,
                        <br />
                        not the listings
                    </h1>
                </div>

                {/* Billing Toggle */}
                <div className="mb-8 flex justify-center">
                    <div className="flex items-center rounded-full border border-border bg-secondary p-1 shadow-sm">
                        <button
                            type="button"
                            onClick={() => setBilling("monthly")}
                            className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${billing === "monthly"
                                ? "bg-card text-foreground shadow-sm"
                                : "text-muted-foreground"
                                }`}
                        >
                            Monthly
                        </button>

                        <button
                            type="button"
                            onClick={() => setBilling("yearly")}
                            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${billing === "yearly"
                                ? "bg-card text-foreground shadow-sm"
                                : "text-muted-foreground"
                                }`}
                        >
                            Yearly

                            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">
                                25%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {plans.map((plan) => {
                        const Icon = plan.icon;

                        const price =
                            billing === "monthly" ? plan.monthly : plan.yearly;

                        return (
                            <div
                                key={plan.name}
                                className={`group relative flex min-h-95 flex-col overflow-hidden rounded-2xl border p-4 transition-all duration-300 border-border bg-card ${plan.popular
                                    ? " shadow-xl"
                                    : " shadow"
                                    } hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl`}
                            >
                                {/* subtle glow */}
                                {plan.popular && (
                                    <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary opacity-10 blur-3xl" />
                                )}

                                {/* Card Header */}
                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-secondary text-primary">
                                            <Icon className="h-4 w-4" />
                                        </div>

                                        <span className="text-sm font-medium">
                                            {plan.name}
                                        </span>
                                    </div>

                                    <div className="flex items-baseline">
                                        <span className="text-3xl font-semibold tracking-tight">
                                            ${price}
                                        </span>

                                        <span className="ml-1 text-[10px] text-muted-foreground">
                                            /month
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="relative mt-6">
                                    <p className="mb-3 text-xs font-medium">
                                        {plan.description}
                                    </p>

                                    <div className="space-y-3">
                                        {plan.features.map((feature) => (
                                            <div
                                                key={feature}
                                                className="flex items-start gap-3 text-xs text-muted-foreground"
                                            >
                                                <span className="-mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary">
                                                    <Check className="h-2.5 w-2.5 text-foreground" />
                                                </span>

                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Button */}
                                <div className="relative mt-auto pt-8">
                                    <Link
                                        href="/checkout"
                                        className={`flex h-11 w-full items-center justify-between rounded-lg px-4 text-xs font-medium transition-all cursor-pointer border ${plan.popular
                                            ? "bg-foreground text-background hover:opacity-90 border-border"
                                            : "bg-secondary text-foreground hover:bg-primary hover:text-white border-border hover:border-primary"
                                            }`}
                                    >
                                        <span>Choose This Plan</span>

                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}