import { JobType } from "@/type/JobType";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createJob = async (data: JobType) => {
    const res = await fetch(`${BASE_URL}/add-job`, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return res.json();
}



export const deleteJob = async (jobId: string) => {
    let res: Response;

    try {
        res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
            method: "DELETE"
        });
    } catch {
        // Network-level failure (server down, wrong URL, DNS...)
        throw new Error(
            "Could not reach the job API server. Make sure it is running on port 5001."
        );
    }

    if (!res.ok) {
        throw new Error(`Failed to delete job (server responded ${res.status}).`);
    }

    return res.json();
}