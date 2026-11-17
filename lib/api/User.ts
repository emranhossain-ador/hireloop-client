"use server";

import { authFetch } from "../core/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getUsers = async () => {
    const api = `${BASE_URL}/users`;
    const res = await authFetch(api);
    return res.json();
}

export const getPremiumUserById = async (userId: string) => {
    const res = await fetch(`${BASE_URL}/user/${userId}/premium`);
    return res.json();
}