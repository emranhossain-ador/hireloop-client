
import Link from "next/link";
import {
    ShieldAlert,
    ArrowLeft,
    Home,
    LockKeyhole,
} from "lucide-react";

export default function UnauthorizedPage() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090b] px-4 py-12 text-white">

            {/* Background Effects */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/[0.07] blur-[120px]" />

            <div className="relative w-full max-w-lg">

                {/* Card */}
                <div className="rounded-3xl border border-white/[0.08] bg-[#111114]/90 p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-12">

                    {/* Icon */}
                    <div className="relative mx-auto mb-8 flex size-24 items-center justify-center rounded-3xl border border-red-500/20 bg-red-500/10">
                        <ShieldAlert
                            className="size-12 text-red-400"
                            strokeWidth={1.5}
                        />

                        <span className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full border-4 border-[#111114] bg-red-500">
                            <LockKeyhole className="size-3.5 text-white" />
                        </span>
                    </div>

                    {/* Error Code */}
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-400">
                        Error 403
                    </p>

                    {/* Title */}
                    <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                        Access Denied!
                    </h1>

                    {/* Description */}
                    <p className="mx-auto max-w-sm text-sm leading-7 text-zinc-400 sm:text-base">
                        Sorry, you don't have permission to access this page.
                        Please make sure you have the required account role
                        to continue.
                    </p>

                    {/* Divider */}
                    <div className="my-8 h-px bg-white/[0.07]" />

                    {/* Buttons */}
                    <div className="flex flex-col justify-center gap-3 sm:flex-row">

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
                        >
                            <Home className="size-4" />
                            Back to Home
                        </Link>

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
                        >
                            <ArrowLeft className="size-4" />
                            Go Back
                        </Link>

                    </div>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-zinc-600">
                    © {new Date().getFullYear()} HireLoop. All rights reserved.
                </p>
            </div>
        </main>
    );
}
