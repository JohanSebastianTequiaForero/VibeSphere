// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// ===============================
// 1. Middlewares globales
// ===============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// 2. Servir imágenes estáticas
// ===============================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===============================
// 3. Rutas
// ===============================
const usuarioRoutes = require("./src/routes/usuarioRoutes");
app.use("/api/usuarios", usuarioRoutes);

const loginRoutes = require("./src/routes/loginRoutes");
app.use("/api/login", loginRoutes);

// ===============================
// 4. Exportar app para pruebas
// ===============================
if (require.main === module) {
  // Solo levantar el servidor si no está siendo importado (evita conflictos en test)
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
  );
}

module.exports = app;
