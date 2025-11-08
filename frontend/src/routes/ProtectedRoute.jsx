// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { usuario } = useAuth();

  // 🚫 Si no hay usuario logueado, redirige a /login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Si hay usuario, muestra el contenido
  return children;
};

export default ProtectedRoute;
