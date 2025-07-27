import { logger } from "../config/logger.config";
import ImportLog, { IImportLog } from "../models/importLog.model";


export const createImportLog = async (paylod: Partial<IImportLog>) => {
    try {
        const log = await ImportLog.create(paylod);
        logger.info(`ImportedLog created with id: ${log._id}`)
    } catch (error) {
        logger.error("Something went wrong while creating ImportLog!");
    }
}

export const getAllImportLogs = async () => {
    const logs = await ImportLog.find({});
    return logs;
}