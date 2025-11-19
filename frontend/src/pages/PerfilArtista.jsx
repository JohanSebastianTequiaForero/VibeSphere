import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./PerfilArtista.css";

function PerfilArtista() {
  const { usuario, login } = useAuth();
  const navigate = useNavigate();

  const [bio, setBio] = useState(usuario?.competencias || "");

  const [fotoPreview, setFotoPreview] = useState(
    usuario?.foto_perfil
      ? `http://localhost:5000/uploads/${usuario.foto_perfil}`
      : "/default-avatar.png"
  );

  const [fotoFile, setFotoFile] = useState(null);
  const [galeria, setGaleria] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ canciones: 0, videos: 0, publicaciones: 0 });
  const [nuevaPublicacion, setNuevaPublicacion] = useState(null);
  const [imagenCargando, setImagenCargando] = useState(false);

  useEffect(() => {
    if (usuario) {
      setBio(usuario.competencias || "");
      setFotoPreview(
        usuario.foto_perfil
          ? `http://localhost:5000/uploads/${usuario.foto_perfil}`
          : "/default-avatar.png"
      );
    }
  }, [usuario]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const resPub = await fetch(`http://localhost:5000/api/publicaciones/${usuario.id}`);
        const dataPub = await resPub.json();

        // <<=== CORRECCIÓN
        if (!dataPub.error) {
          setGaleria(dataPub);
          setStats((prev) => ({
            ...prev,
            publicaciones: dataPub.length || 0,
          }));
        }
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    };
    fetchDatos();
  }, [usuario.id]);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFotoFile(file);
    setFotoPreview(URL.createObjectURL(file));
    setIsEdited(true);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
    setIsEdited(true);
  };

  const guardarCambios = async () => {
    const formData = new FormData();
    formData.append("competencias", bio);

    if (fotoFile) formData.append("foto_perfil", fotoFile);

    try {
      setLoading(true);
      setImagenCargando(true);

      const res = await fetch(`http://localhost:5000/api/artistas/${usuario.id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        alert("❌ Error al guardar los cambios");
        return;
      }

      const fotoFinal =
        data.data.foto_perfil || usuario.foto_perfil;

      const fotoFinalURL =
        fotoFinal
          ? `http://localhost:5000/uploads/${fotoFinal}?v=${Date.now()}`
          : "/default-avatar.png";

      const usuarioActualizado = {
        ...usuario,
        competencias: bio,
        foto_perfil: fotoFinal,
      };

      login(usuarioActualizado);
      localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));

      setFotoPreview(fotoFinalURL);
      setImagenCargando(false);
      setFotoFile(null);
      setIsEdited(false);

      alert("✅ Cambios guardados correctamente");
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("❌ Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------
  // SUBIR PUBLICACIÓN — CORREGIDO
  // -------------------------------------------------
  const handleNuevaPublicacion = async () => {
    if (!nuevaPublicacion) return alert("Selecciona una imagen para subir");

    const formData = new FormData();
    formData.append("archivo", nuevaPublicacion);
    formData.append("usuario_id", usuario.id);

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/publicaciones", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // <<=== CAMBIO PRINCIPAL
      if (!data.error) {
        setGaleria((prev) => [...prev, data]);
        setStats((prev) => ({
          ...prev,
          publicaciones: prev.publicaciones + 1,
        }));
        setNuevaPublicacion(null);
        alert("✅ Publicación subida correctamente");
      } else {
        alert("❌ Error al subir la publicación");
      }
    } catch (err) {
      console.error("Error al subir publicación:", err);
      alert("❌ Error de conexión");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="perfil-artista-wrapper">

    {/* ENCABEZADO */}
    <div className="perfil-header">
      <div className="perfil-foto">
        <img
          src={fotoPreview}
          alt="Foto de perfil"
          className={imagenCargando ? "cargando" : ""}
        />

        <label className="btn-cambiar-foto">
          Cambiar foto
          <input type="file" accept="image/*" onChange={handleFotoChange} />
        </label>
      </div>

      <div className="perfil-info">
        <h2 className="perfil-nombre">{usuario?.nombre}</h2>

        <div className="perfil-stats">
          <p><strong>{stats.publicaciones}</strong> publicaciones</p>
        </div>

        <textarea
          value={bio}
          onChange={handleBioChange}
          className="perfil-bio"
        />

        {isEdited && (
          <button onClick={guardarCambios} className="btn-guardar" disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
        )}
      </div>
    </div>

    <hr className="division" />

    {/* SUBIR PUBLICACIÓN */}
    <div className="subir-publicacion">
      <label className="btn-subir-publicacion">
        Seleccionar imagen
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNuevaPublicacion(e.target.files[0])}
        />
      </label>

      <button
        className="btn-publicar"
        onClick={handleNuevaPublicacion}
        disabled={loading}
      >
        {loading ? "Subiendo..." : "Publicar"}
      </button>
    </div>

    {/* GALERÍA TIPO INSTAGRAM */}
    <div className="perfil-galeria">
      {galeria.length > 0 ? (
        <div className="galeria-grid">
          {galeria.map((item) => (
            <div key={item.id} className="galeria-item">
              <img
                src={`http://localhost:5000${item.archivo_url}`}
                alt={item.id}
                onError={(e) => (e.target.src = "/default-avatar.png")}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="sin-publicaciones">Aún no tienes publicaciones 🎵</p>
      )}
    </div>

  </div>
);
}

export default PerfilArtista;
