import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import InputControl from "../../components/UI/InputControl";
import Button from "../../components/UI/Button";

export function LoginContainer() {
  const { handleLogin, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  // Estilo de Input definido para reutilizarlo en ambos campos
  const inputClassStyle = "p-3 rounded-md bg-secondary-800 w-full border border-secondary-600 text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-secondary-400";

  // Estilo base del botón (la parte condicional se añade en el JSX)
  const baseButtonClass = "bg-primary-500 hover:bg-primary-700 text-secondary-900 font-semibold py-2 rounded-md transition duration-300";


  return (
    <div className="bg-transparent">
      <div className="bg-secondary-700 p-8 rounded-2xl shadow-[0_0px_30px_rgba(0,0,0,0.4)] w-98 h-120 text-primary-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary-100">
          Iniciar Sesión
        </h2>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <InputControl
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // Usando la variable de estilo
            inputClass={inputClassStyle}
            className="w-full"
            spanClass="hidden"
            required
          />

          <InputControl
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // Usando la variable de estilo
            inputClass={inputClassStyle}
            className="w-full"
            spanClass="hidden"
            required
          />

          <Button
            htmlType="submit"
            disabled={isLoading}
            // Concatenando el estilo base con el estilo condicional
            className={`${baseButtonClass} ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Iniciando..." : "Ingresar"}
          </Button>

          {error && (
            <p className="text-terciary-500 text-sm text-center mt-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginContainer;