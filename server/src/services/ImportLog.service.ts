import { getAllImportLogs, getAllImports } from "../repositories/ImportLog.repository";

export const getAllImportLogsService = async (page?: number, limit?: number) => {
    return await getAllImportLogs(page, limit);
}

export const getAllImportsService = async()=>{
    return await getAllImports();
}