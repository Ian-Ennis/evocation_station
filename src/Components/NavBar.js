import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav id="navbar">
            <Link to="/home">Home</Link>
            <Link to="/writings">Writings</Link>
            <Link to="/images">Images</Link>
            <Link to="/sounds">Sounds</Link>
        </nav>
    )
}

export default NavBar;