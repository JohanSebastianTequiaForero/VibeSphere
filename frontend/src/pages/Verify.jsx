import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Verify.css";

function Verify() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/usuarios/verify/${token}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setStatus("success");
          setMessage("✅ Tu cuenta ha sido verificada con éxito. Ya puedes iniciar sesión.");
          setTimeout(() => navigate("/login"), 3000); // Redirige a login en 3s
        } else {
          setStatus("error");
          setMessage(data.message || "❌ El enlace de verificación no es válido o ha expirado.");
        }
      } catch (error) {
        console.error("❌ Error verificando:", error);
        setStatus("error");
        setMessage("🚨 Error en el servidor. Intenta más tarde.");
      }
    };

    verifyAccount();
  }, [token, navigate]);

  return (
    <div className="verify-container">
      <div className="verify-box">
        <h2>🔐 Verificación de cuenta</h2>
        {status === "loading" && <p>⏳ Verificando tu cuenta...</p>}
        {status === "success" && <p className="success">{message}</p>}
        {status === "error" && <p className="error">{message}</p>}
      </div>
    </div>
  );
}

export default Verify;