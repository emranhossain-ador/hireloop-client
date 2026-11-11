import Image from "next/image";
import {
    ArrowUpRight,
    Briefcase,
    Building,
    Calendar,
    Minus,
    User,
    UserCheck,
    Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCard {
    title: string;
    value: string;
    icon: LucideIcon;
    trend: string;
    trendDirection: "up" | "flat";
}

interface Transaction {
    id: string;
    avatar: string;
    name: string;
    company: string;
    plan: string;
    amount: string;
    date: string;
    status: "Success" | "Pending" | "Failed";
}

const stats: StatCard[] = [
    {
        title: "Total Users",
        value: "124,892",
        icon: User,
        trend: "12%",
        trendDirection: "up",
    },
    {
        title: "Total Recruiters",
        value: "12,405",
        icon: UserCheck,
        trend: "8%",
        trendDirection: "up",
    },
    {
        title: "Total Companies",
        value: "4,281",
        icon: Building,
        trend: "0%",
        trendDirection: "flat",
    },
    {
        title: "Jobs Posted",
        value: "8,920",
        icon: Briefcase,
        trend: "24%",
        trendDirection: "up",
    },
    {
        title: "Platform Revenue",
        value: "$245,800",
        icon: Wallet,
        trend: "18.5%",
        trendDirection: "up",
    },
];

const transactions: Transaction[] = [
    {
        id: "TXN-982341",
        avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        name: "marcus.k@techcorp.io",
        company: "TechCorp Inc.",
        plan: "Enterprise Monthly",
        amount: "$1,299.00",
        date: "Oct 24, 2023, 14:20",
        status: "Success",
    },
    {
        id: "TXN-882103",
        avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        name: "sarah.l@creativestudio.com",
        company: "Creative Studio",
        plan: "Professional Annual",
        amount: "$499.00",
        date: "Oct 24, 2023, 11:05",
        status: "Success",
    },
    {
        id: "TXN-774129",
        avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        name: "j.doe@freelance.org",
        company: "Independent",
        plan: "Starter Monthly",
        amount: "$49.00",
        date: "Oct 23, 2023, 16:45",
        status: "Pending",
    },
    {
        id: "TXN-552814",
        avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
        name: "admin@retailglobal.net",
        company: "Retail Global",
        plan: "Enterprise Monthly",
        amount: "$1,299.00",
        date: "Oct 23, 2023, 09:12",
        status: "Failed",
    },
];

const statusStyles: Record<Transaction["status"], string> = {
    Success: "text-emerald-400",
    Pending: "text-amber-400",
    Failed: "text-red-400",
};

const statusDotStyles: Record<Transaction["status"], string> = {
    Success: "bg-emerald-400",
    Pending: "bg-amber-400",
    Failed: "bg-red-400",
};

const AdminDashboardpage = () => {
    return (
        <div className="mx-auto max-w-7xl pb-16">
            {/* ============================================================
                1. PAGE HEADER + ACTIONS
            ============================================================ */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Dashboard Overview
                    </h1>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        Real-time platform performance and growth metrics.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#16161a] px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-white/10 sm:text-sm"
                    >
                        <Calendar className="size-4 text-gray-400" />
                        <span>Last 30 Days</span>
                    </button>
                    <button
                        type="button"
                        className="rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-black transition-all hover:bg-white/90 sm:text-sm"
                    >
                        Export Report
                    </button>
                </div>
            </div>

            {/* ============================================================
                2. STATS CARDS (5-COLUMN GRID)
            ============================================================ */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    const isUp = stat.trendDirection === "up";

                    return (
                        <div
                            key={stat.title}
                            className="rounded-2xl border border-white/[0.08] bg-[#16161a] p-5 shadow-sm transition-all duration-200 hover:border-white/15"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex size-11 items-center justify-center rounded-xl border border-white/[0.06] bg-[#1c1c22] text-white">
                                    <Icon className="size-5" />
                                </div>

                                <span
                                    className={`inline-flex items-center gap-0.5 text-xs font-semibold ${isUp
                                        ? "text-emerald-400"
                                        : "text-gray-400"
                                        }`}
                                >
                                    {isUp ? (
                                        <ArrowUpRight className="size-3.5" />
                                    ) : (
                                        <Minus className="size-3.5" />
                                    )}
                                    {isUp ? stat.trend : `~${stat.trend}`}
                                </span>
                            </div>

                            <p className="mt-4 text-xs font-medium text-muted-foreground">
                                {stat.title}
                            </p>
                            <p className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                {stat.value}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* ============================================================
                3. RECENT SUBSCRIPTION TRANSACTIONS TABLE
            ============================================================ */}
            <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#16161a] shadow-sm">
                {/* Card Header */}
                <div className="flex items-center justify-between px-5 py-5 sm:px-6">
                    <h2 className="text-base font-bold text-white sm:text-lg">
                        Recent Subscription Transactions
                    </h2>
                    <button
                        type="button"
                        className="text-xs font-medium text-gray-300 transition-colors hover:text-white sm:text-sm"
                    >
                        View All Activity
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left">
                        <thead>
                            <tr className="border-y border-white/[0.06] bg-white/[0.02] text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                <th className="px-5 py-3.5 sm:px-6">User/Recruiter</th>
                                <th className="px-4 py-3.5">Plan Type</th>
                                <th className="px-4 py-3.5">Transaction ID</th>
                                <th className="px-4 py-3.5">Amount</th>
                                <th className="px-4 py-3.5">Date</th>
                                <th className="px-4 py-3.5 sm:pr-6">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.05]">
                            {transactions.map((txn) => (
                                <tr
                                    key={txn.id}
                                    className="transition-colors hover:bg-white/[0.02]"
                                >
                                    {/* User / Recruiter */}
                                    <td className="px-5 py-4 sm:px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="relative size-9 shrink-0 overflow-hidden rounded-full border border-white/10">
                                                <Image
                                                    src={txn.avatar}
                                                    alt={txn.name}
                                                    width={36}
                                                    height={36}
                                                    unoptimized
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="truncate text-sm font-semibold text-white">
                                                    {txn.name}
                                                </div>
                                                <div className="truncate text-xs text-muted-foreground">
                                                    {txn.company}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Plan Type */}
                                    <td className="px-4 py-4">
                                        <span className="inline-flex items-center whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-gray-300">
                                            {txn.plan}
                                        </span>
                                    </td>

                                    {/* Transaction ID */}
                                    <td className="px-4 py-4 font-mono text-xs text-gray-400">
                                        #{txn.id}
                                    </td>

                                    {/* Amount */}
                                    <td className="px-4 py-4 text-sm font-semibold text-white">
                                        {txn.amount}
                                    </td>

                                    {/* Date */}
                                    <td className="whitespace-nowrap px-4 py-4 text-xs text-muted-foreground">
                                        {txn.date}
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-4 sm:pr-6">
                                        <span
                                            className={`inline-flex items-center gap-1.5 text-xs font-medium ${statusStyles[txn.status]
                                                }`}
                                        >
                                            <span
                                                className={`size-1.5 rounded-full ${statusDotStyles[txn.status]}`}
                                            />
                                            {txn.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardpage;
