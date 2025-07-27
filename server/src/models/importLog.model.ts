import mongoose, { Document, Model, Schema } from "mongoose";

export interface IFailedJob {
    job: any;
    reason: string;
}

export interface IImportLog extends Document {
    fileName: string;
    timestamp: Date;
    totalFetched: number;
    totalImported: number;
    newJobs: number;
    updatedJobs: number;
    failedJobs: IFailedJob[];
}

const FailedJobSchema = new Schema<IFailedJob>({
    job: { type: Schema.Types.Mixed, required: true },
    reason: { type: String, required: true }
});

const ImportLogSchema: Schema<IImportLog> = new Schema({
    fileName: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    totalFetched: { type: Number, required: true },
    totalImported: { type: Number, required: true },
    newJobs: { type: Number, required: true },
    updatedJobs: { type: Number, required: true },
    failedJobs: { type: [FailedJobSchema], default: [] }
});

const ImportLog: Model<IImportLog> = mongoose.model<IImportLog>("ImportLog", ImportLogSchema);
export default ImportLog;