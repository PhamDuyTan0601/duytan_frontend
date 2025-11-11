import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/api";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/dashboard" className="nav-link">
          🏠 Dashboard
        </Link>
        <Link to="/add-pet" className="nav-link">
          ➕ Add Pet
        </Link>
        <Link to="/devices" className="nav-link">
          📱 Devices
        </Link>
      </div>

      <div className="nav-right">
        {user.name && (
          <span className="user-greeting">👋 Hello, {user.name}</span>
        )}
        {token && (
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
