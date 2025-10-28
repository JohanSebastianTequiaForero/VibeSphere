import React, { useState } from "react";
import "./PanelContratista.css";

const PanelContratista = () => {
  const [activeTab, setActiveTab] = useState("vacantes");
  const [postulados, setPostulados] = useState([
    { id: 1, nombre: "Luna Pérez", vacante: "Festival Sonidos del Alma", estado: "Pendiente" },
    { id: 2, nombre: "Diego Torres", vacante: "Disquera MusicFlow", estado: "Pendiente" },
  ]);
  const [contratos, setContratos] = useState([]);

  const handleContratar = (postulado) => {
    setContratos([
      ...contratos,
      {
        id: contratos.length + 1,
        artista: postulado.nombre,
        vacante: postulado.vacante,
        fecha: new Date().toLocaleDateString(),
      },
    ]);
    setPostulados(postulados.filter((p) => p.id !== postulado.id));
    setActiveTab("contratos");
  };

  return (
    <div className="panel-contratista">
      <header className="header">
        <img src="/logo-vibesphere.png" alt="VibeSphere" className="logo" />
        <h1>Panel del Contratista</h1>
      </header>

      {/* Navegación entre pestañas */}
      <nav className="tabs">
        <button onClick={() => setActiveTab("vacantes")} className={activeTab === "vacantes" ? "active" : ""}>
          Vacantes creadas
        </button>
        <button onClick={() => setActiveTab("postulados")} className={activeTab === "postulados" ? "active" : ""}>
          Lista de postulados
        </button>
        <button onClick={() => setActiveTab("contratacion")} className={activeTab === "contratacion" ? "active" : ""}>
          Confirmación de contratación
        </button>
        <button onClick={() => setActiveTab("contratos")} className={activeTab === "contratos" ? "active" : ""}>
          Registro de contratos
        </button>
      </nav>

      {/* Contenido dinámico según la pestaña activa */}
      <div className="tab-content">
        {/* 1️⃣ Vacantes creadas */}
        {activeTab === "vacantes" && (
          <div className="vacantes-section">
            <h2>Mis Vacantes</h2>
            <div className="vacante-card">
              <h3>Festival Sonidos del Alma</h3>
              <p>Buscamos artistas emergentes con canciones originales.</p>
              <span className="estado">Activa</span>
            </div>
            <div className="vacante-card">
              <h3>Disquera MusicFlow</h3>
              <p>Reclutamos talentos del género pop con estilo propio.</p>
              <span className="estado">En revisión</span>
            </div>
          </div>
        )}

        {/* 2️⃣ Lista de postulados */}
        {activeTab === "postulados" && (
          <div className="postulados-section">
            <h2>Lista de Postulados</h2>
            {postulados.length > 0 ? (
              postulados.map((p) => (
                <div key={p.id} className="postulado-card">
                  <h3>{p.nombre}</h3>
                  <p>Vacante: {p.vacante}</p>
                  <span className="estado">{p.estado}</span>
                </div>
              ))
            ) : (
              <p>No hay postulados por el momento.</p>
            )}
          </div>
        )}

        {/* 3️⃣ Confirmación de contratación */}
        {activeTab === "contratacion" && (
          <div className="contratacion-section">
            <h2>Confirmar Contratación</h2>
            {postulados.length > 0 ? (
              postulados.map((p) => (
                <div key={p.id} className="contratar-card">
                  <h3>{p.nombre}</h3>
                  <p>Vacante: {p.vacante}</p>
                  <button className="btn-contratar" onClick={() => handleContratar(p)}>
                    Confirmar Contratación
                  </button>
                </div>
              ))
            ) : (
              <p>No hay postulados pendientes de contratación.</p>
            )}
          </div>
        )}

        {/* 4️⃣ Registro de contratos */}
        {activeTab === "contratos" && (
          <div className="contratos-section">
            <h2>Registro de Contratos</h2>
            {contratos.length > 0 ? (
              contratos.map((c) => (
                <div key={c.id} className="contrato-card">
                  <h3>{c.artista}</h3>
                  <p>Vacante: {c.vacante}</p>
                  <p>Fecha de contratación: {c.fecha}</p>
                  <span className="estado completado">Registrado</span>
                </div>
              ))
            ) : (
              <p>No hay contratos registrados todavía.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PanelContratista;
