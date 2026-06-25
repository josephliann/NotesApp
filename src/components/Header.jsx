import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="heading">
      <h1 className="heading-text">NotesApp</h1>
      <Link to="/">
        <button className="logout-btn">Logout</button>
      </Link>
    </div>
  );
}
export default Header;
