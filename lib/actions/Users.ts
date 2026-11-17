'use server'

import { protectedMutation } from "../core/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const updateUserRoleById = async (id: string, data: { role: string }) => {

    const api = `${BASE_URL}/user/${id}/role`;

    const res = await protectedMutation(api, "PATCH", data);

    return res.json();

}