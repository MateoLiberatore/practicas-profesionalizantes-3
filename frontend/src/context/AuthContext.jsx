import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../api/services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    async function verify() {
      if (token && storedUser) {
        try {
          const res = await fetch("http://localhost:5000/auth/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.ok) {
            const data = await res.json();
            setUser(data.user || JSON.parse(storedUser));
          } else {
            localStorage.clear();
            setUser(null);
          }
        } catch {
          localStorage.clear();
          setUser(null);
        }
      }
      setIsInitialized(true);
    }

    verify();
  }, []);

  async function handleLogin(email, password) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginUser(email, password);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return user;
    } catch (err) {
      setError(err.message || "Error de conexión");
      setUser(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isInitialized,
        isLoading,
        error,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
