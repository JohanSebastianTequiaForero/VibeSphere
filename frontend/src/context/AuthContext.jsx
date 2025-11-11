import React, { createContext, useContext, useState, useEffect } from "react";

// Crear contexto
export const AuthContext = createContext();

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // ✅ Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      try {
        setUsuario(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error al cargar usuario guardado:", error);
        localStorage.removeItem("usuario");
      }
    }
  }, []);

  // ✅ LOGIN SEGURO (no destruye foto_perfil ni datos antiguos)
  const login = (userData) => {
    // ✅ Determinar foto final (mantener actual si userData trae null)
    const fotoFinal =
      userData.foto_perfil !== null && userData.foto_perfil !== undefined
        ? userData.foto_perfil
        : usuario?.foto_perfil || null;

    // ✅ Mezclar datos antiguos + nuevos sin borrar nada
    const usuarioActualizado = {
      ...usuario,   // mantiene lo anterior
      ...userData,  // sobrescribe lo nuevo
      foto_perfil: fotoFinal, // ✅ protege foto anterior
    };

    setUsuario(usuarioActualizado);
    localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));
  };

  // ✅ Logout normal
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
