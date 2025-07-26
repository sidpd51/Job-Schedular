import { logger } from "../config/logger.config";
import { CreateImportLogDTO } from "../dtos/dtos";
import ImportLog from "../models/importLog.model";


export const createImportLog = async (paylod: CreateImportLogDTO) => {
    try {
        await ImportLog.create(paylod);
    } catch (error) {
        logger.error("Something went wrong while creating ImportLog!");
    }
}

export const getAllImportLogs = async () => {
    try {
        const logs = await ImportLog.find({});
        return logs;
    } catch (error) {
        logger.error("Something went wrong while getting ImportLogs!");
        return error;
    }
}