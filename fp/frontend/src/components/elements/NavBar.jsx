// src/components/UI/NavBar.jsx
import React from "react";
import Button from "../UI/Button";
import { useAuth } from "../../hooks/useAuth";

/**
 * @component NavBar
 * @description Barra de navegación con título y botón de logout.
 */
function NavBar() {
  const { handleLogout } = useAuth();

  function handleLogoutClick() {
    handleLogout();
  }

  return (
    <nav className="nav-bar">
      <h2 className="nav-title text-5xl p-2">&gt; PreCode</h2>
      <Button
        onClick={handleLogoutClick}
        type="danger"
        label="Cerrar sesión"
      >
        Logout
      </Button>
    </nav>
  );
}

export default NavBar;
