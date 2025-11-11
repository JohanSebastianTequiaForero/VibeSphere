import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./PerfilArtista.css";

function PerfilContratista() {
  const { usuario, login } = useAuth();
  const navigate = useNavigate();

  const [descripcion, setDescripcion] = useState(usuario?.descripcion || "");

  const [fotoPreview, setFotoPreview] = useState(
    usuario?.foto_perfil
      ? usuario.foto_perfil.includes("http")
        ? usuario.foto_perfil
        : `http://localhost:5000/uploads/${usuario.foto_perfil}`
      : "/default-avatar.png"
  );

  const [fotoFile, setFotoFile] = useState(null);
  const [galeria, setGaleria] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nuevaPublicacion, setNuevaPublicacion] = useState(null);
  const [imagenCargando, setImagenCargando] = useState(false);

  useEffect(() => {
    if (usuario) {
      setDescripcion(usuario.descripcion || "");

      setFotoPreview(
        usuario.foto_perfil
          ? usuario.foto_perfil.includes("http")
            ? usuario.foto_perfil
            : `http://localhost:5000/uploads/${usuario.foto_perfil}`
          : "/default-avatar.png"
      );
    }
  }, [usuario]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const resPub = await fetch(
          `http://localhost:5000/api/publicaciones/${usuario.id}`
        );
        const dataPub = await resPub.json();

        if (dataPub.success) {
          setGaleria(dataPub.publicaciones);
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

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
    setIsEdited(true);
  };

  const guardarCambios = async () => {
    const formData = new FormData();
    formData.append("descripcion", descripcion);
    if (fotoFile) formData.append("foto_perfil", fotoFile);

    try {
      setLoading(true);
      setImagenCargando(true);

      const res = await fetch(
        `http://localhost:5000/api/contratistainfo/${usuario.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("BACKEND:", data);

      if (!data.success) {
        alert("Error al guardar los cambios");
        return;
      }

      // -------------------------------
      // ✅ MANEJO CORRECTO DE FOTO
      // -------------------------------
      let fotoFinal = data.data.foto_perfil || usuario.foto_perfil;

      // ✅ No duplica URL si ya contiene http
      const fotoFinalURL = fotoFinal.includes("http")
        ? `${fotoFinal}?v=${Date.now()}`
        : `http://localhost:5000/uploads/${fotoFinal}?v=${Date.now()}`;

      const usuarioActualizado = {
        ...usuario,
        descripcion: descripcion,
        foto_perfil: fotoFinal,
      };

      login(usuarioActualizado);
      localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));

      setFotoPreview(fotoFinalURL);
      setImagenCargando(false);
      setFotoFile(null);
      setIsEdited(false);

      alert("Cambios guardados correctamente");
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error de conexión");
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
              <input type="file" accept="image/*" onChange={handleFotoChange} />
            </label>
          </div>

          <div className="perfil-info">
            <h2>{usuario.nombre}</h2>
            <p className="rol">📌 Contratista</p>
            <p className="correo">{usuario.correo}</p>

            <textarea
              className="perfil-bio"
              value={descripcion}
              onChange={handleDescripcionChange}
              placeholder="Describe tu empresa o servicios..."
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
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="sin-publicaciones">Aún no tienes publicaciones.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PerfilContratista;
