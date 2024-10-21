import React, { useState } from "react";
import { unprotectedAxios } from "../utils/axiosInstances";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make login request
      const response = await unprotectedAxios.post("/auth/login", {
        email: username,
        password,
      });

      const { token } = response.data;
      // Save the token to localStorage
      localStorage.setItem("token", token);
      window.location.href = "/";
      // Redirect to the admin dashboard
    } catch (error) {
      // Handle error (e.g., invalid credentials)
      setError("Invalid username or password.");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card card">
        <div className="card-body">
          <h2 className="card-title text-center mb-3"> Login</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-group my-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group my-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 my-2">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
