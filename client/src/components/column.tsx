import type { CellContext, ColumnDef } from "@tanstack/react-table";
import type { IData } from "../hooks/useImportLog";

export const columns: ColumnDef<IData>[] = [
    {
        accessorKey: "fileName",
        header: "File Name",
        cell: (props: CellContext<IData, string>) => {
            const value = props.getValue();
            return <p>{value?.length > 40 ? `${value.slice(0, 40)}...` : value}</p>;
        },
    },
    {
        accessorKey: "timestamp",
        header: "Import DateTime",
        cell: (props: CellContext<IData, Date>) => {
            const date = props.getValue();
            return <p>{new Date(date).toLocaleString()}</p>;
        },
    },
    {
        accessorKey: "totalImported",
        header: "Total Imported",
        cell: (props: CellContext<IData, number>) => <p>{props.getValue()}</p>,
    },
    {
        accessorKey: "newJobs",
        header: "New Jobs",
        cell: (props: CellContext<IData, number>) => <p>{props.getValue()}</p>,
    },
    {
        accessorKey: "updatedJobs",
        header: "Updated Jobs",
        cell: (props: CellContext<IData, number>) => <p>{props.getValue()}</p>,
    },
    {
        accessorKey: "failedJobs",
        header: "Failed Jobs",
        cell: (props: CellContext<IData, number>) => <p>{props.getValue()}</p>,
    },
];