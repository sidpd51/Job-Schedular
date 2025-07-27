import { getAllImportLogs } from "../repositories/ImportLog.repository";

export const getAllImportLogsService = async () => {
    return await getAllImportLogs();
}