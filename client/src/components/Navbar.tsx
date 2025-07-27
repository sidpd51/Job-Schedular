import { AudioLines } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="navbar bg-neutral text-neutral-content flex justify-between sticky top-0 z-50">
            <Link className="btn btn-ghost text-xl" to={"#"} >
                <AudioLines />
                <span>Log Tracking Dashboard</span>
            </Link>
        </div>
    )
}

export default Navbar