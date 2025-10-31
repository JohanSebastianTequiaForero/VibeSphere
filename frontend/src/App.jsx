// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext"; // ✅ Importar el Provider
import ProtectedRoute from "./routes/ProtectedRoute"; // ✅ Importar la protección

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import VacantesArtistas from "./pages/VacantesArtistas";
import Explorer from "./pages/Explorer";
import Artista from "./pages/Artista";
import Contratista from "./pages/Contratista";
import PanelContratista from "./pages/PanelContratista";
import VacantesContratista from "./pages/VacantesContratista";
import Verify from "./pages/Verify";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* 🚀 Redirección automática al Home (o Explorer si prefieres) */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          {/* 🔓 Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:token" element={<Verify />} />
          <Route path="/Explorer" element={<Explorer />} />
      

          {/* 🔒 Rutas protegidas */}
          
          <Route
            path="/VacantesArtistas"
            element={
              <ProtectedRoute>
                <VacantesArtistas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/VacantesContratista"
            element={
              <ProtectedRoute>
                <VacantesContratista />
              </ProtectedRoute>
            }
          />
          <Route
            path="/PanelContratista"
            element={
              <ProtectedRoute>
                <PanelContratista />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Artista"
            element={
              <ProtectedRoute>
                <Artista />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Contratista"
            element={
              <ProtectedRoute>
                <Contratista />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
