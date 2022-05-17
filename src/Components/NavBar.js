import { Link } from "react-router-dom";

function NavBar({ setImage }) {
    return (
        <nav id="navbar">
            <Link to="/home">Home</Link>
            <Link to="/writings">Writings</Link>
            <Link to="/images" setImage={setImage}>Images</Link>
            <Link to="/sounds">Sounds</Link>
        </nav>
    )
}

export default NavBar;