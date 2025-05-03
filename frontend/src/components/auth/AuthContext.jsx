import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create the context
const AuthContext = createContext();

// Custom hook for accessing the context easily
export const useAuth = () => useContext(AuthContext);

// Context Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const login = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    navigate(role === "Farmer" ? "/farmer-dashboard" : "/customer-dashboard");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
