import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table';
import type { IData } from '../hooks/useImportLog';

interface DataTableProps {
    data: IData[];
    columns: ColumnDef<IData>[];
    page: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, page, totalPages, pageSize, onPageChange, onPageSizeChange }) => {

    const { getHeaderGroups, getRowModel } = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    console.log(getRowModel());
    return (
        <div>
            <div className="overflow-x-auto overflow-y-auto max-h-[410px]" data-theme="retro">
                <table className="table table-lg">
                    <thead className=''>
                        {getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-4 py-2 text-left text-sm font-medium bg-gray-900 text-white cursor-pointer select-none"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {getRowModel().rows.map((row) => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-4 py-2 text-sm text-gray-600 border-b">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                    <span>Rows per page:</span>
                    <select
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                        className="select select-sm select-bordered"
                    >
                        {[10, 20, 50].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 1}
                        className="btn btn-sm btn-outline"
                    >
                        Previous
                    </button>
                    <span className="text-sm">
                        Page <strong>{page}</strong> of <strong>{totalPages}</strong>
                    </span>
                    <button
                        onClick={() => onPageChange(page + 1)}
                        disabled={page === totalPages}
                        className="btn btn-sm btn-outline"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
