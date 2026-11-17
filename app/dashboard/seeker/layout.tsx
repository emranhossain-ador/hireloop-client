
import { requireRole } from "@/lib/core/server";

export default async function SeekerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await requireRole("seeker");

    return <>{children}</>;
}
