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

export const getAllImportLogs = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [logs, totalCount] = await Promise.all([
        ImportLog.aggregate([
            { $sort: { timestamp: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    fileName: 1,
                    timestamp: 1,
                    totalFetched: 1,
                    totalImported: 1,
                    newJobs: 1,
                    updatedJobs: 1,
                    failedJobs: { $size: { $ifNull: ["$failedJobs", []] } }
                }
            }
        ]),
        ImportLog.countDocuments()
    ]);

    return {
        data: logs,
        meta: {
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
        },
    };
}