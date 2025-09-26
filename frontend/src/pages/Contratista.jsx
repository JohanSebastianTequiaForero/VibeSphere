import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaMusic,
  FaHandshake,
  FaSignInAlt,
  FaArrowLeft,
} from "react-icons/fa";
import "./Contratista.css";

// Variantes de animación
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function Contratista() {
  const [selectedItem, setSelectedItem] = useState(null);

  const contratos = [
    {
      nombre: "Feid / MUSIC ➝",
      archivo: "/contratos/feid-music.png",
      descripcion: "Contrato con Feid para show privado en Medellín.",
      tipo: "contrato",
    },
    {
      nombre: "Herencia Timbiquí ➝",
      archivo: "/contratos/herencia.png",
      descripcion: "Presentación cultural en Cali.",
      tipo: "contrato",
    },
    {
      nombre: "Concierto ➝",
      archivo: "/contratos/concierto.png",
      descripcion: "Organización de concierto masivo en Bogotá.",
      tipo: "contrato",
    },
    {
      nombre: "Banda / Salsa ➝",
      archivo: "/contratos/banda.png",
      descripcion: "Contrato de banda de salsa para evento privado.",
      tipo: "contrato",
    },
  ];

  const postulados = [
    {
      nombre: "Vacante 1",
      archivo: "/postulados/vacante1.png",
      descripcion: "Se busca guitarrista con experiencia en música urbana.",
      tipo: "postulado",
    },
    {
      nombre: "Vacante 2",
      archivo: "/postulados/vacante2.png",
      descripcion: "Productor musical especializado en mezclas y masterización.",
      tipo: "postulado",
    },
    {
      nombre: "Vacante 3",
      archivo: "/postulados/vacante3.png",
      descripcion: "Cantante de salsa para temporada de conciertos.",
      tipo: "postulado",
    },
  ];

  return (
    <div className="contratista-container">
      {/* Sidebar */}
      <motion.div
        className="sidebar"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Contratista</h2>
        <motion.ul variants={listVariants} initial="hidden" animate="visible">
          <motion.li variants={itemVariants}>
            <FaUserCircle className="icon" /> Cuenta
          </motion.li>
          <motion.li variants={itemVariants}>
            <FaMusic className="icon" /> Vibrando
          </motion.li>
          <motion.li variants={itemVariants}>
            <FaHandshake className="icon" /> Vacantes
          </motion.li>
          <motion.li variants={itemVariants}>
            <FaSignInAlt className="icon" /> Iniciar Sesión
          </motion.li>
        </motion.ul>
      </motion.div>

      {/* Contenido principal */}
      <div className="main">
        {/* Buscador y botón */}
        <div className="search-bar">
          <input type="text" placeholder="Buscar..." />
          <button className="search-btn">🔍</button>
          <button className="crear-btn">CREAR VACANTE</button>
        </div>

        <div className="content">
          {/* Vacantes realizadas */}
          <motion.div
            className="contratos"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h3>Vacantes realizadas</h3>
            <ul>
              {contratos.map((c, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedItem(c)}
                >
                  {c.nombre}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Postulados */}
          <motion.div
            className="postulados"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3>Postulados</h3>
            {postulados.map((p, index) => (
              <motion.div
                key={index}
                className="vacante"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedItem(p)}
              >
                {p.nombre}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modal (sirve tanto para vacantes como postulados) */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.7, y: -50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.7, y: -50, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2>{selectedItem.nombre}</h2>
              <img src={selectedItem.archivo} alt={selectedItem.nombre} />
              <p className="descripcion">{selectedItem.descripcion}</p>

              {/* Botón Postularse solo si es postulado */}
              {selectedItem.tipo === "postulado" && (
                <button className="apply-btn">Postularse</button>
              )}

              <button
                className="close-btn"
                onClick={() => setSelectedItem(null)}
              >
                <FaArrowLeft /> Volver
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Contratista;