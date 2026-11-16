import { BriefcaseBusiness, Check, ShieldCheck, Zap } from "lucide-react";

const features = [
    "Unlimited job post",
    "Multiple candidates job",
    "View all candidate profile",
    "Cancel subscription anytime",
];

const RecruiterCheckoutContent = () => {
    return (
        <div className="relative overflow-hidden bg-linear-to-br from-primary/15 via-primary/5 to-transparent p-6 sm:p-9">

            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                        <Zap size={24} />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold">Job Recruiter Pro</h2>
                        <p className="text-sm text-muted-foreground">
                            For serious job recruiter
                        </p>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex items-end gap-2">
                        <span className="text-5xl font-extrabold tracking-tight">
                            $20.00
                        </span>
                        <span className="mb-1 text-muted-foreground">
                            / month
                        </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Billed monthly. Cancel anytime.
                    </p>
                </div>

                <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
                    <BriefcaseBusiness size={18} className="text-primary" />
                    What's included
                </div>

                <ul className="space-y-4">
                    {features.map((feature) => (
                        <li
                            key={feature}
                            className="flex items-center gap-3 text-sm"
                        >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                                <Check size={13} strokeWidth={3} />
                            </span>
                            {feature}
                        </li>
                    ))}
                </ul>

                <div className="mt-9 rounded-xl border border-primary/15 bg-background/60 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                        <ShieldCheck size={18} className="text-emerald-500" />
                        Secure subscription
                    </div>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Your payment is securely processed through Stripe.
                        Your card details are never stored on our server.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RecruiterCheckoutContent;