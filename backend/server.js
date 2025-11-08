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
// 3. Rutas principales
// ===============================
const usuarioRoutes = require("./src/routes/usuarioRoutes");
app.use("/api/usuarios", usuarioRoutes);

const loginRoutes = require("./src/routes/loginRoutes");
app.use("/api/login", loginRoutes);

const artistaRoutes = require("./src/routes/artistaRoutes");
app.use("/api/artistas", artistaRoutes);

const contratistaInfoRoutes = require("./src/routes/contratistaInfoRoutes");
app.use("/api/contratistainfo", contratistaInfoRoutes);

// ===============================
// 4. Nuevas rutas: Vacantes y Postulaciones
// ===============================
const vacantesRoutes = require("./src/routes/vacantesRoutes");
const postulacionesRoutes = require("./src/routes/postulacionesRoutes");

app.use("/api/vacantes", vacantesRoutes);
app.use("/api/postulaciones", postulacionesRoutes);

// ===============================
// 5. Ruta base de prueba
// ===============================
app.get("/", (req, res) => {
  res.send("🎶 Bienvenido al backend de VibeSphere — API activa");
});

// ===============================
// 6. Levantar servidor
// ===============================
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Servidor corriendo en http://localhost:${5000}`)
  );
}

module.exports = app;
