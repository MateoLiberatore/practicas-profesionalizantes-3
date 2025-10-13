// InputControl.jsx

import React from 'react';

/**
 * @component InputControl
 * @description Campo de entrada controlado, determinista y reutilizable.
 * Modificado para ser más purista y eliminar funciones wrapper.
 */

// Eliminamos handleInputChange ya que es una función dentro de una función (aunque no es la intención, su uso la convierte en un wrapper innecesario).

function InputControl(props) {
    return (
        <input
            id={props.id}
            type={props.type || 'text'}
            placeholder={props.placeholder || ''}
            value={props.value === undefined || props.value === null ? '' : props.value}
            onChange={props.onChange}
            disabled={props.disabled}
            className={props.className || ''}
            data-index={props['data-index']}
            data-method={props['data-method']}
            data-param={props['data-param']}
            data-task={props['data-task']}
        />
    );
}

export default InputControl;