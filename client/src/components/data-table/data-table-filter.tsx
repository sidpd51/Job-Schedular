import type { Table } from '@tanstack/react-table'
import { Input } from '../ui/input'

export function DataTableFilter<TData>({ table }: { table: Table<TData> }) {
    return (
        <Input
            placeholder="Filter File Name..."
            value={(table.getColumn("fileName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("fileName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
        />
    )
}