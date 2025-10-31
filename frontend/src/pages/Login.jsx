// src/pages/Login.jsx
import "./Login.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { login } from "../services/loginService";
import { useAuth } from "../context/AuthContext"; // ✅ Contexto para persistencia

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login: loginUser, usuario } = useAuth(); // ✅ leer usuario actual también
  const [showPassword, setShowPassword] = useState(false);

  // 🚫 Si ya hay sesión activa, redirige al Explorer
  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (usuario || usuarioGuardado) {
      navigate("/Explorer");
    }
  }, [usuario, navigate]);

  // Capturar cambios en los inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar formulario al backend usando el servicio
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    setError("⚠️ Todos los campos son obligatorios");
    return;
  }

  try {
    const res = await login(form.email, form.password);

    if (!res.success) {
      setError(res.message || "❌ Error en el inicio de sesión");
      return;
    }

    let usuarioData = res.data;

    // 🔹 Si el usuario es artista (rol 1), obtener su info extra
    if (usuarioData.rol === 1) {
      try {
        const artistaRes = await fetch(`http://localhost:5000/api/artistas/${usuarioData.id}`);
        const artistaData = await artistaRes.json();

        if (artistaData.success && artistaData.data) {
          usuarioData = {
            ...usuarioData,
            foto_perfil: artistaData.data.foto_perfil,
            competencias: artistaData.data.competencias,
          };
        }
      } catch (error) {
        console.error("Error al obtener datos del artista:", error);
      }
    }

    // ✅ Guardar usuario en contexto y en localStorage
    loginUser(usuarioData);
    localStorage.setItem("usuario", JSON.stringify(usuarioData));

    setError("");
    navigate("/explorer"); // Redirige tras login

  } catch (err) {
    console.error(err);
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
      <motion.div
        className="login-box"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2>🔑 Iniciar Sesión</h2>
        <p>Accede a tu cuenta para continuar explorando VibeSphere.</p>

        {/* Mensaje de error */}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Correo</label>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="password">Contraseña</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          

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


