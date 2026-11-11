import { TriangleExclamationPoint } from "lucide-react";

export const InputError = ({ message }: { message?: string }) => {
    if (!message) return null;

    return (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1.5">
            <TriangleExclamationPoint size={16} />{message}
        </p>
    );
};