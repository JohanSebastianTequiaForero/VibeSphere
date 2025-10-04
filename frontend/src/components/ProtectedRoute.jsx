// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // Si no hay usuario autenticado → redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado → mostrar el contenido
  return children;
};

export default ProtectedRoute;
