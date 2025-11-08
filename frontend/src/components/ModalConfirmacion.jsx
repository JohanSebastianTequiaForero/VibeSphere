import React from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

export default function ModalConfirmacion({
  show,
  onClose,
  onConfirm,
  vacante,
  rol = "artista", // puede venir del contexto o props
}) {
  if (!show || !vacante) return null;

  // Texto dinámico según el rol
  const mensaje =
    rol === "contratista"
      ? `¿Seguro deseas eliminar la vacante "${vacante.titulo}"?`
      : `¿Seguro deseas eliminar tu postulación a "${vacante.titulo}"?`;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        className="bg-gradient-to-br from-[#35006b] to-[#5b0aa3] text-white p-8 rounded-3xl shadow-2xl border border-pink-400/30 w-[90%] max-w-md text-center"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center">
          <Trash2 className="w-10 h-10 text-pink-400 mb-3" />
          <h2 className="text-2xl font-bold mb-3">Confirmar Eliminación</h2>
          <p className="text-gray-200 mb-8">{mensaje}</p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={onConfirm}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition"
            >
              Sí, eliminar
            </button>
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-xl font-semibold transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
