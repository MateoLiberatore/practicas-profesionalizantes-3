import React from "react";
import PropTypes from "prop-types";

/**
 * @component Button
 * @description Botón reutilizable con soporte para variantes y estado de carga.
 */
function Button({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = "primary",
  className = "",
}) {
  const baseStyles = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
  };

  const buttonClass = `
    ${baseStyles[type] || baseStyles.primary}
    ${loading || disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `;

  function handleClick(e) {
    if (!loading && !disabled && typeof onClick === "function") {
      onClick(e);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={buttonClass}
    >
      {loading ? "Generando..." : children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(["primary", "secondary", "danger"]),
  className: PropTypes.string,
};

export default Button;
