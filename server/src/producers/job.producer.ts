import { logger } from "../config/logger.config";
import { IJob } from "../models/job.model";
import { JOB_QUEUE, jobQueue } from "../queues/job.queue"

export const IMPORT_JOB = "import_job";
export const addJobToQueue = async (jobs: IJob[], batchSize = 1000) => {
    for (let i = 0; i < jobs.length; i += batchSize) {
        const batch = jobs.slice(i, i + batchSize).map(job => ({ name: JOB_QUEUE, data: job }));
        await jobQueue.addBulk(batch);
        logger.info(`Enqueued batch ${(i / batchSize) + 1} with ${batch.length} jobs`);
    }
    logger.info(`Total ${jobs.length} jobs enqueued in batches`);
}