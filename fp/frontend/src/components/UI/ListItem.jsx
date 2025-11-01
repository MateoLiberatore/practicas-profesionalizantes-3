import React from "react";
import Button from "./Button";

/**
 * @component ListItem
 * @description Elemento genérico de lista con botón eliminar.
 *              El botón ocupa la mitad del ancho de la fila (columna derecha).
 */
function ListItem({ label, onRemove }) {
  function handleRemove() {
    if (typeof onRemove === "function") {
      onRemove();
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2 mt-1 p-0.5 items-center">
      <span className="header-span-list">&gt; {label}</span>
      <div className="flex justify-end">
        <Button
          type="danger"
          onClick={handleRemove}
          className="w-full text-sm"
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
}

export default ListItem;
