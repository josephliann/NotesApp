import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://notesapp-2kp0.onrender.com/register",
        user
      );

      if (res.data.success) {
        setIsError(false);
        setMessage("User created successfully");

        setTimeout(() => navigate("/"), 1000);
      } else {
        setIsError(true);
        setMessage(res.data.message || "Registration failed");
      }
    } catch (err) {
      setIsError(true);
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-container">
      <h2>Register</h2>

      <input
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
      />

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

      <button className="register-btn" onClick={handleSubmit}>
        {loading ? "Please wait..." : "Create Account"}
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

export default Register;
