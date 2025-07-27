import DataTable from "../components/DataTable";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import { useImportLog } from "../hooks/useImportLog";
import Layout from "./Layout";

const HomePage = () => {
    const { data, isLoading, error } = useImportLog();
    return (
        <>
            <Navbar />
            <Layout>
                {isLoading && <LoadingSpinner />}
                {error && <p className="text-red-500"> Error loading data: {error instanceof Error ? error.message : 'Unknown error'}</p>}
                {data?.data && <DataTable data={data.data} />}
            </Layout>
        </>

    )
}

export default HomePage