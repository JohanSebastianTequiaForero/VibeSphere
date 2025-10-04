// src/pages/Home.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <motion.header 
        className="home-header"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
         <div className="page">
      <h1>🏠 Bienvenido a VibeSphere</h1>
      <p>
        Aquí comienza tu experiencia musical. Explora artistas, descubre contratistas
        y encuentra oportunidades para crecer en la industria.
      </p>
    </div>
      </motion.header>

      <div className="roles-container">
        {/* Artista */}
        <motion.div 
          className="role-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h2>🎤 Soy Artista</h2>
          <p>
            Comparte tu talento, muestra tu música y conecta con contratistas que 
            buscan dar vida a sus eventos. 
          </p>
          <Link to="/artista" className="role-link">Descubre más</Link>
        </motion.div>

        {/* Contratista */}
        <motion.div 
          className="role-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h2>📅 Soy Contratista</h2>
          <p>
            Encuentra artistas de calidad, organiza eventos y lleva experiencias 
            únicas a tu público. 
          </p>
          <Link to="/contratista" className="role-link">Descubre más</Link>
        </motion.div>
      </div>
    </div>
  );
}
