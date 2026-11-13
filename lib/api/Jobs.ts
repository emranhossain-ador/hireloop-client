import { JobType } from "@/type/JobType";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getJobs = async (query = ''): Promise<JobType[]> => {
    const res = await fetch(`${BASE_URL}/jobs?${query}`);
    return res.json();
}


export const getJobById = async (jobId: string) => {
    const res = await fetch(`${BASE_URL}/job/${jobId}`);
    return res.json();
}