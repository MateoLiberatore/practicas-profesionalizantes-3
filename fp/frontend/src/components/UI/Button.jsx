import React from 'react';

/**
 * @function renderButtonContent
 * @description Determina qué contenido se renderiza en el botón.
 */
function renderButtonContent(children, label) {
    if (children) {
        return children;
    }
    return label;
}

/**
 * @component Button
 * @description Botón genérico. No tiene lógica, solo estructura.
 */
function Button(props) {
    const htmlType = props.htmlType || 'button';
    const finalClass = props.className || '';

    function handleClick(event) {
        if (typeof props.onClick === 'function') {
            props.onClick(event);
        }
    }

    return (
        <button
            type={htmlType}
            className={finalClass}
            onClick={handleClick}
            disabled={props.disabled}
        >
            {renderButtonContent(props.children, props.label)}
        </button>
    );
}

export default Button;
