import { useQuery } from "@tanstack/react-query";
import { fetchImportLog } from "../lib/api";

export interface IFailedJob {
  job: unknown;
  reason: string;
}

export interface IData {
  fileName: string;
  timestamp: Date;
  totalFetched: number;
  totalImported: number;
  newJobs: number;
  updatedJobs: number;
  failedJobs: number;
}

export interface ImportLog {
  data: IData[],
  meta: {
    totalCount: number,
    currentPage: number,
    totalPages: number
  }
}

// using polling for this one for now it will pull & refreshed data in every 60 seconds later will implement the websocket.io
export const useImportLog = () => {
  return useQuery<ImportLog>({
    queryKey: ['importHistory'],
    queryFn: fetchImportLog,
    refetchInterval: 60000,
  });
};
