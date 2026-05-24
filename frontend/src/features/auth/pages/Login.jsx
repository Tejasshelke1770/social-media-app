import React, { useState } from "react";
import "../styles/form.scss";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth.jsx";
import { RotatingLines } from "react-loader-spinner";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
    navigate("/");
    setEmail("");
    setPassword("");
  };

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            required
            type="text"
            name="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button type="submit">
            {loading ? (
              <RotatingLines height="20" width="20" color="grey" />
            ) : (
              "Login"
            )}
          </button>
          <p>
            Don't have an account ?{" "}
            <Link className="toggleAuthForm" to="/register">
              Register here.
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
