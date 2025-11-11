import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./PerfilArtista.css";

function PerfilArtista() {
  const { usuario, login } = useAuth();
  const navigate = useNavigate();

  const [bio, setBio] = useState(usuario?.competencias || "");

  // ✅ URL inicial corregida
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

  // ✅ Cuando cambia usuario, actualizar datos
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

  // ✅ Cargar galería y stats
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const resPub = await fetch(`http://localhost:5000/api/publicaciones/${usuario.id}`);
        const dataPub = await resPub.json();

        if (dataPub.success) {
          setGaleria(dataPub.publicaciones);
          setStats({
            canciones: dataPub.canciones || 0,
            videos: dataPub.videos || 0,
            publicaciones: dataPub.publicaciones?.length || 0,
          });
        }
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    };
    fetchDatos();
  }, [usuario.id]);

  // ✅ Preview local al cambiar foto
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

  // ✅ Guardar cambios (sin perder foto)
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

      // ✅ Usar la nueva foto *solo si el backend la envió*
      const fotoFinal =
        data.data.foto_perfil || usuario.foto_perfil;

      const fotoFinalURL =
        fotoFinal
          ? `http://localhost:5000/uploads/${fotoFinal}?v=${Date.now()}`
          : "/default-avatar.png";

      // ✅ Actualizar usuario correctamente
      const usuarioActualizado = {
        ...usuario,
        competencias: bio,
        foto_perfil: fotoFinal, // <-- mantiene la anterior si viene null
      };

      login(usuarioActualizado);
      localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));

      // ✅ Actualizar foto en pantalla
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

  // ✅ Subir nueva publicación
  const handleNuevaPublicacion = async () => {
    if (!nuevaPublicacion) return alert("Selecciona una imagen para subir");

    const formData = new FormData();
    formData.append("imagen", nuevaPublicacion);
    formData.append("artista_id", usuario.id);

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/publicaciones", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setGaleria((prev) => [...prev, data.publicacion]);
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
      {loading && (
        <div className="perfil-loading">
          <div className="spinner"></div>
          <p>Actualizando perfil...</p>
        </div>
      )}

      <div className={`perfil-artista-card ${loading ? "bloqueado" : ""}`}>
        <div className="perfil-header">
          <div className="perfil-foto-container">

            {imagenCargando && <div className="spinner mini"></div>}

            <img
              src={fotoPreview}
              alt="Foto perfil"
              className="perfil-foto"
              onError={(e) => (e.target.src = "/default-avatar.png")}
              onLoad={() => setImagenCargando(false)}
            />

            <label className="btn-cambiar-foto">
              Cambiar foto
              <input
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
              />
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

        <div className="perfil-botones">
          {isEdited && !loading && (
            <button className="btn-guardar" onClick={guardarCambios}>
              Guardar cambios
            </button>
          )}

          <label className="btn-subir">
            Subir nueva publicación
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNuevaPublicacion(e.target.files[0])}
            />
          </label>

          <button className="btn-publicar" onClick={handleNuevaPublicacion}>
            Publicar
          </button>

          <button className="btn-editar" onClick={() => navigate("/home")}>
            Ir al inicio
          </button>
        </div>

        <div className="perfil-galeria">
          {galeria.length > 0 ? (
            <div className="galeria-grid">
              {galeria.map((item) => (
                <div key={item.id} className="galeria-item">
                  <img
                    src={`http://localhost:5000/uploads/${item.imagen}`}
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
    </div>
  );
}

export default PerfilArtista;
