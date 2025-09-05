import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUsuario, checkUsuarioOCorreo } from "../services/userService";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    nombre_usuario: "",
    password: "",
    rol_id: "",
    competencias: "",
    foto_perfil: null,
    categoria_id: "",
  });

  const [errors, setErrors] = useState({
    nombre_usuario: "",
    correo: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // 🔍 Validar nombre de usuario
    if (name === "nombre_usuario" && value.length > 2) {
      const res = await checkUsuarioOCorreo({ nombre_usuario: value });
      setErrors((prev) => ({
        ...prev,
        nombre_usuario: res.exists ? "❌ Usuario ya existe" : "",
      }));
    }

    // 🔍 Validar correo
    if (name === "correo" && value.includes("@")) {
      const res = await checkUsuarioOCorreo({ correo: value });
      setErrors((prev) => ({
        ...prev,
        correo: res.exists ? "❌ Correo ya registrado" : "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !["image/png", "image/jpeg"].includes(file.type)) {
      alert("Solo se permiten imágenes PNG o JPG");
      e.target.value = "";
      return;
    }
    setForm({ ...form, foto_perfil: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.nombre_usuario || errors.correo) {
      alert("Corrige los errores antes de continuar");
      return;
    }

    console.log("Datos enviados:", form);

    try {
      const res = await createUsuario(form);
      if (res.error) {
        alert(res.error);
        return;
      }
      alert("Usuario registrado con éxito");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>REGISTRARSE</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="apellidos"
            placeholder="Tus apellidos"
            value={form.apellidos}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="correo"
            placeholder="Tu correo"
            value={form.correo}
            onChange={handleChange}
            required
          />
          {errors.correo && <p className="error">{errors.correo}</p>}

          <input
            type="text"
            name="nombre_usuario"
            placeholder="Nombre de usuario"
            value={form.nombre_usuario}
            onChange={handleChange}
            required
          />
          {errors.nombre_usuario && (
            <p className="error">{errors.nombre_usuario}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* Select de Rol */}
          <select
            name="rol_id"
            value={form.rol_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona tu rol</option>
            <option value="1">Artista</option>
            <option value="2">Contratista</option>
          </select>

          {/* Si es ARTISTA */}
          {form.rol_id === "1" && (
            <>
              <textarea
                name="competencias"
                placeholder="Escribe tus competencias para destacar en tu perfil"
                value={form.competencias}
                onChange={handleChange}
                className="styled-textarea"
              />
              <div className="file-upload">
                <label htmlFor="foto_perfil">Subir foto de perfil</label>
                <input
                  type="file"
                  id="foto_perfil"
                  name="foto_perfil"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleFileChange}
                />
                {form.foto_perfil && (
                  <p className="file-name">{form.foto_perfil.name}</p>
                )}
              </div>
            </>
          )}

          {/* Si es CONTRATISTA */}
          {form.rol_id === "2" && (
            <select
              name="categoria_id"
              value={form.categoria_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona categoría</option>
              <option value="1">Medios y Comunicación Musical</option>
              <option value="2">Grupo Musical/Banda</option>
              <option value="3">Eventos y Espectáculos</option>
              <option value="4">Educación y Formación</option>
            </select>
          )}

          <div className="buttons">
            <button type="submit" className="registrar">
              Registrar
            </button>
            <div className="login-link">
              <a href="/login">¿Ya tienes una cuenta?</a>
            </div>
          </div>
        </form>
      </div>

      <div className="register-logo">
        <img src="/logo.png" alt="VibeSphere" />
      </div>
    </div>
  );
}

export default Register;

