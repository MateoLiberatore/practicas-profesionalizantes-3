
import React from "react";
import Login from "./Login";

/**
 * @component LoginContainer
 * @description Contenedor visual del formulario de Login.
 */
function LoginContainer() {
  function handleContainerClick() {
    // reservado para futuras interacciones visuales, por ejemplo mostrar animación
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-secondary-800"
      onClick={handleContainerClick}
    >
      <div className="bg-transparent p-8 rounded-2xl shadow-login text-primary-100">
        <Login />
      </div>
    </div>
  );
}

export default LoginContainer;
