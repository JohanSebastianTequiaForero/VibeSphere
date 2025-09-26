import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="iconoo.ico"  className="navbar-logo" />
      </div>
      <h1 className="navbar-logo">Proyecto</h1>
      <ul className="navbar-links">
        <button className="navbar-register">Registro</button>
        <div className="navbar-right">
        <button className="navbar-login" >Iniciar sesión</button>
      </div>
        
      </ul>
    </nav>
  );
}

export default Navbar;
