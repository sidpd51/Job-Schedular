import { Route, Routes } from "react-router-dom"
import HomePage from "./page/HomePage"


function App() {

  return (
    <div data-theme="cyberpunk">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
