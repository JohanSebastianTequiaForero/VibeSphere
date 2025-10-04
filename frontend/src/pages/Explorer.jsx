// src/pages/Explorer.jsx
import { motion } from "framer-motion";
import "./Explorer.css";

export default function Explorer() {
  return (
    <motion.div 
      className="explorer-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.header 
        className="explorer-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>🌐 Explorer — VibeSphere</h1>
        <p>Conoce qué hacemos, nuestro alcance y beneficios</p>
      </motion.header>

      {/* Sección: Qué es */}
      <section className="explorer-section">
        <img src="/vibesphere1.jpeg" alt="Conexión musical" />
        <div>
          <h2>¿Qué es VibeSphere?</h2>
          <p>
            VibeSphere es una plataforma digital que conecta artistas con contratistas. 
            Nuestro propósito es impulsar el talento musical y brindar a los organizadores 
            de eventos una manera sencilla y confiable de encontrar artistas para sus proyectos.
          </p>
        </div>
      </section>

      {/* Sección: Alcance */}
      <section className="explorer-section reverse">
        <div>
          <h2>🌍 Alcance</h2>
          <p>
            La plataforma está diseñada para que tanto artistas emergentes como reconocidos 
            puedan tener visibilidad. Desde pequeños eventos locales hasta grandes festivales, 
            VibeSphere busca ser el puente que une la creatividad con la oportunidad.
          </p>
        </div>
        <img src="/vibesphere2.jpeg" alt="Alcance global" />
      </section>

      {/* Sección: Beneficios */}
      <section className="explorer-section">
        <img src="/vibesphere3.jpeg" alt="Beneficios" />
        <div>
          <h2>✨ Beneficios</h2>
          <ul>
            <li>Impulso a artistas para darse a conocer.</li>
            <li>Facilidad para contratistas al buscar talentos.</li>
            <li>Creación de experiencias musicales únicas.</li>
            <li>Un ecosistema seguro y confiable para la contratación.</li>
          </ul>
        </div>
      </section>
    </motion.div>
  );
}
