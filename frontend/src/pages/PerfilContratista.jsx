import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./PerfilContratista.css";

function PerfilContratista() {
  const { usuario, login, logout } = useAuth();
  const navigate = useNavigate();

  const [descripcion, setDescripcion] = useState(usuario?.descripcion || "");
  const [fotoPreview, setFotoPreview] = useState(
    usuario?.foto_perfil
      ? `http://localhost:5000/uploads/${usuario.foto_perfil}`
      : "/default-avatar.png"
  );
  const [fotoFile, setFotoFile] = useState(null);
  const [editado, setEditado] = useState(false);

  useEffect(() => {
    if (usuario?.foto_perfil) {
      setFotoPreview(`http://localhost:5000/uploads/${usuario.foto_perfil}`);
    }
  }, [usuario]);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFotoFile(file);
    setFotoPreview(URL.createObjectURL(file));
    setEditado(true);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
    setEditado(true);
  };

  const guardarCambios = async () => {
    const formData = new FormData();
    formData.append("descripcion", descripcion);
    if (fotoFile) formData.append("foto_perfil", fotoFile);

    const res = await fetch(`http://localhost:5000/api/contratistas/${usuario.id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();
    if (!data.success) {
      alert("❌ Error guardando cambios");
      return;
    }

    const usuarioActualizado = {
      ...usuario,
      descripcion,
      foto_perfil: data.data.foto_perfil,
    };

    login(usuarioActualizado);
    setFotoPreview(`http://localhost:5000/uploads/${data.data.foto_perfil}`);
    setEditado(false);
    alert("✅ Cambios guardados correctamente");
  };

  return (
    <div className="perfil-contratista-wrapper">
      <div className="perfil-contratista-card">
        {/* CABECERA */}
        <div className="perfil-header">
          <div className="perfil-foto-container">
            <img src={fotoPreview} alt="Foto perfil" className="perfil-foto" />
            <label className="btn-cambiar-foto">
              Cambiar foto
              <input type="file" accept="image/*" onChange={handleFotoChange} />
            </label>
          </div>

          <div className="perfil-info">
            <h2>{usuario.nombre}</h2>
            <p className="rol">💼 Contratista</p>
            <p className="correo">{usuario.correo}</p>
            <textarea
              className="perfil-bio"
              value={descripcion}
              onChange={handleDescripcionChange}
              placeholder="Describe brevemente tu experiencia o servicios..."
            />
            <div className="perfil-stats">
              <div><strong>12</strong> Vacantes</div>
              <div><strong>8</strong> Contrataciones</div>
              <div><strong>5</strong> Opiniones</div>
            </div>
          </div>
        </div>

        {/* BOTONES */}
        <div className="perfil-botones">
          {editado && (
            <button className="btn-guardar" onClick={guardarCambios}>
              Guardar cambios
            </button>
          )}
          <button className="btn-publicar" onClick={() => navigate("/VacantesContratista")}>
            Publicar vacante
          </button>
          <button className="btn-ver-artistas" onClick={() => navigate("/lista-artistas")}>
            Ver artistas
          </button>
          <button className="btn-editar" onClick={() => navigate("/editar-perfil")}>
            Editar perfil
          </button>
          <button
            className="btn-cerrar"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Cerrar sesión
          </button>
        </div>

        {/* GALERÍA DE EVENTOS */}
        <div className="perfil-galeria">
          <h3>📸 Últimos eventos</h3>
          <div className="galeria-grid">
            <div className="galeria-item"></div>
            <div className="galeria-item"></div>
            <div className="galeria-item"></div>
            <div className="galeria-item"></div>
            <div className="galeria-item"></div>
            <div className="galeria-item"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilContratista;
