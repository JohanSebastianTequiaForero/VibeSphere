// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Cargar usuario desde localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <aside
      className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* 🔹 Header con logo */}
      <div className="sidebar-header">
        {isExpanded ? (
          <h2>🎶 VibeSphere</h2>
        ) : (
          <h2>🎶</h2>
        )}
      </div>

      {/* 🔹 Links principales */}
      <nav className="sidebar-nav">
        <Link to="/home">🏠 {isExpanded && "Home"}</Link>
        <Link to="/explorer">🌍 {isExpanded && "Explorer"}</Link>

        {user?.role === "artista" && (
          <Link to="/artista">🎤 {isExpanded && "Artist"}</Link>
        )}
        {user?.role === "contratista" && (
          <Link to="/contratista">💼 {isExpanded && "Contractor"}</Link>
        )}

        <Link to="/contratos">📑 {isExpanded && "Contracts"}</Link>
      </nav>

      {/* 🔹 Footer con info usuario */}
      <div className="sidebar-footer">
        {isExpanded ? (
          <>
            <p className="user-info">
              👤 {user?.name || ""}
              <br />
              <small>({user?.role || "sin rol"})</small>
            </p>
            <button onClick={handleLogout} className="logout-btn">
              🚪 Cerrar sesión
            </button>
          </>
        ) : (
          <span
            title="Cerrar sesión"
            onClick={handleLogout}
            className="logout-icon"
          >
            🚪
          </span>
        )}
      </div>
    </aside>
  );
};

export default Navbar;
