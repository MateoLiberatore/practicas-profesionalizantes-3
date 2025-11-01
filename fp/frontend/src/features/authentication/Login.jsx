import React, { useState } from "react";
import InputControl from "../../components/UI/InputControl";
import Button from "../../components/UI/Button";
import { useAuth } from "../../hooks/useAuth";

/**
 * @component Login
 * @description Formulario de inicio de sesión desacoplado del contenedor visual.
 */
function Login() {
  const { handleLogin, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="login-title">Iniciar Sesión</h2>

      <InputControl
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={handleEmailChange}
        inputClass="login-input"
        className="w-full"
        spanClass="hidden"
        required
      />

      <InputControl
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={handlePasswordChange}
        inputClass="login-input"
        className="w-full"
        spanClass="hidden"
        required
      />

      <Button
        htmlType="submit"
        disabled={isLoading}
        className={`login-button ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {isLoading ? "Iniciando..." : "Ingresar"}
      </Button>

      {error && <p className="login-error">{error}</p>}
    </form>
  );
}

export default Login;
