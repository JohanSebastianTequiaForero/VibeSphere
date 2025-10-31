// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  
  const [isExpanded, setIsExpanded] = useState(false);
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  // DEBUG: descomenta si quieres ver en consola qué trae "usuario"
  // console.log("DEBUG usuario desde Navbar:", usuario);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  // Obtiene el "valor" del rol sin asumir la propiedad exacta
  const obtenerValorRol = (u) => {
    if (!u) return null;

    // posibles nombres que puede traer el backend/frontend
    const posibles = [
      "rol_id",
      "rolId",
      "roleId",
      "role",
      "rol",
      "role_name",
      "roleName",
    ];

    for (const key of posibles) {
      if (Object.prototype.hasOwnProperty.call(u, key) && u[key] !== undefined && u[key] !== null) {
        return u[key];
      }
    }

    // a veces la info está anidada (p.ej: u.data?.rol_id)
    if (u.data && typeof u.data === "object") {
      for (const key of posibles) {
        if (Object.prototype.hasOwnProperty.call(u.data, key) && u.data[key] !== undefined && u.data[key] !== null) {
          return u.data[key];
        }
      }
    }

    return null;
  };

  // Normaliza y devuelve el nombre humano del rol
  const obtenerNombreRol = (valorRol) => {
    if (!valorRol && valorRol !== 0) return "Sin rol";

    // si viene un número en string -> convertir
    const maybeNumber = Number(valorRol);
    if (!isNaN(maybeNumber)) {
      if (maybeNumber === 1) return "Artista";
      if (maybeNumber === 2) return "Contratista";
      // agregar más roles numéricos si existen
    }

    // si viene texto ya descriptivo
    const v = String(valorRol).toLowerCase();
    if (v.includes("art") || v === "artista") return "Artista";
    if (v.includes("contr") || v === "contratista" || v === "contractor") return "Contratista";
    if (v === "admin") return "Administrador";
    // fallback: capitalizar primera letra si es otro valor de texto
    return v.charAt(0).toUpperCase() + v.slice(1);
  };

  // obtener nombre y rol limpio
  const valorRol = obtenerValorRol(usuario);
  const nombreRol = obtenerNombreRol(valorRol);

  // nombre del usuario: revisar distintos campos posibles
  const obtenerNombreUsuario = (u) => {
    if (!u) return null;
    return u.nombre || u.name || u.username || u.nombre_usuario || (u.data && (u.data.nombre || u.data.name)) || null;
  };

  const nombreUsuarioMostrar = obtenerNombreUsuario(usuario) || "Invitado";

  return (
    <aside
      className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* 🔹 Header con logo */}
      <div className={`sidebar-header ${isExpanded ? "expanded" : "collapsed"}`}>
  <img
    src="../iconoo.png"
    alt="Logo VibeSphere"
    className={`sidebar-logo ${isExpanded ? "expanded" : "collapsed"}`}
  />
  {isExpanded && <h2 className="sidebar-title">VibeSphere</h2>}
</div>

      <nav className="sidebar-nav">
        <Link to="/home">🏠 {isExpanded && "Home"}</Link>
        <Link to="/explorer">🌍 {isExpanded && "Explorer"}</Link>

        {/* enlaces dinámicos por rol (usamos nombreRol para decidir) */}
        {valorRol && (String(valorRol) === "1" || String(valorRol).toLowerCase().includes("art")) && (
          <>
            <Link to="/artista">🎤 {isExpanded && "Artista"}</Link>
            <Link to="/VacantesArtistas">🎵 {isExpanded && "Vacantes"}</Link>
          </>
        )}

        {valorRol && (String(valorRol) === "2" || String(valorRol).toLowerCase().includes("contr")) && (
          <>
            <Link to="/contratista">💼 {isExpanded && "Contratista"}</Link>
            <Link to="/VacantesContratista">🧾 {isExpanded && "Gestionar Vacantes"}</Link>
          </>
        )}

        {usuario && <Link to="/contratos">📑 {isExpanded && "Contratos"}</Link>}
      </nav>

      <div className="sidebar-footer">
        {usuario ? (
          <>
            {isExpanded && (
              <div className="user-info">
                {usuario?.foto_perfil ? (
                  <img
                  src={`http://localhost:5000/uploads/${usuario.foto_perfil}`}
                  alt="Foto de perfil"
                  className="foto-perfil"
                  />
                ) : (
                  <span className="foto-placeholder">👤</span>
                )}

                <div>
                  <p>{nombreUsuarioMostrar}</p>
                  <small>({nombreRol})</small>
                </div>
              </div>
            )}
            <button onClick={handleLogout} className="logout-btn">
              🚪 {isExpanded ? "Cerrar sesión" : ""}
            </button>
          </>
        ) : (
          <>
            {isExpanded && (
              <h3 className="user-info">
                👋 ¡Bienvenido!
              </h3>
            )}
            <button onClick={handleLogin} className="login-btn">
              🔐 {isExpanded ? "Iniciar sesión" : ""}
            </button>
          </>
        )}
      </div>
    </aside>
  );
};

export default Navbar;