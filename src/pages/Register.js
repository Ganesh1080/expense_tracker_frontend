import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";   // 👈 use API

function Register() {
  const [form, setForm] = useState({
    username: "", email: "", password: ""
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    await API.post("/api/auth/register/", form); // 👈 NO localhost
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="card auth-card p-4 shadow">
        <h3 className="text-center mb-3">Register</h3>

        <form onSubmit={handleRegister}>
          <input className="form-control mb-3" placeholder="Username"
            onChange={(e)=>setForm({...form,username:e.target.value})}
          />
          <input className="form-control mb-3" placeholder="Email"
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />
          <input type="password" className="form-control mb-3" placeholder="Password"
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />
          <button className="btn btn-orange w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
