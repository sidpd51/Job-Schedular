import { serverConfig } from "../config"
import { logger } from "../config/logger.config";
import { addJobToQueue } from "../producers/job.producer";
import { fetchJobsFromXML } from "./fetchJobs.service"

export const fetchAndInsert = async () => {
    const jobs = await fetchJobsFromXML(serverConfig.URL);
    if (jobs.length > 0) {
        await addJobToQueue(jobs);
    }
    logger.info("Fetched and enqueued jobs");
}