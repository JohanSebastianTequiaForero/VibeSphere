require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// ===============================
// 1. Middlewares globales
// ===============================
app.use(cors());
app.use(express.json()); // Para recibir JSON en requests
app.use(express.urlencoded({ extended: true })); // Para manejar formularios

// ===============================
// 2. Servir imágenes estáticas
// ===============================
// Esto hace que cualquier archivo en 'uploads/' sea accesible en el navegador
// Ej: http://localhost:5000/uploads/nombre_foto.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===============================
// 3. Rutas
// ===============================
const usuarioRoutes = require('./src/routes/usuarioRoutes');
app.use('/api/usuarios', usuarioRoutes);

// ===============================
// 4. Puerto
// ===============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
