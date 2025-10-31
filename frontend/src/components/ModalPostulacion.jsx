import React from "react";
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

  const mensaje =
    tipo === "postular"
      ? `¿Deseas postularte a la vacante 🎵 "${vacante?.titulo}"?`
      : `¿Seguro deseas eliminar la vacante "${vacante?.titulo}"?`;

  const titulo =
    tipo === "postular"
      ? "🎶 Confirmar Postulación"
      : "🗑️ Confirmar Eliminación";

  const textoBoton = tipo === "postular" ? "Sí, postularme" : "Sí, eliminar";

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
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <h2>{titulo}</h2>
          <p>{mensaje}</p>
          <div className="modal-buttons">
            <button className="btn-confirm" onClick={onConfirm}>
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
