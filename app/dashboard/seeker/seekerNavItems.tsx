import {
    LayoutGrid,
    Briefcase,
    Bookmark,
    FileText,
    CreditCard,
    Settings,
} from "lucide-react";

export const seekerNavItems = [
    {
        name: "Dashboard",
        href: "/dashboard/seeker",
        icon: LayoutGrid,
    },
    {
        name: "Jobs",
        href: "/browse-jobs",
        icon: Briefcase,
    },
    {
        name: "Saved Jobs",
        href: "/dashboard/seeker/saved-jobs",
        icon: Bookmark,
    },
    {
        name: "Applications",
        href: "/dashboard/seeker/applications",
        icon: FileText,
    },
    {
        name: "Billing",
        href: "/checkout",
        icon: CreditCard,
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];