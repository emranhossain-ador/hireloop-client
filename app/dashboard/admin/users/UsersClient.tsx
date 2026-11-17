"use client";

import { useState, useTransition } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal, UserRound, Ban, BriefcaseBusiness, ShieldCheck } from "lucide-react";
import { format } from "date-fns";
import {
    ChevronDown,
    Download,
    Search,
    Shield,
    Briefcase,
    User as UserIcon,
    Users as UsersIcon,
    Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { updateUserRoleById } from "@/lib/actions/Users";

export interface AdminUserItem {
    _id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    role?: string;
    image?: string;
}



export default function UsersClient({ initialUsers }: { initialUsers: AdminUserItem[] }) {
    const router = useRouter();
    const [, startTransition] = useTransition();

    // Use initialUsers if provided, otherwise merge or use demoFallbackUsers
    const [usersList, setUsersList] = useState<AdminUserItem[]>(initialUsers);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState<string>("All Roles");
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
    const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

    // Filtered users
    const filteredUsers = usersList.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesRole = true;
        if (selectedRole === "Seeker") {
            matchesRole = (user.role || "").toLowerCase() === "seeker";
        } else if (selectedRole === "Recruiter") {
            matchesRole = (user.role || "").toLowerCase() === "recruiter";
        } else if (selectedRole === "Admin") {
            matchesRole = (user.role || "").toLowerCase() === "admin";
        }

        return matchesSearch && matchesRole;
    });



    // Handle role toggle (Make Recruiter / Make Seeker)
    const handleToggleRole = async (userId: string, role: "seeker" | "recruiter" | "admin") => {

        const targetRole = role;

        setLoadingUserId(userId);

        try {
            await updateUserRoleById(userId, { role: targetRole });

            toast.success(`Role changed to ${targetRole}`);

            setUsersList((prev) =>
                prev.map((u) =>
                    u._id === userId ? { ...u, role: targetRole } : u
                )
            );

            startTransition(() => router.refresh());

        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoadingUserId(null);
        }
    };




    return (
        <div className="space-y-6">
            {/* ============================================================
                1. HEADER + TOP RIGHT ACTIONS
            ============================================================ */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        User Management
                    </h1>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        Review, filter, and manage platform access for all users.
                    </p>
                </div>

                <div className="flex items-center gap-2.5 self-start sm:self-auto">
                    {/* Role Filter Dropdown */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                            className="flex h-10 items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#16161a] px-3.5 text-xs font-medium text-white transition-colors hover:border-white/20 sm:text-sm"
                        >
                            <span>{selectedRole}</span>
                            <ChevronDown
                                className={`size-3.5 text-muted-foreground transition-transform duration-200 ${isRoleDropdownOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {isRoleDropdownOpen && (
                            <div className="absolute right-0 z-30 mt-1.5 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#181820] py-1 shadow-2xl backdrop-blur-md">
                                {[
                                    "All Roles",
                                    "Seeker",
                                    "Recruiter",
                                    "Admin",
                                    "Suspended",
                                ].map((role) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => {
                                            setSelectedRole(role);
                                            setIsRoleDropdownOpen(false);
                                        }}
                                        className={`flex w-full items-center px-3.5 py-2 text-left text-xs transition-colors hover:bg-white/5 ${selectedRole === role
                                            ? "font-semibold text-primary"
                                            : "text-gray-300"
                                            }`}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Export List Button */}
                    <button
                        type="button"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-white px-4 text-xs font-semibold text-black shadow-md transition-colors hover:bg-white/90 active:scale-[0.99] sm:text-sm"
                    >
                        <Download className="size-3.5" />
                        <span>Export List</span>
                    </button>
                </div>
            </div>

            {/* ============================================================
                2. FOUR STAT CARDS ROW
            ============================================================ */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
                {/* Total Active Users */}
                <div className="rounded-2xl border border-white/8 bg-[#121216] p-5 shadow-sm">
                    <span className="text-xs font-medium text-muted-foreground">
                        Total Active Users
                    </span>
                    <div className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        5
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                        <span>+12% vs last month</span>
                    </div>
                </div>

                {/* Recruiter Growth */}
                <div className="rounded-2xl border border-white/8 bg-[#121216] p-5 shadow-sm">
                    <span className="text-xs font-medium text-muted-foreground">
                        Recruiter Growth
                    </span>
                    <div className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        5
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                        <span>High demand</span>
                    </div>
                </div>

                {/* Suspended Accounts */}
                <div className="rounded-2xl border border-white/8 bg-[#121216] p-5 shadow-sm">
                    <span className="text-xs font-medium text-muted-foreground">
                        Suspended Accounts
                    </span>
                    <div className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        5
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>0.8% of total</span>
                    </div>
                </div>

                {/* New Signups (24h) */}
                <div className="rounded-2xl border border-white/8 bg-[#121216] p-5 shadow-sm">
                    <span className="text-xs font-medium text-muted-foreground">
                        New Signups (24h)
                    </span>
                    <div className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        42
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-amber-400">
                        <span>Steady activity</span>
                    </div>
                </div>
            </div>

            {/* ============================================================
                4. USERS TABLE
            ============================================================ */}
            <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#121216] shadow-xl">
                {filteredUsers.length === 0 ? (
                    <div className="flex min-h-60 flex-col items-center justify-center p-8 text-center">
                        <UsersIcon className="size-10 text-muted-foreground/60" />
                        <h3 className="mt-3 text-base font-semibold text-white">
                            No users found
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Try adjusting your search criteria or role filters.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedRole("All Roles");
                            }}
                            className="mt-4 text-xs font-medium text-primary hover:underline"
                        >
                            Reset filters
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left">
                            <thead>
                                <tr className="border-b border-white/6 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                                    <th className="px-5 py-4 font-medium sm:px-6">User Name</th>
                                    <th className="px-4 py-4 font-medium">Email Address</th>
                                    <th className="px-4 py-4 font-medium">Role</th>
                                    <th className="px-4 py-4 font-medium">Join Date</th>
                                    <th className="px-4 py-4 font-medium">Status</th>
                                    <th className="px-4 py-4 pr-5 text-right font-medium sm:pr-6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredUsers.map((user) => {
                                    const roleStr = (user.role || "seeker").toLowerCase();
                                    const isRecruiter = roleStr === "recruiter";
                                    const isAdmin = roleStr === "admin";
                                    const isBusy = loadingUserId === user._id;

                                    // Format join date
                                    let formattedDate = "Oct 12, 2023";
                                    try {
                                        if (user.createdAt) {
                                            formattedDate = format(
                                                new Date(user.createdAt),
                                                "MMM dd, yyyy"
                                            );
                                        }
                                    } catch {
                                        formattedDate = "Recently";
                                    }

                                    return (
                                        <tr
                                            key={user._id}
                                            className="transition-colors hover:bg-white/2"
                                        >
                                            {/* User Name + Avatar */}
                                            <td className="px-5 py-4 sm:px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#1e1e24] text-xs font-semibold text-gray-300">
                                                        <span>
                                                            {user.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")
                                                                .toUpperCase()
                                                                .slice(0, 2) || "U"}
                                                        </span>
                                                    </div>
                                                    <span className="font-medium text-sm text-white">
                                                        {user.name}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Email Address */}
                                            <td className="px-4 py-4 text-xs text-muted-foreground sm:text-sm">
                                                {user.email}
                                            </td>

                                            {/* Role Badge */}
                                            <td className="px-4 py-4">
                                                {isRecruiter ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                                                        <Briefcase className="size-3" />
                                                        <span>Recruiter</span>
                                                    </span>
                                                ) : isAdmin ? (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                                                        <Shield className="size-3" />
                                                        <span>Admin</span>
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300">
                                                        <UserIcon className="size-3 text-muted-foreground" />
                                                        <span>Seeker</span>
                                                    </span>
                                                )}
                                            </td>

                                            {/* Join Date */}
                                            <td className="px-4 py-4 text-xs text-muted-foreground sm:text-sm">
                                                {formattedDate}
                                            </td>

                                            {/* Status Badge */}
                                            <td className="px-4 py-4">
                                                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                                                    <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                                                    <span>Active</span>
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-4 pr-5 text-right sm:pr-6">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        type="button"
                                                        disabled={isBusy}
                                                        className="inline-flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
                                                    >
                                                        {isBusy ? (
                                                            <Loader2 className="size-4 animate-spin" />
                                                        ) : (
                                                            <MoreHorizontal className="size-4" />
                                                        )}
                                                    </DropdownMenuTrigger>

                                                    <DropdownMenuContent align="end" className="w-44">
                                                        <DropdownMenuItem
                                                            onClick={() => handleToggleRole(user._id as string, "seeker")}
                                                            disabled={isBusy || user.role === "seeker"}
                                                            className="cursor-pointer"
                                                        >
                                                            <UserRound className="mr-2 size-4" />
                                                            Make Seeker
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem
                                                            onClick={() => handleToggleRole(user._id, "recruiter")}
                                                            disabled={isBusy || user.role === "recruiter"}
                                                            className="cursor-pointer"
                                                        >
                                                            <BriefcaseBusiness className="mr-2 size-4" />
                                                            Make Recruiter
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem
                                                            onClick={() => handleToggleRole(user._id, "admin")}
                                                            disabled={isBusy || user.role === "admin"}
                                                            className="cursor-pointer"
                                                        >
                                                            <ShieldCheck className="mr-2 size-4" />
                                                            Make Admin
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
