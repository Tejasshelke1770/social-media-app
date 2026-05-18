import React, { useState } from "react";
import "../styles/form.scss";
import { Link } from "react-router";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:3000/api/auth/login",
      {
        username,
        password,
      },
      { withCredentials: true },
    );
    console.log(res);
    setUsername("");
    setPassword("");
  };

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            required
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button type="submit">Login</button>
          <p>
            Don't have an account ?{" "}
            <Link className="toggleAuthForm" to="/register">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
