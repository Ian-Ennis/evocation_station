import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div id="menu_column">
      <nav id="navbar">
        <Link to="/home">Home</Link>
        <p>
          <b>Crafting Materials:</b>
        </p>
        <div id="crafting_materials">
          <Link to="/writings">Writings</Link>
          <Link to="/images">Images</Link>
          <Link to="/sounds">Sounds</Link>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
