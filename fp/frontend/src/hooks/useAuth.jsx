import { useState, useEffect } from "react";
import { loginUser } from "../api/services/authService";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsInitialized(true);
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
    } catch (err) {
      setError(err.message || "Error de conexión");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return {
    user,
    isLoading,
    isInitialized,
    error,
    handleLogin,
    handleLogout,
  };
};
