import React from "react";
import "../styles/login.scss"; // Reuse login.scss
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const { loading, handleRegister } = useAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await handleRegister({ username, email, password });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError(
        error?.message || error || "Registration failed. Please try again.",
      );
    }
  }
  return (
    <main className="login-pages">
      <div className="form-container">
        <h1>Register</h1>

        {error && (
          <div
            style={{
              color: "#ff4444",
              background: "rgba(255, 68, 68, 0.1)",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "16px",
              border: "1px solid rgba(255, 68, 68, 0.3)",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
