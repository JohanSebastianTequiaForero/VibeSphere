import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./Perfil.css";

function Perfil() {
  const { usuario, login } = useAuth();
  const [competencias, setCompetencias] = useState(usuario?.competencias || "");
  const [fotoPreview, setFotoPreview] = useState(
  usuario?.foto_perfil
    ? `http://localhost:5000/uploads/${usuario.foto_perfil}`
    : "/default-avatar.png"
);
  const [fotoFile, setFotoFile] = useState(null);

  // ✅ Si el usuario cambia en el contexto, actualiza la vista sin recargar
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
  };
  const guardarCambios = async () => {
  const formData = new FormData();
  formData.append("competencias", competencias);
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
    competencias,
    foto_perfil: data.data.foto_perfil, // ✅ solo el nombre del archivo
  };

  login(usuarioActualizado); // ✅ actualizar en contexto y storage

  // ✅ actualizar la vista inmediatamente
  setFotoPreview(`http://localhost:5000/uploads/${data.data.foto_perfil}`);

  alert("✅ Cambios guardados correctamente");
};



  return (
    <div className="perfil-wrapper">
      <div className="perfil-card">
        {/* FOTO */}
        <div className="perfil-foto-container">
          <img src={fotoPreview} alt="Foto perfil" className="perfil-foto" />
          <label className="btn-cambiar-foto">
            Cambiar foto
            <input type="file" accept="image/*" onChange={handleFotoChange} />
          </label>
        </div>

        {/* INFO */}
        <div className="perfil-info">
          <h2>{usuario.nombre}</h2>
          <p className="rol">{usuario.rol === 1 ? "Artista" : "Contratista"}</p>

          <p className="label">Correo</p>
          <p className="value">{usuario.correo}</p>

          {usuario.rol === 1 && (
            <>
              <p className="label">Competencias</p>
              <textarea
                value={competencias}
                onChange={(e) => setCompetencias(e.target.value)}
                className="textarea"
              />
            </>
          )}

          <button className="btn-guardar" onClick={guardarCambios}>
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}

export default Perfil;





