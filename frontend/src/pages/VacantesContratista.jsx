import React, { useState } from "react";
import vacantesData from "../data/vacantesArtistasData";
import "./VacantesContratista.css";

function VacantesContratista() {
  // Estado
  const [activeTab, setActiveTab] = useState("panel");
  const [selectedVacante, setSelectedVacante] = useState(null);
  const [vacantes, setVacantes] = useState(vacantesData);

  // Función: agregar nueva vacante del contratista
  const [nuevaVacante, setNuevaVacante] = useState({
    puesto: "",
    descripcion: "",
    empresa: "",
    contacto: "",
    imagen: "/images/default.jpg",
    postulados: [],
  });

  const agregarVacante = () => {
    if (!nuevaVacante.puesto || !nuevaVacante.empresa) return;
    const nueva = {
      id: vacantes.length + 1,
      ...nuevaVacante,
    };
    setVacantes([...vacantes, nueva]);
    setNuevaVacante({
      puesto: "",
      descripcion: "",
      empresa: "",
      contacto: "",
      imagen: "/images/default.jpg",
      postulados: [],
    });
    alert("✅ Vacante publicada exitosamente");
  };

  const confirmarContratacion = (vacanteId, postulanteId) => {
    setVacantes((prev) =>
      prev.map((vacante) =>
        vacante.id === vacanteId
          ? {
              ...vacante,
              postulados: vacante.postulados.map((p) =>
                p.id === postulanteId
                  ? { ...p, estado: "Contratado" }
                  : p
              ),
            }
          : vacante
      )
    );
  };

  return (
    <div className="vacantes-contratista-container">
      {/* Encabezado */}
      <header className="header">
        <img src="/iconoo.png" alt="VibeSphere Logo" className="logo" />
        <h1>Gestión de Vacantes - Contratista</h1>
      </header>

      {/* Pestañas */}
      <nav className="tabs">
        <button
          className={activeTab === "panel" ? "active" : ""}
          onClick={() => setActiveTab("panel")}
        >
          Mis Vacantes
        </button>
        <button
          className={activeTab === "nueva" ? "active" : ""}
          onClick={() => setActiveTab("nueva")}
        >
          Publicar Vacante
        </button>
        <button
          className={activeTab === "postulados" ? "active" : ""}
          onClick={() => setActiveTab("postulados")}
        >
          Postulados
        </button>
        <button
          className={activeTab === "contrato" ? "active" : ""}
          onClick={() => setActiveTab("contrato")}
        >
          Contratos
        </button>
      </nav>

      {/* Contenido de pestañas */}
      <div className="tab-content">
        {/* Panel de Vacantes Publicadas */}
        {activeTab === "panel" && (
          <div className="panel">
            <h2>Mis Vacantes Publicadas</h2>
            {vacantes.length === 0 ? (
              <p>No has publicado vacantes aún.</p>
            ) : (
              <div className="vacantes-grid">
                {vacantes.map((v) => (
                  <div
                    key={v.id}
                    className="vacante-card"
                    onClick={() => setSelectedVacante(v)}
                  >
                    <img src={v.imagen} alt={v.empresa} />
                    <h3>{v.puesto}</h3>
                    <p>
                      {v.descripcion.length > 60
                        ? `${v.descripcion.slice(0, 60)}...`
                        : v.descripcion}
                    </p>
                    <span className="empresa">{v.empresa}</span>
                  </div>
                ))}
              </div>
            )}

            {selectedVacante && (
              <div className="modal">
                <div className="modal-content">
                  <h2>{selectedVacante.puesto}</h2>
                  <p>{selectedVacante.descripcion}</p>
                  <p>
                    <strong>Contacto:</strong> {selectedVacante.contacto}
                  </p>
                  <button
                    onClick={() => setSelectedVacante(null)}
                    className="cerrar-btn"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Publicar nueva vacante */}
        {activeTab === "nueva" && (
          <div className="publicar-vacante">
            <h2>Publicar Nueva Vacante</h2>
            <div className="form-vacante">
              <input
                type="text"
                placeholder="Puesto"
                value={nuevaVacante.puesto}
                onChange={(e) =>
                  setNuevaVacante({ ...nuevaVacante, puesto: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Empresa"
                value={nuevaVacante.empresa}
                onChange={(e) =>
                  setNuevaVacante({ ...nuevaVacante, empresa: e.target.value })
                }
              />
              <textarea
                placeholder="Descripción"
                value={nuevaVacante.descripcion}
                onChange={(e) =>
                  setNuevaVacante({
                    ...nuevaVacante,
                    descripcion: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Contacto"
                value={nuevaVacante.contacto}
                onChange={(e) =>
                  setNuevaVacante({
                    ...nuevaVacante,
                    contacto: e.target.value,
                  })
                }
              />
              <button onClick={agregarVacante}>Publicar Vacante</button>
            </div>
          </div>
        )}

        {/* Lista de Postulados */}
        {activeTab === "postulados" && (
          <div className="postulados">
            <h2>Postulados por Vacante</h2>
            {vacantes.map((v) => (
              <div key={v.id} className="vacante-postulados">
                <h3>{v.puesto}</h3>
                {v.postulados.length === 0 ? (
                  <p>No hay postulados aún.</p>
                ) : (
                  <ul>
                    {v.postulados.map((p) => (
                      <li key={p.id}>
                        <strong>{p.nombre}</strong> — {p.email} ({p.estado})
                        {p.estado !== "Contratado" && (
                          <button
                            className="confirmar-btn"
                            onClick={() => confirmarContratacion(v.id, p.id)}
                          >
                            Confirmar Contratación
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Contratos registrados */}
        {activeTab === "contrato" && (
          <div className="registro-contrato">
            <h2>Contratos Registrados</h2>
            <div className="contratos-lista">
              {vacantes
                .flatMap((v) =>
                  v.postulados.filter((p) => p.estado === "Contratado")
                )
                .map((p, i) => (
                  <div key={i} className="contrato-item">
                    <span>
                      Contrato generado para: <strong>{p.nombre}</strong>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VacantesContratista;
