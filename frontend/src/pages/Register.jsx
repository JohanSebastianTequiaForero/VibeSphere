import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUsuario, checkUsuarioOCorreo } from "../services/userService";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    fecha_nacimiento: "",
    nombre_usuario: "",
    password: "",
    rol_id: "",
    competencias: "",
    foto_perfil: null,
    categoria_id: "",
    descripcion: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    apellidos: "",
    nombre_usuario: "",
    correo: "",
    fecha_nacimiento: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "fecha_nacimiento") {
      const hoy = new Date();
      const nacimiento = new Date(value);
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const m = hoy.getMonth() - nacimiento.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }
      setErrors((prev) => ({
        ...prev,
        fecha_nacimiento: edad < 18 ? "❌ Debes ser mayor de 18 años" : "",
      }));
    }

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

    if (
      errors.nombre ||
      errors.apellidos ||
      errors.nombre_usuario ||
      errors.correo ||
      errors.fecha_nacimiento ||
      errors.password
    ) {
      alert("Corrige los errores antes de continuar");
      return;
    }

    try {
      const res = await createUsuario(form);

      if (!res.success) {
        alert(res.message || "❌ Error al registrar usuario");
        return;
      }

      alert("✅ Registro exitoso. Revisa tu correo para verificar tu cuenta antes de iniciar sesión.");

      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (error) {
      console.error(error);
      alert("🚨 Error en el servidor");
    }
  };

  return (
    <motion.div
      className="register-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6 }}
    >
      <div className="register-card">
        <h2>📝 Registro</h2>
        <p>Crea tu cuenta para comenzar tu viaje musical en VibeSphere.</p>
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Tu nombre"
            value={form.nombre}
            maxLength={30}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[a-zA-Z\s]*$/.test(value)) {
                setForm({ ...form, nombre: value });
                setErrors({ ...errors, nombre: "" });
              } else {
                setErrors({ ...errors, nombre: "❌ Solo se permiten letras y espacios" });
              }
            }}
            required
          />
          {errors.nombre && <p className="error">{errors.nombre}</p>}

          {/* Apellidos */}
          <label htmlFor="apellidos">Apellidos</label>
          <input
            type="text"
            name="apellidos"
            id="apellidos"
            placeholder="Tus apellidos"
            value={form.apellidos}
            maxLength={30}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[a-zA-Z\s]*$/.test(value)) {
                setForm({ ...form, apellidos: value });
                setErrors({ ...errors, apellidos: "" });
              } else {
                setErrors({ ...errors, apellidos: "❌ Solo se permiten letras y espacios" });
              }
            }}
            required
          />
          {errors.apellidos && <p className="error">{errors.apellidos}</p>}

          {/* Fecha nacimiento */}
          <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
          <input
            type="date"
            name="fecha_nacimiento"
            id="fecha_nacimiento"
            value={form.fecha_nacimiento}
            max={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
            required
          />
          {errors.fecha_nacimiento && <p className="error">{errors.fecha_nacimiento}</p>}

          {/* Correo */}
          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            name="correo"
            id="correo"
            placeholder="Tu correo"
            value={form.correo}
            onChange={handleChange}
            required
          />
          {errors.correo && <p className="error">{errors.correo}</p>}

          {/* Nombre de usuario */}
          <label htmlFor="nombre_usuario">Nombre de Usuario</label>
          <input
            type="text"
            name="nombre_usuario"
            id="nombre_usuario"
            placeholder="Nombre de usuario"
            value={form.nombre_usuario}
            maxLength={30}
            onChange={async (e) => {
              const value = e.target.value;
              if (/\s/.test(value)) {
                setErrors((prev) => ({
                  ...prev,
                  nombre_usuario: "❌ No se permiten espacios en el nombre de usuario",
                }));
              } else if (value.length > 2) {
                const res = await checkUsuarioOCorreo({ nombre_usuario: value });
                setErrors((prev) => ({
                  ...prev,
                  nombre_usuario: res.exists ? "❌ Este nombre de usuario ya está en uso" : "",
                }));
              } else {
                setErrors((prev) => ({ ...prev, nombre_usuario: "" }));
              }
              setForm({ ...form, nombre_usuario: value });
            }}
            required
          />
          {errors.nombre_usuario && <p className="error">{errors.nombre_usuario}</p>}

          {/* Contraseña */}
          <label htmlFor="password">Contraseña</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={(e) => {
                const value = e.target.value;
                setForm({ ...form, password: value });

                if (!/(?=.*[a-z])/.test(value)) {
                  setErrors((prev) => ({ ...prev, password: "❌ Debe tener al menos una minúscula" }));
                } else if (!/(?=.*[A-Z])/.test(value)) {
                  setErrors((prev) => ({ ...prev, password: "❌ Debe tener al menos una mayúscula" }));
                } else if (value.length < 8) {
                  setErrors((prev) => ({ ...prev, password: "❌ Debe tener mínimo 8 caracteres" }));
                } else {
                  setErrors((prev) => ({ ...prev, password: "" }));
                }
              }}
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
          {errors.password && <p className="error">{errors.password}</p>}

          {/* Rol */}
          <label htmlFor="rol_id">Rol</label>
          <select name="rol_id" id="rol_id" value={form.rol_id} onChange={handleChange} required>
            <option value="">Selecciona tu rol</option>
            <option value="1">Artista</option>
            <option value="2">Contratista</option>
          </select>

          {/* Si es ARTISTA */}
          {form.rol_id === "1" && (
            <>
              <label htmlFor="competencias">Competencias</label>
              <textarea
                name="competencias"
                id="competencias"
                placeholder="Escribe tus competencias para destacar en tu perfil"
                value={form.competencias}
                onChange={(e) => {
                  if (e.target.value.length <= 200) {
                    setForm({ ...form, competencias: e.target.value });
                  }
                }}
                maxLength="200"
                className="styled-textarea"
              />
              <p>{form.competencias.length}/200 caracteres</p>

              <div className="file-upload">
                <label htmlFor="foto_perfil">Subir foto de perfil</label>
                <input
                  type="file"
                  id="foto_perfil"
                  name="foto_perfil"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleFileChange}
                />
                {form.foto_perfil && <p className="file-name">{form.foto_perfil.name}</p>}
              </div>
            </>
          )}

          {/* Si es CONTRATISTA */}
          {form.rol_id === "2" && (
            <>
              <label htmlFor="categoria_id">Categoría</label>
              <select
                name="categoria_id"
                id="categoria_id"
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

              <label htmlFor="descripcion">Descripción</label>
              <textarea
                name="descripcion"
                id="descripcion"
                placeholder="Describe brevemente tu empresa (opcional)"
                value={form.descripcion || ""}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                maxLength={300}
                className="styled-textarea"
              />
              <p>{form.descripcion?.length || 0}/300 caracteres</p>

              <div className="file-upload">
                <label htmlFor="foto_perfil">Subir logo o foto de la empresa</label>
                <input
                  type="file"
                  id="foto_perfil"
                  name="foto_perfil"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleFileChange}
                />
                {form.foto_perfil && <p className="file-name">{form.foto_perfil.name}</p>}
              </div>
            </>
          )}

          {/* Botones */}
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
    </motion.div>
  );
}

export default Register;

