import { useState } from "react";
import { columns } from "../components/column";
import DataTable from "../components/DataTable";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import { useImportLog } from "../hooks/useImportLog";
import Layout from "./Layout";

const HomePage = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setPage(1);
    };
    const { data, isLoading, error } = useImportLog(page, pageSize);

    return (
        <>
            <Navbar />
            <Layout>
                {isLoading && <LoadingSpinner />}
                {error && <p className="text-red-500"> Error loading data: {error instanceof Error ? error.message : 'Unknown error'}</p>}
                {data?.data && <DataTable data={data.data} columns={columns} page={page} totalPages={data.meta.totalPages} pageSize={pageSize} onPageChange={setPage}
                    onPageSizeChange={handlePageSizeChange}
                />}
            </Layout>
        </>

    )
}

export default HomePage