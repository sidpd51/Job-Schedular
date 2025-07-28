import { useQuery } from "@tanstack/react-query";
import { fetchImportLog } from "../lib/api";

export type IFailedJob = {
  job: unknown;
  reason: string;
}

export type IData = {
  fileName: string;
  timestamp: Date;
  totalFetched: number;
  totalImported: number;
  newJobs: number;
  updatedJobs: number;
  failedJobs: number;
}

export type ImportLog = {
  data: IData[],
  meta: {
    totalCount: number,
    currentPage: number,
    totalPages: number
  }
}

// using polling for this one for now it will pull & refreshed data in every 60 seconds later will implement the websocket.io
export const useImportLog = (page = 1, limit = 10) => {
  return useQuery<ImportLog>({
    queryKey: ['ImportLog', page, limit],
    queryFn: () => fetchImportLog(page, limit),
    refetchInterval: 5000
  });
};
