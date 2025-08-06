import columns from "@/columns/column";
import { DataTable } from "@/components/data-table/data-table";
import { fetchImportLog } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "./ErrorPage";

function HomePage() {
  const { isPending, data, error } = useQuery({
    queryKey: ['logData'],
    queryFn: () => fetchImportLog(),
    refetchInterval: Number(import.meta.env.VITE_REFETCH_INTERVAL) || 20000
  });

  if (error) return <ErrorPage title={"Internal server error"} errorCode={500} />

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