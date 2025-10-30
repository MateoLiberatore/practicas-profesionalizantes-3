import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

function LoginContainer() {
  const { handleLogin, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  return (
    <div className="bg-secondary-700 p-8 rounded-2xl shadow-xl w-96 text-primary-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded-md bg-secondary-800 border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded-md bg-secondary-800 border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary-500 hover:bg-primary-700 text-secondary-900 font-semibold py-2 rounded-md transition"
        >
          {isLoading ? "Iniciando..." : "Ingresar"}
        </button>
        {error && <p className="text-terciary-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}

export default LoginContainer;
