// src/pages/Contratista.jsx
import { motion } from "framer-motion";
import "./Roles.css";

export default function Contratista() {
  return (
    <motion.div 
      className="role-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="role-header">
        <img src="/contratista.jpeg" alt="Contratista" className="role-img" />
        <div>
          <h1>💼 Contratistas</h1>
        <p>
          Los contratistas pueden encontrar artistas fácilmente para sus
          proyectos, ya sea en pequeños eventos privados o en grandes
          festivales. VibeSphere garantiza que encuentres el talento adecuado
          para cada ocasión.
        </p>
        </div>
      </div>

      <h2>Beneficios</h2>
      <ul>
        <li>Acceso a perfiles detallados de artistas.</li>
        <li>Facilidad para contactar y contratar talentos.</li>
        <li>Gestión simplificada de eventos y contrataciones.</li>
        <li>Conexión directa con la comunidad musical.</li>
      </ul>

      <h2>Alcance</h2>
      <p>
        Tendrás a tu disposición un ecosistema digital para planear eventos únicos 
        y garantizar experiencias inolvidables para tu público.
      </p>
    </motion.div>
  );
}
