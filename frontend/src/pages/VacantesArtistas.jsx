
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserCircle,
  FaMusic,
  FaHandshake,
  FaSignInAlt,
  FaRecordVinyl,
  FaBroadcastTower,
  FaUsers,
  FaCalendarAlt,
  FaBuilding,
} from "react-icons/fa";

function VacantesArtistas() {
  const [selectedVacante, setSelectedVacante] = useState(null);
  const [aplicados, setAplicados] = useState([]);

  const vacantes = [
    {
      nombre: "Disquera Pepito P.",
      icon: <FaBuilding />,
      descripcion:
        "Estamos buscando un artista emergente con proyección internacional en géneros urbanos. Se valoran composiciones originales y presencia escénica.",
      contacto: "pepito@disquera.com",
    },
    {
      nombre: "Disquera MusicFlow",
      icon: <FaRecordVinyl />,
      descripcion:
        "En MusicFlow buscamos un nuevo talento del género Pop con estilo propio, voz auténtica y pasión por la música. ¡Queremos escucharte!",
      contacto: "talentos@musicflow.com",
    },
    {
      nombre: "Disquera P. Music",
      icon: <FaBuilding />,
      descripcion:
        "Convocatoria abierta para cantantes de género fusión y alternativo. Queremos propuestas innovadoras que conecten con el público.",
      contacto: "casting@pmusic.com",
    },
  ];

  const aplicarVacante = (vacante) => {
    if (!aplicados.find((a) => a.nombre === vacante.nombre)) {
      setAplicados([...aplicados, vacante]);
    }
    setSelectedVacante(null);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">
      {/* Sidebar */}
      <motion.div
        className="w-1/5 bg-gradient-to-b from-cyan-600 to-cyan-800 p-6 flex flex-col items-center rounded-r-3xl shadow-lg"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold mb-8">Cuenta</h2>
        <ul className="space-y-6 w-full">
          <li className="cursor-pointer hover:text-yellow-300 flex items-center gap-2">
            <FaUserCircle /> Perfil
          </li>
          <li className="cursor-pointer hover:text-yellow-300 flex items-center gap-2">
            <FaMusic /> Vibrando
          </li>
          <li className="cursor-pointer hover:text-yellow-300 flex items-center gap-2">
            <FaHandshake /> Vacantes
          </li>
          <li className="cursor-pointer hover:text-yellow-300 flex items-center gap-2">
            <FaSignInAlt /> Iniciar Sesión
          </li>
        </ul>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-10 flex flex-col">
        <motion.h1
          className="text-3xl font-bold mb-6 flex items-center gap-2"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <FaHandshake className="text-yellow-300" /> Vacantes para Artistas
        </motion.h1>

        <div className="flex gap-6 flex-1">
          {/* Categorías */}
          <motion.div
            className="w-1/4 bg-gradient-to-b from-purple-600 to-purple-800 rounded-2xl p-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaMusic /> Categorías
            </h2>
            <ul className="space-y-4">
              <li className="bg-purple-700 p-2 rounded-lg cursor-pointer hover:bg-purple-500 flex items-center gap-2">
                <FaRecordVinyl /> Disqueras
              </li>
              <li className="bg-purple-700 p-2 rounded-lg cursor-pointer hover:bg-purple-500 flex items-center gap-2">
                <FaBroadcastTower /> Cadena radial
              </li>
              <li className="bg-purple-700 p-2 rounded-lg cursor-pointer hover:bg-purple-500 flex items-center gap-2">
                <FaUsers /> Bandas
              </li>
              <li className="bg-purple-700 p-2 rounded-lg cursor-pointer hover:bg-purple-500 flex items-center gap-2">
                <FaCalendarAlt /> Eventos
              </li>
            </ul>
          </motion.div>

          {/* Vacantes */}
          <motion.div
            className="w-1/4 bg-gradient-to-b from-blue-600 to-indigo-700 rounded-2xl p-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaHandshake /> Vacantes
            </h2>
            <div className="space-y-4">
              {vacantes.map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-blue-800 p-3 rounded-lg flex justify-between items-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <span className="flex items-center gap-2">
                    {item.icon} {item.nombre}
                  </span>
                  <button
                    className="bg-white text-blue-800 text-sm px-3 py-1 rounded-lg hover:bg-gray-200"
                    onClick={() => setSelectedVacante(item)}
                  >
                    Ver / Aplicar
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Aplicados */}
          <motion.div
            className="flex-1 bg-gradient-to-b from-pink-600 to-pink-800 rounded-2xl p-6"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaUserCircle /> Aplicados
            </h2>
            {aplicados.length === 0 ? (
              <p className="text-gray-100">
                Aún no has aplicado a ninguna vacante.
              </p>
            ) : (
              <ul className="space-y-4">
                {aplicados.map((a, index) => (
                  <li
                    key={index}
                    className="bg-gray-800 rounded-lg p-4 flex justify-between items-center"
                  >
                    <span className="flex items-center gap-2">
                      {a.icon} {a.nombre}
                    </span>
                    <span className="text-sm text-yellow-300">Aplicado</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedVacante && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white text-black rounded-2xl shadow-xl p-6 max-w-md w-full"
              initial={{ scale: 0.8, y: -100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                {selectedVacante.icon} {selectedVacante.nombre}
              </h2>
              <p className="mb-4">{selectedVacante.descripcion}</p>
              <p className="text-blue-600 font-semibold">
                Contacto: {selectedVacante.contacto}
              </p>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                  onClick={() => setSelectedVacante(null)}
                >
                  Cerrar
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => aplicarVacante(selectedVacante)}
                >
                  Aplicar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default VacantesArtistas;
