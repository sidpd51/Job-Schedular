

import { DataTableColumnHeader } from "@/components/data-table/data-table-header";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export type LogType = {
    _id: string,
    fileName: string;
    timestamp: string;
    totalFetched: number;
    totalImported: number;
    newJobs: number;
    updatedJobs: number;
    failedJobs: number;
}

const columns: ColumnDef<LogType>[] = [
    {
        accessorKey: "fileName",
        header: ({ column }) => (<DataTableColumnHeader column={column} title={"File Name"} />),
        cell: ({ row }) => {
            const result = String(row.getValue("fileName"));
            return <div className="font-medium">{result}</div>
        }
    },
    {
        accessorKey: "timestamp",
        header: ({ column }) => <DataTableColumnHeader column={column} title={"Import DateTime"} />,
        cell: ({ row }) => {
            const formattedDate = new Date(row.getValue("timestamp")).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            });
            return <div className="font-medium">{formattedDate}</div>;
        }
    },
    {
        accessorKey: "totalFetched",
        header: ({ column }) => (<DataTableColumnHeader column={column} title={"Total Fetched"} />),
    },
    {
        accessorKey: "totalImported",
        header: ({ column }) => (<DataTableColumnHeader column={column} title={"Total Imported"} />),
    },
    {
        accessorKey: "newJobs",
        header: ({ column }) => (<DataTableColumnHeader column={column} title={"New Jobs"} />),
    },
    {
        accessorKey: "updatedJobs",
        header: ({ column }) => (<DataTableColumnHeader column={column} title={"Updated Jobs"} />),
    },
    {
        accessorKey: "failedJobs",
        header: ({ column }) => (<DataTableColumnHeader column={column} title={"Failed Jobs"} />)
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const log = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(log._id)}
                        >
                            Copy Log id
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default columns;