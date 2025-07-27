import cron from "node-cron";
import { fetchAndInsert } from "../services/feedToQueue.service";
import { logger } from "../config/logger.config";
import { serverConfig } from "../config";

export const startCronJobs = () => {
    cron.schedule(serverConfig.CRON_SCHEDULE, async () => {
        try {
            await fetchAndInsert();
        } catch (error) {
            logger.error('Cron job failed: ', error);
        }
    });
}