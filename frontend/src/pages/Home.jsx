import { motion } from "framer-motion";
import "./Home.css"; // Importa el CSS

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero section */}
      <div className="hero-section">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-title"
        >
          Bienvenido a <span className="highlight">VibeSphere</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hero-text"
        >
          La plataforma donde artistas, contratistas y espectadores conectan 
          para impulsar la música y crear nuevas oportunidades.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="hero-buttons"
        >
          <a href="/register" className="btn purple-btn">Únete ahora</a>
          <a href="/explorar" className="btn blue-btn">Explorar</a>
        </motion.div>
      </div>

      {/* Features */}
      <div className="features-section">
        <motion.div whileHover={{ scale: 1.05 }} className="card purple-card">
          <h3>🎤 Artistas</h3>
          <p>Promociona tu música, conecta con fans y encuentra contratistas.</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="card blue-card">
          <h3>🤝 Contratistas</h3>
          <p>Descubre nuevos talentos y gestiona contrataciones fácilmente.</p>
        </motion.div>
      </div>
    </div>
  );
}

