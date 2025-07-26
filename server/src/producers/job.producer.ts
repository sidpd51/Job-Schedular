import { logger } from "../config/logger.config";
import { jobQueue } from "../queues/job.queue"

export const IMPORT_JOB = "import_job";
export const addJobToQueue = async (jobs: any[]) => {
    for (const job of jobs) {
        await jobQueue.add(IMPORT_JOB, job);
    }
    logger.info(`✅ Enqueued ${jobs.length} jobs to BullMQ`);
}