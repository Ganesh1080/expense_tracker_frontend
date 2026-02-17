import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Navbar() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  // GET USER INFO FROM BACKEND
  useEffect(() => {
    API.get("/auth/me/")   // ✅ add leading /
      .then((res) => {
        setUsername(res.data.username);
      })
      .catch(() => {
        setUsername("");
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark custom-nav px-4">

      <span className="navbar-brand fw-bold">
        💰 Expense Tracker
      </span>

      <div className="ms-auto d-flex align-items-center">

        <span className="text-white me-3 fw-semibold">
          👋 Hi, {username}
        </span>

        <button className="btn btn-light btn-sm" onClick={logout}>
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>

    </nav>
  );
}

export default Navbar;
