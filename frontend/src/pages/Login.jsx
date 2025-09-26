import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Capturar cambios en los inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("⚠️ Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "❌ Correo o contraseña incorrectos");
        return;
      }

      // Guardar usuario en localStorage (o Context/Redux)
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      setError("");
      navigate("/home"); // Redirige tras login
    } catch (err) {
      setError("🚨 Error en el servidor, intenta más tarde");
    }
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Caja del formulario */}
      <motion.div
        className="login-box"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2>INICIA SESIÓN</h2>

        {/* Mensaje de error */}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />

          <a href="#" className="forgot-link">
            ¿Olvidaste tu contraseña?
          </a>

          <div className="login-buttons">
            <button
              type="button"
              className="btn create"
              onClick={() => navigate("/register")}
            >
              Crear cuenta
            </button>
            <button type="submit" className="btn login">
              Iniciar sesión
            </button>
          </div>
        </form>
      </motion.div>

      {/* Imagen lateral */}
      <motion.div
        className="login-image"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img src="/login.png" alt="VibeSphere" />
      </motion.div>
    </motion.div>
  );
}

export default Login;
