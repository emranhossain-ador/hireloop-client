import {
    LayoutGrid,
    Bookmark,
    Settings,
    Users,
} from "lucide-react";

export const adminNavItems = [
    {
        name: "Dashboard",
        href: "/dashboard/admin",
        icon: LayoutGrid,
    },
    {
        name: "Users",
        href: "/dashboard/admin/users",
        icon: Users,
    },
    {
        name: "Jobs",
        href: "/dashboard/admin/jobs",
        icon: Bookmark,
    },
    {
        name: "Settings",
        href: "/dashboard/admin/settings",
        icon: Settings,
    },
];