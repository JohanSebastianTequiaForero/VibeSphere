const mysql = require("mysql2");

// Crear pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "vibesphere",
  port: process.env.DB_PORT || 3306,
});

// Probar conexión
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Error conectando a MySQL:", err.message);
  } else {
    console.log("✅ Conectado a MySQL");
    connection.release();
  }
});

// Exportar el pool con soporte para promesas
module.exports = pool.promise();
