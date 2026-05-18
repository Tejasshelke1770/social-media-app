import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        username,
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    console.log(res);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
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
            type="email"
            name="email"
            placeholder="Enter email"
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
          <button type="submit">Register</button>
          <p>
            already have an account ?{" "}
            <Link className="toggleAuthForm" to="/login">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
