import { motion } from "framer-motion";
import { MapPin, Clock, Music, Calendar, Mail } from "lucide-react";

export default function VacanteCard({ vacante }) {
  return (
    <motion.div
      className="bg-gradient-to-br from-violet-700/60 to-purple-800/80 text-white p-5 rounded-2xl shadow-lg backdrop-blur-md border border-violet-500/40 hover:scale-[1.02] transition-transform duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold mb-2">{vacante.titulo}</h3>

      <div className="text-sm space-y-1 mb-3 text-violet-100">
        <p className="flex items-center gap-2">
          <MapPin size={16} /> <span>{vacante.ubicacion}</span>
        </p>
        <p className="flex items-center gap-2">
          <Music size={16} /> <span>{vacante.tipo}</span>
        </p>
        <p className="flex items-center gap-2">
          <Clock size={16} /> <span>{vacante.duracion}</span>
        </p>
        <p className="flex items-center gap-2">
          <Calendar size={16} /> <span>{vacante.fecha}</span>
        </p>
        <p className="flex items-center gap-2">
          💰 <span>{vacante.pago}</span>
        </p>
      </div>

      <p className="text-sm mb-4 text-violet-50 leading-relaxed">
        <strong>Descripción: </strong>
        {vacante.descripcion}
      </p>

      <div className="text-sm text-violet-200 mb-3">
        <p>
          <strong>Disponibilidad:</strong> {vacante.disponibilidad}
        </p>
        <p>
          <strong>Contacto:</strong> {vacante.contacto}
        </p>
      </div>

      <button className="bg-violet-500 hover:bg-violet-600 text-white py-2 px-4 rounded-xl font-semibold transition">
        Ver / Aplicar
      </button>
    </motion.div>
  );
}
