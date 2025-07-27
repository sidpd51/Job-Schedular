import { logger } from "../config/logger.config";
import Job, { IJob } from "../models/job.model";

export const createOrUpdateJob = async (id: number, jobPayload: Partial<IJob>) => {
    try {
        const result = await Job.updateOne({ id }, {
            $set: jobPayload
        }, {
            upsert: true,
            runValidators: true
        });
        // 1- for created, 0 - updated
        return result.upsertedId ? 1 : 0;
    } catch (error) {
        logger.error('Error creating or updating job:', error);
        throw error;
    }
}
