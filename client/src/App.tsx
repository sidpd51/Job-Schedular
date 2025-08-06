import { Button } from "./components/ui/button"

function App() {

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button onClick={()=>{console.log("button clicked")}}>Click me</Button>
    </div>
  )
}

export default App
