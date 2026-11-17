'use server'
import { protectedMutation } from "../core/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function applyToJob(jobId: string, userId: string) {
    const api = `${BASE_URL}/job-applications`;
    const res = await protectedMutation(api, "POST", { jobId, userId });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to apply");
    }

    return data;
}


export const changeJobApplicationStatus = async (Id: string, data: { status: string }) => {
    const res = await fetch(`${BASE_URL}/job-applications/${Id}/status-change`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });


    return res.json();
}