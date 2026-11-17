
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const updateUserRoleById = async (id: string, data: { role: string }) => {
    const res = await fetch(`${BASE_URL}/user/${id}/role`, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })

    return res.json();

}