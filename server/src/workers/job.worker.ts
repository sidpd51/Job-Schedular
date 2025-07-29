import { Job, QueueEvents, Worker } from "bullmq";
import { serverConfig } from "../config";
import { logger } from "../config/logger.config";
import { getRedisClient } from "../config/redis.config";
import { IFailedJob } from "../models/importLog.model";
import { JOB_QUEUE } from "../queues/job.queue";
import { createImportLog } from "../repositories/ImportLog.repository";
import { createOrUpdateJob } from "../repositories/job.repository";

let newJobs = 0;
let updatedJobs = 0;
let failedJobs: IFailedJob[] = [];
let totalFetched = 0;

export const startWorker = () => {
    const worker = new Worker(JOB_QUEUE, async (job: Job) => {
        totalFetched++;
        const data = job.data;
        const id = data.id;
        try {
            const result = await createOrUpdateJob(id, job.data);
            if (result)
                newJobs++;
            else
                updatedJobs++;
        } catch (error: any) {
            logger.warn(`Job ${job.id} failed on attempt ${job.attemptsMade}: ${error.message}`);
            throw error;
            failedJobs.push({
                job: data,
                reason: error.message
            });

        }
    }, { connection: getRedisClient(), concurrency: serverConfig.WORKER_CONCURRENCY });


    worker.on("failed", async (job: Job | undefined, err: Error) => {
        if (!job) {
            logger.error("Job is undefined on failed event.");
            return;
        }

        const isExhausted = job.attemptsMade === job.opts?.attempts;

        if (isExhausted) {
            logger.error(`❌ Job ${job.id} failed permanently after ${job.attemptsMade} attempts`);
            failedJobs.push({
                job: job.data,
                reason: err.message
            });
        }
    });

    // this queueevent will be used to see if the queue is drained 
    // if the queue become empty what we can do is we can reset the fields to 0 & [] respectively
    const queueEvents = new QueueEvents(JOB_QUEUE, { connection: getRedisClient() });

    queueEvents.on("drained", async () => {
        if (!totalFetched) return;

        // call api to create import_log
        await createImportLog({
            fileName: serverConfig.URL,
            timestamp: new Date(),
            totalFetched,
            newJobs,
            updatedJobs,
            failedJobs,
            totalImported: (updatedJobs + newJobs)
        });

        logger.info(`[QueueEvents] Import Log Created — Total: ${totalFetched}, New: ${newJobs}, Updated: ${updatedJobs}, Failed: ${failedJobs.length}`);

        //reset fields
        totalFetched = 0;
        newJobs = 0;
        updatedJobs = 0;
        failedJobs = [];
    })
}

