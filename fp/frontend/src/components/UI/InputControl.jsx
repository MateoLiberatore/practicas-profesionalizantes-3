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
  className = '',
  spanClass = '',
  inputClass = 'input-style',
  ...rest        // <--- Captura cualquier prop adicional
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
        {...rest}  
      />
    </div>
  );
}

export default InputControl;
