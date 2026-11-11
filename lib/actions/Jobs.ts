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