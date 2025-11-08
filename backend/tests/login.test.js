const request = require("supertest");
const app = require("../server"); // Asegúrate que exportes tu app en server.js
const db = require("../src/config/db");

describe("Pruebas del Login", () => {
  // Antes de todo, insertamos un usuario de prueba en la BD
  beforeAll(async () => {
    await db.query("DELETE FROM usuarios WHERE correo = 'test@example.com'");
    await db.query(
      "INSERT INTO usuarios (nombre, apellidos, correo, nombre_usuario, password, rol_id, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())",
      [
        "Test",
        "User",
        "test@example.com",
        "testuser",
        "$2b$10$abcdefghijklmnopqrstuv",
        1,
      ]
    );
    // Ojo: ese password debe estar encriptado con bcrypt
  });

  // Caso 1: Login exitoso
  it("Debe loguear con correo y contraseña correctos", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ correo: "test@example.com", password: "12345678" }); // password real

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("usuario");
    expect(res.body.usuario).toHaveProperty("correo", "test@example.com");
  });

  // Caso 2: Correo incorrecto
  it("Debe fallar si el correo no existe", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ correo: "noexiste@example.com", password: "12345678" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Correo o contraseña incorrectos");
  });

  // Caso 3: Contraseña incorrecta
  it("Debe fallar si la contraseña es incorrecta", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ correo: "test@example.com", password: "wrongpass" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Correo o contraseña incorrectos");
  });
});

// Cerrar conexión al terminar
afterAll(async () => {
  await db.end();
});
