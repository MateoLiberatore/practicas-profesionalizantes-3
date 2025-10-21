import React from "react";
import Button from "./Button";

/**
 * @component ListItem
 * @description Elemento genérico de lista con botón eliminar.
 */
function ListItem({ label, onRemove }) {
    function handleRemove() {
        if (typeof onRemove === "function") {
            onRemove();
        }
    }

    return (
        <div className="grid grid-cols-2 gap-2 mt-1 p-0.5">
            <span className="header-span-list">&gt; {label}</span>
            <Button type="secondary" onClick={handleRemove} className="header-delete-button">
                Eliminar
            </Button>
        </div>
    );
}

export default ListItem;
