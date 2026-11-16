const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const myApplications = async (userId: string) => {
    const res = await fetch(`${BASE_URL}/job-applications/${userId}`);
    return res.json();
}


export const myApplicationsCount = async (userId: string): Promise<{ count: number }> => {
    const res = await fetch(`${BASE_URL}/job-applications/count/${userId}`);
    return res.json();
}

export const getApplicationsByJobId = async (jobId: string) => {
    const res = await fetch(`${BASE_URL}/recruiter/job-applications/${jobId}`);
    return res.json();
}


// export const updateApplicationStatus = async (applicationId: string, status: string) => {
//     const res = await fetch(`${BASE_URL}/job-applications/${applicationId}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status }),
//     });
//     return res.json();
// }


