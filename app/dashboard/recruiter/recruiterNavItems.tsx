import {
    LayoutGrid,
    Bookmark,
    Settings,
    BriefcaseBusiness,
    ReceiptText,
    BriefcasePlus,
} from "lucide-react";

export const recruiterNavItems = [
    {
        name: "Dashboard",
        href: "/dashboard/recruiter",
        icon: LayoutGrid,
    },
    {
        name: "Add Job",
        href: "/dashboard/recruiter/add-job",
        icon: BriefcasePlus,
    },
    {
        name: "Manage Jobs",
        href: "/dashboard/recruiter/manage-jobs",
        icon: BriefcaseBusiness,
    },
    {
        name: "Applications",
        href: "/dashboard/recruiter/applications",
        icon: Bookmark,
    },
    {
        name: "Applications",
        href: "/dashboard/seeker/applications",
        icon: ReceiptText,
    },
    {
        name: "Settings",
        href: "/dashboard/recruiter/settings",
        icon: Settings,
    },
];