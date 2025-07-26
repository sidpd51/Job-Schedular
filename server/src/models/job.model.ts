import mongoose, { Document, Model, Schema } from "mongoose";

export interface IJob extends Document {
    id: number;
    title: string;
    link: string;
    pubDate: Date;
    guid?: {
        '#text'?: string;
        '@_isPermaLink'?: boolean;
    };
    description?: string;
    'content:encoded'?: string;
    'media:content'?: {
        '@_url'?: string;
        '@_medium'?: string;
    };
    'job_listing:location'?: string;
    'job_listing:job_type'?: string;
    'job_listing:company'?: string;
    returnValue?: any;
    createdAt?: Date;
    updatedAt?: Date;
}

const JobSchema: Schema<IJob> = new Schema(
    {
        id: { type: Number, required: true, unique: true },
        title: { type: String, required: true },
        link: { type: String, required: true },
        pubDate: { type: Date, required: true },
        guid: {
            '#text': { type: String },
            '@_isPermaLink': { type: Boolean }
        },
        description: { type: String },
        'content:encoded': { type: String },
        'media:content': {
            '@_url': { type: String },
            '@_medium': { type: String }
        },
        'job_listing:location': { type: String },
        'job_listing:job_type': { type: String },
        'job_listing:company': { type: String },
        returnValue: { type: mongoose.Schema.Types.Mixed, default: null }
    },
    { timestamps: true }
);

const Job: Model<IJob> = mongoose.model<IJob>("Job", JobSchema);
export default Job;
