import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_DB_URL as string);
const db = client.db('hireloopdb');

export const auth = betterAuth({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    emailAndPassword: {
        enabled: true,
    },
    database: mongodbAdapter(db, {
        client,
    }),
    plugins: [
        admin()
    ],

    user: {
        additionalFields: {
            role: {
                type: "string",
                input: true,
                defaultValue: 'seeker'
            },
            premium: {
                type: "boolean",
                required: false,
                defaultValue: false,
            },
        },
    },


});