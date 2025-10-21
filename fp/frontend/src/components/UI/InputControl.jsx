import React from 'react';

/**
 * @component InputControl
 * @description Campo de entrada controlado, determinista y reutilizable.
 */
function InputControl({
    id,
    value,
    onChange,
    placeholder = '',
    type = 'text',
    disabled = false,
    'data-index': dataIndex,
    'data-method': dataMethod,
    'data-param': dataParam,
    'data-task': dataTask,
    className = 'input-container text-primary-400',     // ✅ valor por defecto según tu CSS
    spanClass = 'text-primary-400',   // ✅ color coherente con tu paleta
    inputClass = 'input-style'         // ✅ clase existente en tu CSS
}) {
    return (
        <div className={className}>
            <span className={spanClass}>&gt;</span>
            <input
                id={id}
                className={inputClass}
                type={type}
                placeholder={placeholder}
                value={value ?? ''}
                onChange={onChange}
                disabled={disabled}
                data-index={dataIndex}
                data-method={dataMethod}
                data-param={dataParam}
                data-task={dataTask}
            />
        </div>
    );
}

export default InputControl;
