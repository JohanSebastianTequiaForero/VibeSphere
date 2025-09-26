# Guía de Estándares de Código

## 1. Reglas de nombres

### 1.1 Variables
- Usar **camelCase**: `totalAmount`, `userName`.
- Constantes globales en **SCREAMING_SNAKE_CASE**: `MAX_RETRIES`.
- Nombres claros y descriptivos (evitar abreviaturas).

### 1.2 Clases
- Usar **PascalCase**: `UserController`, `DatabaseService`.

### 1.3 Métodos y funciones
- **camelCase**: `getUserById()`, `calculateTotalPrice()`.

### 1.4 Archivos
- **JavaScript/React**: `kebab-case` → `user-routes.js`, `login-form.jsx`.
- Un componente React por archivo, con el nombre del componente.

---

## 2. Comentarios y documentación interna

### 2.1 Comentarios de una línea
```js
// Verifica si el usuario está autenticado

2.2 Comentarios de múltiples líneas (JSDoc)

/**
 * Calcula el precio total de un carrito de compras.
 * @param {Array} items - Lista de productos con precio y cantidad.
 * @returns {number} Precio total.
 */
3. Identación y estilo de código

2 espacios para la indentación.

Usar comillas simples ' ' en JavaScript.
Colocar punto y coma al final de cada sentencia.
Longitud máxima de línea: 100 caracteres.
Evitar var, usar const o let.


4. Ejemplos aceptados y no aceptados
Correcto:
const totalPrice = calculateTotal(items);
class UserService {
  getUserById(id) { ... }
}

Incorrecto:
var tp = ctotal(i);
class user_service {
  GetUser(id) { ... }
}