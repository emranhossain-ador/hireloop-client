
import { getSession } from "@/lib/core/server";
import {
    ShieldCheck,
    CreditCard,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import SeekerCheckoutContent from "./_components/seekerCheckoutContent";
import RecruiterCheckoutContent from "./_components/recruiterCheckoutContent";



export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ canceled?: string }> }) {

    const { canceled } = await searchParams;

    if (canceled) {
        console.log(
            'Order canceled -- continue to shop around and check out when you\'re ready.'
        )
    }

    // get login user
    const session = await getSession();
    const user = session?.user;
    const userRole = user?.role;

    return (
        <div className="min-h-screen bg-background px-4 py-10 sm:py-16">
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                        <Sparkles size={16} />
                        Upgrade Your Experience
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Unlock Unlimited {userRole === "seeker" ? "Jobs Applications" : "Jobs Post"}
                    </h1>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                        You have reached your free {userRole === "seeker" ? "application" : "job post"} limit.
                        Upgrade to Pro and never miss another opportunity.
                    </p>
                </div>

                {/* Pricing Card */}
                <div className="mx-auto grid max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-xl md:grid-cols-2">

                    {/* Left: Plan */}
                    {
                        userRole === "seeker" ?
                            <SeekerCheckoutContent />
                            :
                            <RecruiterCheckoutContent />
                    }


                    {/* Right: Payment Summary */}
                    <div className="flex flex-col justify-between p-6 sm:p-9">

                        <div>
                            <h3 className="text-xl font-bold">
                                Order Summary
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Review your subscription details.
                            </p>

                            <div className="my-7 rounded-xl border border-border p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="font-semibold">Job {userRole === "seeker" ? "Seeker" : "Recruiter"} Pro</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            Monthly subscription
                                        </p>
                                    </div>

                                    <span className="font-bold">{userRole === "seeker" ? "$9.99" : "$20.00"}</span>
                                </div>

                                <div className="my-4 border-t border-dashed border-border" />

                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>{userRole === "seeker" ? "$9.99" : "$20.00"}</span>
                                </div>

                                <div className="mt-3 flex justify-between text-sm text-muted-foreground">
                                    <span>Tax</span>
                                    <span>Calculated at checkout</span>
                                </div>

                                <div className="my-4 border-t border-border" />

                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">Total</span>
                                    <span className="text-2xl font-extrabold">
                                        {userRole === "seeker" ? "$9.99" : "$20.00"}
                                        <span className="text-xs font-normal text-muted-foreground">
                                            {" "}/ month
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <div className="mb-6 flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                                <ShieldCheck
                                    size={19}
                                    className="mt-0.5 shrink-0 text-emerald-500"
                                />
                                <p className="text-xs leading-5 text-muted-foreground">
                                    You will be redirected to Stripe's secure
                                    checkout page to complete your payment.
                                </p>
                            </div>
                        </div>

                        <div>
                            {/* checkout button */}
                            <form action="/api/checkout_sessions" method="POST">
                                <section>
                                    <button
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                                    >
                                        <CreditCard size={18} />
                                        Continue to Payment
                                        <ArrowRight size={18} />
                                    </button>
                                </section>
                            </form>


                            <p className="mt-4 text-center text-xs text-muted-foreground">
                                Powered by Stripe · Secure payment
                            </p>

                            <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
                                By continuing, you agree to our Terms of Service
                                and Subscription Policy.
                            </p>
                        </div>

                    </div>
                </div>

                <p className="mt-7 text-center text-sm text-muted-foreground">
                    Need help? Contact our support team.
                </p>
            </div>
        </div>
    );
}
