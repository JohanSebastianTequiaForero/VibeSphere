import React, { createContext, useContext, useState, useEffect } from "react";

// 🔹Crear el contexto
export const AuthContext = createContext();

// 🔹Hook personalizado para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);

// 🔹Proveedor del contexto (engloba toda la app)
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // ✅ Cargar usuario guardado del localStorage (persistencia al recargar la página)
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      try {
        setUsuario(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error al leer el usuario almacenado:", error);
        localStorage.removeItem("usuario");
      }
    }
  }, []);

  // ✅ Iniciar sesión → guarda usuario en estado y localStorage
  const login = (userData) => {
    setUsuario(userData);
    localStorage.setItem("usuario", JSON.stringify(userData));
  };

  // ✅ Cerrar sesión → elimina usuario de estado y localStorage
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  // 🔹 Valor que estará disponible para toda la app
  const value = {
    usuario,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
