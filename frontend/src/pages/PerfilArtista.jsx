import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./PerfilArtista.css";

function PerfilArtista() {
  const { usuario, login } = useAuth();
  const navigate = useNavigate();

  const [bio, setBio] = useState(usuario?.descripcion || "");
  const [fotoPreview, setFotoPreview] = useState(
    usuario?.foto_perfil
      ? `http://localhost:5000/uploads/${usuario.foto_perfil}`
      : "/default-avatar.png"
  );
  const [fotoFile, setFotoFile] = useState(null);
  const [galeria, setGaleria] = useState([]);
  const [isEdited, setIsEdited] = useState(false);

  const [stats, setStats] = useState({
    canciones: 12,
    videos: 5,
    publicaciones: 6,
  });

  // Cargar publicaciones del artista
  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/publicaciones/${usuario.id}`);
        if (!res.ok) throw new Error("sin conexión");
        const data = await res.json();
        setGaleria(data.publicaciones || []);
        setStats((prev) => ({
          ...prev,
          publicaciones: data.publicaciones?.length || 0,
        }));
      } catch {
        setGaleria([
          { id: 1, imagen: "/galeria1.jpg" },
          { id: 2, imagen: "/galeria2.jpg" },
          { id: 3, imagen: "/galeria3.jpg" },
          { id: 4, imagen: "/galeria4.jpg" },
        ]);
      }
    };
    fetchPublicaciones();
  }, [usuario]);

  // Cambiar foto
  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFotoFile(file);
    setFotoPreview(URL.createObjectURL(file));
    setIsEdited(true);
  };

  // Editar bio
  const handleBioChange = (e) => {
    setBio(e.target.value);
    setIsEdited(true);
  };

  // Guardar cambios
  const guardarCambios = async () => {
    const formData = new FormData();
    formData.append("descripcion", bio);
    if (fotoFile) formData.append("foto_perfil", fotoFile);

    const res = await fetch(`http://localhost:5000/api/artistas/${usuario.id}`, {
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
      descripcion: bio,
      foto_perfil: data.data.foto_perfil,
    };

    login(usuarioActualizado);
    setIsEdited(false);
    alert("✅ Cambios guardados correctamente");
  };

  // Cerrar sesión
  const handleLogout = () => {
    login(null);
    navigate("/login");
  };

  return (
    <div className="perfil-artista-wrapper">
      <div className="perfil-artista-card">
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
            <p className="rol">🎤 Artista</p>
            <p className="correo">{usuario.correo}</p>

            <div className="perfil-stats">
              <div><strong>{stats.canciones}</strong> Canciones</div>
              <div><strong>{stats.videos}</strong> Videos</div>
              <div><strong>{stats.publicaciones}</strong> Publicaciones</div>
            </div>

            <textarea
              className="perfil-bio"
              value={bio}
              onChange={handleBioChange}
              placeholder="Describe tu estilo o trayectoria artística..."
            />
          </div>
        </div>

        {/* BOTONES */}
        <div className="perfil-botones">
          {isEdited && (
            <button className="btn-guardar" onClick={guardarCambios}>
              Guardar cambios
            </button>
          )}
          <button className="btn-subir" onClick={() => navigate("/PanelArtista")}>
            Subir contenido
          </button>
          <button className="btn-ver-contratistas" onClick={() => navigate("/VacantesContratista")}>
            Ver contratistas
          </button>
          <button className="btn-editar" onClick={() => navigate("/home")}>
            Ir al inicio
          </button>
        </div>

        {/* GALERÍA */}
        <div className="perfil-galeria">
          {galeria.length > 0 ? (
            <div className="galeria-grid">
              {galeria.map((item) => (
                <div key={item.id} className="galeria-item">
                  <img src={item.imagen} alt={`Publicación ${item.id}`} />
                </div>
              ))}
            </div>
          ) : (
            <p className="sin-publicaciones">Aún no tienes publicaciones 🎵</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PerfilArtista;
