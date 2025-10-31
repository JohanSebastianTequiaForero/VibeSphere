import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalPostulacion from "../components/ModalPostulacion";
import { getVacantes, postularVacante } from "../services/vacantesService";
import "./VacantesArtistas.css";

export default function VacantesArtistas() {
  const [vacantes, setVacantes] = useState([]);
  const [vacanteSeleccionada, setVacanteSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [postuladas, setPostuladas] = useState(() => {
    const saved = localStorage.getItem("postuladas");
    return saved ? JSON.parse(saved) : [];
  });

  // 🔹 Cargar vacantes del backend o usar datos de respaldo
  useEffect(() => {
    async function fetchVacantes() {
      try {
        const data = await getVacantes();
        if (Array.isArray(data) && data.length > 0) {
          setVacantes(data);
        } else {
          console.warn("⚠️ No hay vacantes en el backend. Usando datos locales...");
          setVacantes([
            {
              id: 1,
              titulo: "🎤 Vocalista para evento en vivo",
              descripcion: "Buscamos cantante con repertorio pop y energía en tarima.",
              imagen: "https://images.unsplash.com/photo-1525186402429-b4ff38bedbec?w=800",
            },
            {
              id: 2,
              titulo: "🎸 Guitarrista para estudio",
              descripcion: "Grabación de temas acústicos con sesión de ensayo previa.",
              imagen: "https://images.unsplash.com/photo-1511376777868-611b54f68947?w=800",
            },
            {
              id: 3,
              titulo: "🥁 Baterista para tour nacional",
              descripcion: "Se requiere disponibilidad para giras de 2 meses.",
              imagen: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
            },
            {
              id: 4,
              titulo: "🎧 DJ para evento privado",
              descripcion: "Evento nocturno, se requiere experiencia y repertorio variado.",
              imagen: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
            },
          ]);
        }
      } catch (error) {
        console.error("❌ Error cargando vacantes:", error);
      }
    }
    fetchVacantes();
  }, []);

  // 🔹 Postular a una vacante
  const handlePostular = (vacante) => {
    setVacanteSeleccionada(vacante);
    setShowModal(true);
  };

  const confirmarPostulacion = async () => {
    if (vacanteSeleccionada) {
      try {
        await postularVacante(vacanteSeleccionada.id, "artista_demo");
        const nuevasPostuladas = [...postuladas, vacanteSeleccionada.id];
        setPostuladas(nuevasPostuladas);
        localStorage.setItem("postuladas", JSON.stringify(nuevasPostuladas));
      } catch (error) {
        console.error("❌ Error al postular:", error);
      } finally {
        setShowModal(false);
      }
    }
  };

  return (
    <div className="vacantes-artistas-container">
      <motion.h1
        className="titulo-principal"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        🎵 Vacantes Disponibles para Artistas
      </motion.h1>

      <motion.p
        className="subtitulo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Encuentra oportunidades únicas para mostrar tu talento.
      </motion.p>

      <div className="vacantes-grid">
        <AnimatePresence>
          {vacantes.map((v) => (
            <motion.div
              key={v.id}
              className="vacante-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img src={v.imagen} alt={v.titulo} className="vacante-imagen" />
              <div className="vacante-info">
                <h2>{v.titulo}</h2>
                <p>{v.descripcion}</p>
                {postuladas.includes(v.id) ? (
                  <button className="btn-disabled">✅ Ya te postulaste</button>
                ) : (
                  <button className="btn-postular" onClick={() => handlePostular(v)}>
                    🎯 Postularme
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ModalPostulacion
        show={showModal}
        vacante={vacanteSeleccionada}
        onClose={() => setShowModal(false)}
        onConfirm={confirmarPostulacion}
      />
    </div>
  );
}
