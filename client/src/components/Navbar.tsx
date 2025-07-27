import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="navbar bg-neutral text-neutral-content flex justify-between sticky top-0 z-50">
            <Link className="btn btn-ghost text-xl" to={"#"} >Dashboard</Link>
        </div>
    )
}

export default Navbar