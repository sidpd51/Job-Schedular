import mongoose, { Document, Schema, Model } from "mongoose";
import { IJob } from "./job.model"; // adjust the path as needed

interface IFailedJob {
    job: IJob;  // Reference to the IJob interface
    reason: string;
}

export interface IImportLog extends Document {
    timestamp: Date;
    totalFetched: number;
    totalImported: number;
    newJobs: number;
    updatedJobs: number;
    failedJobs: IFailedJob[];
}

const FailedJobSchema = new Schema<IFailedJob>({
    job: { type: Schema.Types.Mixed, required: true }, // still stored as raw object in DB
    reason: { type: String, required: true }
});

const ImportLogSchema: Schema<IImportLog> = new Schema({
    timestamp: { type: Date, default: Date.now },
    totalFetched: { type: Number, required: true },
    totalImported: { type: Number, required: true },
    newJobs: { type: Number, required: true },
    updatedJobs: { type: Number, required: true },
    failedJobs: { type: [FailedJobSchema], default: [] }
});

const ImportLog: Model<IImportLog> = mongoose.model<IImportLog>("ImportLog", ImportLogSchema);
export default ImportLog;