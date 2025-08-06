
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import { Route, Routes } from "react-router"
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
