import { IImportLog } from "../models/importLog.model";

export type CreateImportLogDTO = Omit<IImportLog, "_id" | "createdAt" | "updatedAt">;
