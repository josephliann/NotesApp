import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleLogin() {
    try {
      const res = await axios.post("https://notesapp-2kp0.onrender.com/login", user);

      if (res.data.success) {
        setIsError(false);
        setMessage("Login successful");

        localStorage.setItem("userId", res.data.user._id); 

        setTimeout(() => navigate("/notes"), 1000);
      } else {
        setIsError(true);
        setMessage(res.data.message || "Login failed");
      }
    } catch (err) {
      setIsError(true);
      setMessage("Server error");
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>

      <input
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input
        name="password"
        type="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Password"
      />

      <button onClick={handleLogin} className="login-btn">
        Login
      </button>

      <button className="back-btn" onClick={() => navigate("/")}>
        Back
      </button>

      {message && (
        <p className={`auth-msg ${isError ? "error" : "success"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Login;
