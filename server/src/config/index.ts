import dotenv from 'dotenv';
import { XMLParser } from 'fast-xml-parser';

type ServerConfigType = {
    PORT: number;
    URL: string;
}

function loadEnv() {
    dotenv.config();
    console.log('Environment variables loaded');
}

loadEnv();

export const serverConfig: ServerConfigType = {
    PORT: Number(process.env.PORT) || 3000,
    URL: process.env.URL || ''
};


export const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
});