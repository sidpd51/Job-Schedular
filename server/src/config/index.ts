import dotenv from 'dotenv';
import { XMLParser } from 'fast-xml-parser';

type ServerConfigType = {
    PORT: number;
    URL: string;
    REDIS_HOST: string;
    REDIS_PORT: number;
    REDIS_PASSWORD: string;
    MONGODB_ATLAS_URI: string;
}

function loadEnv() {
    dotenv.config();
    console.log('Environment variables loaded');
}

loadEnv();

export const serverConfig: ServerConfigType = {
    PORT: Number(process.env.PORT) || 3000,
    URL: process.env.URL || '',
    REDIS_HOST: process.env.REDIS_HOST!,
    REDIS_PORT: Number(process.env.REDIS_PORT)!,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD!,
    MONGODB_ATLAS_URI: process.env.MONGODB_ATLAS_URI!
};

export const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
});