// src/components/BackButton.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./BackButton.css";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Evitar mostrarlo en Explorer
  if (location.pathname === "/explorer") {
    return null;
  }

  return (
    <motion.button
      className="back-button"
      onClick={() => navigate(-1)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      ⬅ Volver
    </motion.button>
  );
}
