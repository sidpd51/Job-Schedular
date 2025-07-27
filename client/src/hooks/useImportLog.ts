import { useQuery } from "@tanstack/react-query";
import { fetchImportHistory } from "../lib/api";

export interface IFailedJob {
  job: unknown;
  reason: string;
}

export interface ImportLog {
  timestamp: Date;
  totalFetched: number;
  totalImported: number;
  newJobs: number;
  updatedJobs: number;
  failedJobs: IFailedJob[];
}

// using polling for this one for now it will pull refreshed data in every 60 seconds
export const useImportHistory = () => {
  return useQuery<ImportLog[]>({
    queryKey: ['importHistory'],
    queryFn: fetchImportHistory,
    refetchInterval: 60000,
  });
};
