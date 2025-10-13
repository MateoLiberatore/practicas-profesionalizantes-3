import React from 'react';

/**
 * @function renderButtonContent
 * @description Función nombrada auxiliar para decidir qué contenido renderizar.
 * @param {React.ReactNode} children - Contenido pasado entre las etiquetas del componente.
 * @param {string} label - Texto pasado a través de la prop 'label'.
 * @returns {React.ReactNode} El contenido final a mostrar.
 */
function renderButtonContent(children, label) {
    if (children) {
        return children;
    }
    return label; 
}

/**
 * @component Button
 * @description Botón reutilizable enfocado en funcionalidad, delega el estilo a la prop 'className'.
 *
 * @param {object} props
 * @param {string} [props.label] - Texto visible del botón (opcional si se usa children).
 * @param {string} [props.className] - Clases CSS/Tailwind para el estilo.
 * @param {boolean} [props.disabled] - Si está deshabilitado.
 * @param {string} [props.htmlType] - El atributo HTML 'type' (e.g., 'submit', 'button').
 * @param {function} props.onClick - Función que se ejecuta al hacer click.
 * @param {React.ReactNode} [props.children] - Contenido complejo (ej: icono + texto).
 */
function Button(props) {

    const htmlType = props.htmlType || 'button'; 
    const finalClassName = props.className || ''; 

    return (
        <button
            type={htmlType}
            className={finalClassName}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {renderButtonContent(props.children, props.label)}
        </button>
    );
}

export default Button;