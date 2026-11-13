const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function applyToJob(jobId: string, userId: string) {
    const res = await fetch(`${BASE_URL}/job-applications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ jobId, userId })
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to apply");
    }

    return data;
}