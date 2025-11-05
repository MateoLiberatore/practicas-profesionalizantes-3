import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, getProfile } from "../api/services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile(token)
        .then((profile) => setUser(profile))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setIsInitialized(true));
    } else {
      setIsInitialized(true);
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      if (data?.token) {
        localStorage.setItem("token", data.token);
        const profile = await getProfile(data.token);
        setUser(profile);
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Invalid Credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isInitialized, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
