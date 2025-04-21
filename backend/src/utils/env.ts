import dotenv from 'dotenv';
dotenv.config();
const getEnv = (key: string, defaltvalue?: string): string => {
    const value = process.env[key] || defaltvalue;

    if (value === undefined) {
        throw new Error(`Missing environment variable ${key}`);
    }
    return value;
};
export const PORT = getEnv("PORT");
export const NODE_ENV = getEnv("NODE_ENV");
export const FRONTEND_URL = getEnv("FRONTEND_URL");