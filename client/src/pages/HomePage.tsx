import columns from "@/columns/column"
import { DataTable } from "@/components/data-table/data-table-column-header"

function HomePage() {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default HomePage