import React from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import "./ModalPostulacion.css";

export default function ModalPostulacion({
  show,
  vacante,
  onClose,
  onConfirm,
  tipo,
}) {
  if (!show) return null;

  // 🔹 Obtener rol desde localStorage
  const rol = localStorage.getItem("rol") || "artista"; // por defecto artista

  // 🔹 Personalización según rol
  const colores = {
    artista: {
      fondo: "rgba(58, 134, 255, 0.15)",
      borde: "#3A86FF",
      boton: "#3A86FF",
    },
    contratista: {
      fondo: "rgba(255, 215, 0, 0.15)",
      borde: "#FFD166",
      boton: "#FFD166",
    },
  };

  const estiloRol = colores[rol] || colores.artista;

  // 🔹 Mensaje dinámico
  const mensaje =
    tipo === "postular"
      ? rol === "artista"
        ? `¿Deseas postularte a la vacante 🎵 "${vacante?.titulo || "sin título"}"?`
        : `¿Deseas abrir convocatoria para artistas en "${vacante?.titulo || "sin título"}"?`
      : `¿Seguro deseas eliminar la postulación a "${vacante?.titulo || "sin título"}"?`;

  const titulo =
    tipo === "postular"
      ? rol === "artista"
        ? "🎶 Confirmar Postulación"
        : "📢 Confirmar Convocatoria"
      : "🗑️ Confirmar Eliminación";

  const textoBoton =
    tipo === "postular"
      ? rol === "artista"
        ? "Sí, postularme"
        : "Sí, abrir convocatoria"
      : "Sí, eliminar";

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal-content"
          style={{
            background: estiloRol.fondo,
            border: `2px solid ${estiloRol.borde}`,
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <h2 style={{ color: estiloRol.borde }}>{titulo}</h2>
          <p>{mensaje}</p>
          <div className="modal-buttons">
            <button
              className="btn-confirm"
              style={{ backgroundColor: estiloRol.boton }}
              onClick={onConfirm}
            >
              {textoBoton}
            </button>
            <button className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ✅ Validaciones de propiedades
ModalPostulacion.propTypes = {
  show: PropTypes.bool.isRequired,
  vacante: PropTypes.shape({
    id: PropTypes.number,
    titulo: PropTypes.string,
    descripcion: PropTypes.string,
    imagen: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  tipo: PropTypes.oneOf(["postular", "eliminar"]).isRequired,
};

// ✅ Valores por defecto
ModalPostulacion.defaultProps = {
  vacante: {
    titulo: "Vacante sin título",
    descripcion: "",
    imagen: "",
  },
};
