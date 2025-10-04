import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import VacantesArtistas from "./pages/VacantesArtistas";
import Explorer from "./pages/Explorer";
import Artista from "./pages/Artista";
import Contratista from "./pages/Contratista";
import Verify from "./pages/Verify";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/VacantesArtistas" element={<VacantesArtistas />} />
        <Route path="/Explorer" element={<Explorer />} />
        <Route path="/Artista" element={<Artista />} />
        <Route path="/Contratista" element={<Contratista />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/" element={<Explorer />} />
      </Routes>
    </Router>
  );
}

export default App;
