import columns from "@/columns/column";
import { DataTable } from "@/components/data-table/data-table-column-header";
import { fetchImportLog } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

function HomePage() {
  const { isPending, data, error } = useQuery({
    queryKey: ['logData'],
    queryFn: () => fetchImportLog(),
    refetchInterval: Number(import.meta.env.VITE_REFETCH_INTERVAL) || 20000
  });

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1 className="text-center uppercase text-4xl mt-8 mb-5 font-bold px-4 text-shadow-amber-950 text-shadow-xs text-yellow-500">job importer dashboard</h1>
      {
        <DataTable columns={columns} data={isPending ? [] : data} />
      }
    </div>
  )
}

export default HomePage