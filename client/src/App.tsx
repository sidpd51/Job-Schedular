
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import { Route, Routes } from "react-router"

function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
