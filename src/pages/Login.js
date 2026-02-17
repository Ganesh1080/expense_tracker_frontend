import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/token/", form);

      localStorage.setItem("token", res.data.access);
      navigate("/dashboard");

    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card shadow-lg">

        <h3 className="text-center mb-4 text-orange">Login</h3>

        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-3"
            placeholder="Username"
            onChange={(e)=>setForm({...form,username:e.target.value})}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />

          <button className="btn btn-orange w-100">Login</button>
        </form>

        <p className="text-center mt-3">
          New user? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
