
import { requireRole } from "@/lib/core/server";

export default async function RecruiterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await requireRole("recruiter");

    return <>{children}</>;
}
