import { Job, QueueEvents, Worker } from "bullmq";
import { getRedisClient } from "../config/redis.config";
import { JOB_QUEUE } from "../queues/job.queue";
import { serverConfig } from "../config";
import { createOrUpdateJob } from "../repositories/job.repository";
import { IFailedJob } from "../models/importLog.model";
import { createImportLog } from "../repositories/ImportLog.repository";

let newJobs = 0;
let updatedJobs = 0;
let failedJobs: IFailedJob[] = [];
let totalFetched = 0;

export const startWorker = () => {
    new Worker(JOB_QUEUE, async (job: Job) => {
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
            failedJobs.push({
                job: data,
                reason: error.message
            });
        }
    }, { connection: getRedisClient(), concurrency: serverConfig.WORKER_CONCURRENCY });

    // this queueevent will be used to see if the queue is drained 
    // if the queue become empty what we can do is we can reset the fields to 0 & [] respectively
    const queueEvents = new QueueEvents(JOB_QUEUE, { connection: getRedisClient() });

    queueEvents.on("drained", async () => {
        if (!totalFetched) return;

        // call api to create import_log
        await createImportLog({
            timestamp: new Date(),
            totalFetched,
            newJobs,
            updatedJobs,
            failedJobs,
            totalImported: (updatedJobs + newJobs)
        });

        totalFetched = 0;
        newJobs = 0;
        updatedJobs = 0;
        failedJobs = [];
    })
}

