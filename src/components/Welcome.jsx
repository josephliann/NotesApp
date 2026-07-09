import React from "react";
import { Link } from "react-router-dom";
function Welcome() {
  return (
    <div className="welcome">
      <h2>Welcome</h2>
      <Link to="/login">
        <button className="login">Login</button>
      </Link>

      <Link to="/register">
        <button className="register">Register</button>
      </Link>
    </div>
  );
}
export default Welcome;
