import { JobType } from "@/type/JobType";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Get all jobs
export const getJobs = async (query = ''): Promise<JobType[]> => {
    const res = await fetch(`${BASE_URL}/jobs?${query}`);
    return res.json();
}

// Get single job by jobId
export const getJobById = async (jobId: string) => {
    const res = await fetch(`${BASE_URL}/job/${jobId}`);
    return res.json();
}


// Get Jobs by userId
export const getJobsByUserId = async (userId: string) => {
    const res = await fetch(`${BASE_URL}/jobs/${userId}/user`);
    return res.json();
}