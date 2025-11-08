import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getVacantesContratista,
  deleteVacante,
  createVacante,
} from "../services/vacantesService";
import "./VacantesContratista.css";

export default function VacantesContratista() {
  const [vacantes, setVacantes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCrear, setShowCrear] = useState(false);
  const [vacanteSeleccionada, setVacanteSeleccionada] = useState(null);
  const [nuevaVacante, setNuevaVacante] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
  });

  // =========================
  // 🔹 Cargar vacantes
  // =========================
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getVacantesContratista();
        setVacantes(
          data?.length
            ? data
            : [
                {
                  id: 1,
                  titulo: "🎤 Vocalista para evento corporativo",
                  descripcion:
                    "Evento privado en Bogotá. Pago por presentación.",
                  imagen:
                    "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800",
                },
                {
                  id: 2,
                  titulo: "🎧 Productor musical freelance",
                  descripcion:
                    "Buscamos productor para mezcla y master de temas urbanos.",
                  imagen:
                    "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=800",
                },
                {
                  id: 3,
                  titulo: "🎸 Guitarrista para grabación en estudio",
                  descripcion:
                    "Se requiere guitarrista con experiencia en rock alternativo.",
                  imagen:
                    "https://images.unsplash.com/photo-1507835661030-7ce1cfb8d8a0?w=800",
                },
                {
                  id: 4,
                  titulo: "🥁 Baterista para banda pop",
                  descripcion:
                    "Buscamos baterista para shows en vivo y grabaciones.",
                  imagen:
                    "https://images.unsplash.com/photo-1521334884684-d80222895322?w=800",
                },
                {
                  id: 5,
                  titulo: "🎹 Pianista para eventos elegantes",
                  descripcion:
                    "Contratación para evento de gala. Repertorio clásico y moderno.",
                  imagen:
                    "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=800",
                },
                {
                  id: 6,
                  titulo: "🎙️ Locutor para comerciales radiales",
                  descripcion:
                    "Grabación de voz profesional para campaña publicitaria.",
                  imagen:
                    "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800",
                },
                {
                  id: 7,
                  titulo: "🎥 Editor de video musical",
                  descripcion:
                    "Se busca editor con experiencia en contenido para YouTube.",
                  imagen:
                    "https://images.unsplash.com/photo-1581091870627-3c1c8c4a1a39?w=800",
                },
                {
                  id: 8,
                  titulo: "🎛️ Técnico de sonido en vivo",
                  descripcion:
                    "Para conciertos pequeños en Medellín. Se paga por evento.",
                  imagen:
                    "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=800",
                },
              ]
        );
      } catch (err) {
        console.error("Error cargando vacantes:", err);
      }
    }
    fetchData();
  }, []);

  // =========================
  // 🗑️ Eliminar vacante
  // =========================
  const handleEliminar = (vacante) => {
    setVacanteSeleccionada(vacante);
    setShowModal(true);
  };

  const confirmarEliminacion = async () => {
    if (vacanteSeleccionada) {
      await deleteVacante(vacanteSeleccionada.id);
      setVacantes(vacantes.filter((v) => v.id !== vacanteSeleccionada.id));
      setShowModal(false);
    }
  };

  // =========================
  // ➕ Crear nueva vacante
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaVacante({ ...nuevaVacante, [name]: value });
  };

  const handleCrearVacante = async (e) => {
    e.preventDefault();
    if (!nuevaVacante.titulo || !nuevaVacante.descripcion) {
      alert("Por favor completa los campos requeridos");
      return;
    }
    const creada = await createVacante(nuevaVacante);
    if (creada) {
      setVacantes([...vacantes, creada]);
      setNuevaVacante({ titulo: "", descripcion: "", imagen: "" });
      setShowCrear(false);
    }
  };

  // =========================
  // 🖥️ Renderizado
  // =========================
  return (
    <div className="vacantes-contratista-container">
      <h1>🎶 Mis Vacantes Publicadas</h1>

      {/* 💜 Botón flotante para crear */}
      <button className="btn-flotante" onClick={() => setShowCrear(true)}>
        ➕ Crear Vacante
      </button>

      {/* 📋 Listado de vacantes */}
      <div className="vacantes-grid">
        {vacantes.map((v) => (
          <motion.div
            key={v.id}
            className="vacante-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img src={v.imagen} alt={v.titulo} />
            <h3>{v.titulo}</h3>
            <p>{v.descripcion}</p>
            <button onClick={() => handleEliminar(v)} className="btn-eliminar">
              🗑️ Eliminar
            </button>
          </motion.div>
        ))}
      </div>

      {/* 🪄 Modal para crear vacante */}
      <AnimatePresence>
        {showCrear && (
          <motion.div
            className="modal-overlay solid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-card"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2>➕ Crear Nueva Vacante</h2>
              <form onSubmit={handleCrearVacante}>
                <input
                  type="text"
                  name="titulo"
                  placeholder="Título"
                  value={nuevaVacante.titulo}
                  onChange={handleChange}
                />
                <textarea
                  name="descripcion"
                  placeholder="Descripción"
                  value={nuevaVacante.descripcion}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="imagen"
                  placeholder="URL Imagen"
                  value={nuevaVacante.imagen}
                  onChange={handleChange}
                />
                <div className="modal-actions">
                  <button type="submit" className="btn-crear">
                    Publicar
                  </button>
                  <button
                    type="button"
                    className="btn-cancelar"
                    onClick={() => setShowCrear(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🗑️ Modal Confirmar Eliminación */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-overlay solid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-card"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2>🗑️ Confirmar Eliminación</h2>
              <p>
                ¿Seguro deseas eliminar la vacante{" "}
                <strong>{vacanteSeleccionada?.titulo}</strong>?
              </p>
              <div className="modal-actions">
                <button onClick={confirmarEliminacion} className="btn-crear">
                  Sí, eliminar
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-cancelar"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
