import React, { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext();

// Custom hook for accessing the context easily
export const useAuth = () => useContext(AuthContext);

// Context Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
