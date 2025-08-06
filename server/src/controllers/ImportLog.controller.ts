import { NextFunction, Request, Response } from "express";
import { getAllImportLogsService, getAllImportsService } from "../services/ImportLog.service";
import { logger } from "../config/logger.config";
import { StatusCodes } from "http-status-codes";

export const getAllImportLogsHandler = async (req: Request, res: Response, next: NextFunction) => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    const logs = await getAllImportLogsService(page, limit);
    logger.info("Got all ImportLogs successfully");
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Got all ImportLogs successfully",
        data: logs
    });
}

export const getAllImportsHandler = async (req: Request, res: Response, next: NextFunction) => {
    const logs = await getAllImportsService();
    logger.info("Got all ImportLogs successfully");
    res.status(StatusCodes.OK).json({
        success: true,
        message: "Got all ImportLogs successfully",
        data: logs
    });
}