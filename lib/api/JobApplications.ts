const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const myApplications = async (userId: string) => {
    const res = await fetch(`${BASE_URL}/job-applications/${userId}`);
    return res.json();
}