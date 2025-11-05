import React from "react";
import Button from "./Button";

function ListItem({ label, onRemove }) {
  function handleRemove() {
    if (typeof onRemove === "function") {
      onRemove();
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2 mt-1 p-0.5 items-center ">
      <span className="header-span-list w-full">&gt; {label}</span>
      <div className="flex justify-start">
        <Button
          type="danger"
          onClick={handleRemove}
          className="w-1/2 text-sm"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ListItem;
