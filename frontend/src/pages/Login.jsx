import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form>
        <input type="text" placeholder="Usuario" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
