import React from "react";

function Header() {
  function logout() {
    localStorage.removeItem("token");

    localStorage.removeItem("userId");

    window.location.href = "/";
  }

  return (
    <div className="heading">
      <h1 className="heading-text">NotesApp</h1>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Header;

