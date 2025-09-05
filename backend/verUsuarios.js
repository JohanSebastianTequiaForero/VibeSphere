import connection from "./src/config/db.js";

connection.query("SELECT * FROM usuarios", (err, results) => {
  if (err) {
    console.error("❌ Error al obtener usuarios:", err);
    return;
  }
  console.log("📋 Usuarios en la tabla:");
  console.table(results); // 👈 muestra en formato tabla
  connection.end();
});
