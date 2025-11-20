import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./PerfilArtista.css";

function PerfilArtista() {
  const { usuario, login } = useAuth();

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
  const [stats, setStats] = useState({ publicaciones: 0 });
  const [nuevaPublicacion, setNuevaPublicacion] = useState(null);
  const [descripcion, setDescripcion] = useState("");

  const [visorActivo, setVisorActivo] = useState(false);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);

  // Cargar datos usuario
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

  // Cargar publicaciones
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const resPub = await fetch(
          `http://localhost:5000/api/publicaciones/${usuario.id}`
        );
        const dataPub = await resPub.json();

        const ordenadas = dataPub.sort(
          (a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion)
        );

        setGaleria(ordenadas);
        setStats({ publicaciones: ordenadas.length });
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    };
    fetchDatos();
  }, [usuario.id]);

  // Cambiar foto perfil
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

  // Guardar cambios perfil
  const guardarCambios = async () => {
    const formData = new FormData();
    formData.append("competencias", bio);
    if (fotoFile) formData.append("foto_perfil", fotoFile);

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/artistas/${usuario.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert("❌ Error al guardar los cambios");
        return;
      }

      const fotoFinal = data.data.foto_perfil || usuario.foto_perfil;

      const usuarioActualizado = {
        ...usuario,
        competencias: bio,
        foto_perfil: fotoFinal,
      };

      login(usuarioActualizado);
      localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));

      setFotoPreview(
        `http://localhost:5000/uploads/${fotoFinal}?v=${Date.now()}`
      );
      setFotoFile(null);
      setIsEdited(false);

      alert("✅ Cambios guardados correctamente");
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("❌ Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  // Subir publicación
  const handleNuevaPublicacion = async () => {
    if (!nuevaPublicacion)
      return alert("Selecciona un archivo para subir");

    const formData = new FormData();
    formData.append("archivo", nuevaPublicacion);
    formData.append("usuario_id", usuario.id);
    formData.append("descripcion", descripcion);

    try {
      const res = await fetch(
        "http://localhost:5000/api/publicaciones",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.error) {
        alert("❌ Error al subir");
        return;
      }

      // Agregar nueva publicación ordenada
      setGaleria((prev) => [
        {
          publicacion_id: data.publicacion_id,
          archivo_url: data.archivo_url,
          tipo_publicacion: data.tipo_publicacion,
          descripcion,
          usuario_id: usuario.id,
        },
        ...prev,
      ]);

      // Actualizar contador
      setStats((prev) => ({
        ...prev,
        publicaciones: prev.publicaciones + 1,
      }));

      setDescripcion("");
      setNuevaPublicacion(null);

      alert("✅ Publicación subida correctamente");
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Error de conexión");
    }
  };

  // Eliminar publicación
  const eliminarPublicacion = async (id) => {
    if (!window.confirm("¿Eliminar esta publicación?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/publicaciones/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.error) {
        alert("❌ Error al eliminar");
        return;
      }

      setGaleria((prev) =>
        prev.filter((p) => p.publicacion_id !== id)
      );

      // Actualizar contador
      setStats((prev) => ({
        ...prev,
        publicaciones: prev.publicaciones - 1,
      }));

      setVisorActivo(false);
      setArchivoSeleccionado(null);

      alert("🗑 Publicación eliminada");
    } catch (err) {
      console.error(err);
      alert("❌ Error al eliminar");
    }
  };

  return (
    <div className="perfil-artista-wrapper">
      
      {/* HEADER */}
      <div className="perfil-header">
        <div className="perfil-foto">
          <img src={fotoPreview} alt="Foto" />
          <label className="btn-cambiar-foto">
            Cambiar foto
            <input type="file" accept="image/*" onChange={handleFotoChange} />
          </label>
        </div>

        <div className="perfil-info">
          <h2>{usuario?.nombre}</h2>

          <p><strong>{stats.publicaciones}</strong> publicaciones</p>

          <textarea
            value={bio}
            onChange={handleBioChange}
            className="perfil-bio"
          />

          {isEdited && (
            <button
              onClick={guardarCambios}
              className="btn-guardar"
            >
              Guardar cambios
            </button>
          )}
        </div>
      </div>

      <hr />

      {/* SUBIR PUBLICACIÓN */}
      <div className="subir-publicacion-modern">

        <label className="dropzone">
          <div className="dropzone-content">
            <span className="dropzone-icon">📸</span>
            <p>Haz clic o arrastra una imagen/video aquí</p>
          </div>
          <input
            type="file"
            accept="image/*, video/*"
            onChange={(e) => setNuevaPublicacion(e.target.files[0])}
          />
        </label>

        {nuevaPublicacion && (
          <div className="preview-modern">
            <div className="preview-media">
              {nuevaPublicacion.type.startsWith("video") ? (
                <video src={URL.createObjectURL(nuevaPublicacion)} controls />
              ) : (
                <img src={URL.createObjectURL(nuevaPublicacion)} />
              )}
            </div>

            <textarea
              placeholder="Escribe una descripción..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="descripcion-modern"
            />

            <button className="btn-publicar-modern" onClick={handleNuevaPublicacion}>
              Publicar
            </button>
          </div>
        )}
      </div>

      {/* GALERÍA */}
      <div className="galeria-grid">
        {galeria.map((item) => (
          <div
            key={item.publicacion_id}
            className="galeria-item"
            onClick={() => {
              setArchivoSeleccionado(item);
              setVisorActivo(true);
            }}
          >
            {item.tipo_publicacion === "video" ? (
              <video src={`http://localhost:5000${item.archivo_url}`} />
            ) : (
              <img src={`http://localhost:5000${item.archivo_url}`} />
            )}
          </div>
        ))}
      </div>

      {/* VISOR */}
      {visorActivo && (
        <div className="visor-overlay" onClick={() => setVisorActivo(false)}>
          <div className="visor-modal" onClick={(e) => e.stopPropagation()}>

            <button className="btn-cerrar" onClick={() => setVisorActivo(false)}>
              ✖
            </button>

            {archivoSeleccionado.tipo_publicacion === "video" ? (
              <video
                src={`http://localhost:5000${archivoSeleccionado.archivo_url}`}
                controls autoPlay
              />
            ) : (
              <img src={`http://localhost:5000${archivoSeleccionado.archivo_url}`} />
            )}

            {archivoSeleccionado.descripcion && (
              <p className="visor-descripcion">{archivoSeleccionado.descripcion}</p>
            )}

            <button
              className="btn-eliminar"
              onClick={() => eliminarPublicacion(archivoSeleccionado.publicacion_id)}
            >
              🗑 Eliminar
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default PerfilArtista;
