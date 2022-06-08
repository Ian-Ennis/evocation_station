import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav id="navbar">
            <Link to="/home">Home</Link>
                <p><b>Crafting Materials:</b></p>
            <div id="crafting_materials">
                <Link to="/writings">Writings</Link>
                <Link to="/images">Images</Link>
                <Link to="/sounds">Sounds</Link>
            </div>
        </nav>
    )
}

export default NavBar;