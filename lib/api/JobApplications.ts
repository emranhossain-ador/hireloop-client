'use server'

import { authFetch } from "../core/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Get my apllication by userId
export const myApplications = async (userId: string) => {
    const api = `${BASE_URL}/job-applications/${userId}`;
    const res = await authFetch(api);
    return res.json();
}

//my application count by user Id
export const myApplicationsCount = async (userId: string): Promise<{ count: number }> => {
    const res = await fetch(`${BASE_URL}/job-applications/count/${userId}`);
    return res.json();
}


// application by job id for recruiter
export const getApplicationsByJobId = async (jobId: string) => {
    const res = await fetch(`${BASE_URL}/recruiter/job-applications/${jobId}`);
    return res.json();
}





