import "./Explorer.css";
import { motion } from "framer-motion";

export default function Explorer() {
  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 🔹 Encabezado principal */}
      <header className="home-header">
        <h1>
          🏠 Bienvenido a <span>VibeSphere</span>
        </h1>
        <p>
          Aquí comienza tu experiencia musical. Explora artistas, descubre
          contratistas y encuentra oportunidades para crecer en la industria.
        </p>
      </header>

      {/* 🔹 Tarjetas de roles */}
      <div className="roles-container">
        <motion.div
          className="role-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h2>🎤 Soy Artista</h2>
          <p>
            Comparte tu talento, muestra tu música y conecta con contratistas
            que buscan dar vida a sus eventos. Participa en competencias, recibe
            retroalimentación y promueve tu carrera con herramientas digitales.
          </p>
          <button>Descubre más</button>
        </motion.div>

        <motion.div
          className="role-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h2>📅 Soy Contratista</h2>
          <p>
            Encuentra artistas de calidad, organiza eventos únicos y construye
            experiencias memorables. Accede a perfiles verificados, escucha
            demos y contrata de forma segura dentro del ecosistema VibeSphere.
          </p>
          <button>Descubre más</button>
        </motion.div>
      </div>
    </motion.div>
  );
}
