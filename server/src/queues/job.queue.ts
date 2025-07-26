import { Queue } from "bullmq";
import { getRedisClient } from "../config/redis.config";

export const JOB_QUEUE = "job-queue";
export const jobQueue = new Queue(JOB_QUEUE, { connection: getRedisClient() });