import { NextFunction, Request, Response } from "express";
import { getAllImportLogsService } from "../services/ImportLog.service";
import { logger } from "../config/logger.config";
import { StatusCodes } from "http-status-codes";

export const getAllImportLogsHandler = async (req: Request, res: Response, next: NextFunction) => {
    const logs = await getAllImportLogsService();
    logger.info("Got all ImportLogs successfully");
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Got all ImportLogs successfully",
        data: logs
    });
}