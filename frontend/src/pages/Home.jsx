// src/pages/Explorer.jsx
import { motion } from "framer-motion";
import "./Home.css";

export default function Home() {
  const userRole = localStorage.getItem("userRole") || "Invitado";

  // Determina la clase según el rol
  const roleClass =
    userRole === "Artista"
      ? "role-artista"
      : userRole === "Contratista"
      ? "role-contratista"
      : "role-invitado";

  return (
    <motion.div
      className={`explorer-page ${roleClass}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 🌟 Encabezado */}
      <motion.header
        className="explorer-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>🏡 Home — VibeSphere</h1>
        <p>Conoce qué hacemos, nuestro alcance y beneficios</p>
      </motion.header>

      {/* 🔹 Card 1 */}
      <div className="explorer-card">
        <img src="/vibesphere1.jpeg" alt="Conexión musical" />
        <div className="card-content">
          <h2>👀 ¿Qué es VibeSphere?</h2>
          <p>
            VibeSphere es una plataforma digital que conecta artistas con
            contratistas. Nuestro propósito es impulsar el talento musical y
            brindar a los organizadores de eventos una manera sencilla y
            confiable de encontrar artistas para sus proyectos.
          </p>
        </div>
      </div>

      {/* 🔹 Card 2 */}
      <div className="explorer-card reverse">
        <img src="/vibesphere2.jpeg" alt="Alcance global" />
        <div className="card-content">
          <h2>🌍 Alcance</h2>
          <p>
            La plataforma está diseñada para que tanto artistas emergentes como
            reconocidos puedan tener visibilidad. Desde pequeños eventos locales
            hasta grandes festivales, VibeSphere busca ser el puente que une la
            creatividad con la oportunidad.
          </p>
        </div>
      </div>

      {/* 🔹 Card 3 */}
      <div className="explorer-card">
        <img src="/vibesphere3.jpeg" alt="Beneficios" />
        <div className="card-content">
          <h2>📊 Beneficios</h2>
          <ul>
            <li>Impulso a artistas para darse a conocer.</li>
            <li>Facilidad para contratistas al buscar talentos.</li>
            <li>Creación de experiencias musicales únicas.</li>
            <li>Un ecosistema seguro y confiable para la contratación.</li>
          </ul>
        </div>
      </div>

      {/* 🔹 Nueva sección: visión y comunidad */}
      <section className="vision-section">
        <motion.div
          className="vision-card"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2>🌟 Nuestra Visión</h2>
          <p>
            En VibeSphere creemos que la música es un puente que conecta
            culturas, emociones y oportunidades. Buscamos impulsar el talento
            emergente y fortalecer la conexión entre artistas y productores de
            eventos en toda Latinoamérica.
          </p>
        </motion.div>

        <motion.div
          className="vision-card"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2>💼 Beneficios</h2>
          <ul>
            <li>
              Acceso a oportunidades exclusivas para presentaciones y eventos.
            </li>
            <li>Perfiles verificados y confiables para cada usuario.</li>
            <li>
              Promoción de tu carrera o tus servicios dentro de la comunidad.
            </li>
            <li>
              Herramientas seguras para contratación y comunicación directa.
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="vision-card"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h2>🎶 Comunidad VibeSphere</h2>
          <p>
            Únete a una red donde la creatividad se convierte en oportunidad.
            Conoce artistas, productores, disqueras y organizadores de eventos
            que comparten tu pasión.
          </p>
        </motion.div>
      </section>
    </motion.div>
  );
}
