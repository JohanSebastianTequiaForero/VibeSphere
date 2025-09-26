import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUsuario, checkUsuarioOCorreo } from "../services/userService";
import { Eye, EyeOff } from "lucide-react"; // 👁 asegúrate de tener esta librería instalada
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

  // 🔹 Validación de inputs normales
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Validar fecha de nacimiento
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

    // Validar correo
    if (name === "correo" && value.includes("@")) {
      const res = await checkUsuarioOCorreo({ correo: value });
      setErrors((prev) => ({
        ...prev,
        correo: res.exists ? "❌ Correo ya registrado" : "",
      }));
    }
  };

  // 🔹 Validación de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !["image/png", "image/jpeg"].includes(file.type)) {
      alert("Solo se permiten imágenes PNG o JPG");
      e.target.value = "";
      return;
    }
    setForm({ ...form, foto_perfil: file });
  };

  // 🔹 Enviar formulario
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
          {/* Nombre */}
          <input
            type="text"
            name="nombre"
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
          <input
            type="text"
            name="apellidos"
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
          <input
            type="date"
            name="fecha_nacimiento"
            value={form.fecha_nacimiento}
            max={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
            required
          />
          {errors.fecha_nacimiento && <p className="error">{errors.fecha_nacimiento}</p>}

          {/* Correo */}
          <input
            type="email"
            name="correo"
            placeholder="Tu correo"
            value={form.correo}
            onChange={handleChange}
            required
          />
          {errors.correo && <p className="error">{errors.correo}</p>}

          {/* Nombre de usuario */}
          <input
            type="text"
            name="nombre_usuario"
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
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
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

            {/* 👁 Botón toggle */}
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
          <select name="rol_id" value={form.rol_id} onChange={handleChange} required>
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

      <div className="register-logo">
        <img src="/logo.jpg" alt="VibeSphere" />
      </div>
    </div>
  );
}

export default Register;
