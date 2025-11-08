// src/pages/Artista.jsx
import { motion } from "framer-motion";
import "./Roles.css";

export default function Artista() {
  return (
    <motion.div
      className="role-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="role-header">
        <img src="/artista.jpeg" alt="Artista" className="role-img" />
        <div>
          <h1>🎤 Artistas</h1>
          <p>
            Los artistas en VibeSphere tienen un espacio donde mostrar su
            talento, promocionar sus eventos, compartir su música y conectar con
            contratistas que buscan propuestas innovadoras.
          </p>
        </div>
      </div>

      <h2>Beneficios</h2>
      <ul>
        <li>Perfil público para mostrar tu música y trayectoria.</li>
        <li>Oportunidad de ser contratado para eventos y proyectos.</li>
        <li>Acceso a una comunidad de amantes de la música.</li>
        <li>Visibilidad en un espacio digital dedicado al arte.</li>
      </ul>

      <h2>Alcance</h2>
      <p>
        Tu música llegará a contratistas, productores y organizadores de eventos
        que buscan artistas auténticos para enriquecer sus experiencias.
      </p>
    </motion.div>
  );
}
