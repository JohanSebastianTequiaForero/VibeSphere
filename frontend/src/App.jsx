// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import VacantesArtistas from "./pages/VacantesArtistas";
import Explorer from "./pages/Explorer";
import PerfilArtista from "./pages/PerfilArtista";
import PerfilContratista from "./pages/PerfilContratista";
import ModalConfirmacion from "./components/ModalConfirmacion";
import ModalPostulacion from "./components/ModalPostulacion";
import PanelContratista from "./pages/PanelContratista";
import PanelArtista from "./pages/PanelArtista";
import VacantesContratista from "./pages/VacantesContratista";
import Verify from "./pages/Verify";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-layout">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify/:token" element={<Verify />} />
              <Route path="/Explorer" element={<Explorer />} />

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
                path="/PanelArtista"
                element={
                  <ProtectedRoute>
                    <PanelArtista />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/PerfilArtista"
                element={
                  <ProtectedRoute>
                    <PerfilArtista />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/PerfilContratista"
                element={
                  <ProtectedRoute>
                    <PerfilContratista />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
