import columns from "@/columns/column";
import { ChartAreaInteractive } from "@/components/charts/chart-area-interactive";
import { ChartRadialText } from "@/components/charts/chart-radial-text";
import { DataTable } from "@/components/data-table/data-table";
import { fetchImportLog } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "./ErrorPage";
import type { ChartConfig } from "@/components/ui/chart";


const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

function HomePage() {
  const { isPending, data, error } = useQuery({
    queryKey: ['logData'],
    queryFn: () => fetchImportLog(),
    refetchInterval: Number(import.meta.env.VITE_REFETCH_INTERVAL) || 20000
  });

  if (error) return <ErrorPage title={"Internal server error"} errorCode={500} />

  return (
    <div className="my-4">
      <h1 className="mx-4 my-6 uppercase text-center text-3xl font-bold text-shadow-3xl text-neutral-800 text-shadow-black font-">job importer dashboard</h1>
      <div className="grid grid-cols-5 gap-4 mx-3">
        <ChartAreaInteractive />
        <div className="col-span-1 grid grid-cols-1 gap-4">
          <ChartRadialText chartConfig={chartConfig} />
          <ChartRadialText chartConfig={chartConfig} />
        </div>
        <DataTable columns={columns} data={isPending ? [] : data} />
      </div>
    </div>
  )
}

export default HomePage