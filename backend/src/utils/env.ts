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
export const CORS_URL1 = getEnv("CORS_URL1")
export const CORS_URL2 = getEnv("CORS_URL2")