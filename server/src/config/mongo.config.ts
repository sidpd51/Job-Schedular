import mongoose, { Mongoose } from 'mongoose';
import { logger } from './logger.config';
import { serverConfig } from '.';

let connection: Mongoose | null = null;

function connectToMongoDB() {

    return async (): Promise<Mongoose> => {
        if (connection) {
            return connection;
        }

        try {
            connection = await mongoose.connect(serverConfig.MONGODB_ATLAS_URI);
            logger.info('MongoDB connected successfully!');
            return connection;
        } catch (error) {
            logger.error('MongoDB connection failed:', (error as Error).message);
            throw error;
        }
    };
}

export const getMongoClient = connectToMongoDB();
