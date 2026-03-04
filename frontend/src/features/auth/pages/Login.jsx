import React, { useState } from 'react'
import "../styles/login.scss"
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

import { useNavigate } from 'react-router-dom'

const Login = () => {

  const { loading, handleLogin } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await handleLogin({ email, password }); 
      navigate("/"); // 🔥 yaha login call hoga
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="login-pages">
      <div className="form-container">
        <h1>Login Page</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter the email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter the password"
              required
            />
          </div>

          <button type="submit">
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </div>
    </main>
  )
}

export default Login