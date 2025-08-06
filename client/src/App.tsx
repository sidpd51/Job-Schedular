
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { Route, Routes } from "react-router";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="*" element={<ErrorPage title={"Something's missing."} errorCode={404} />} />
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
