import React, { useState } from "react";

function CollapsibleSection({ title, sectionTitle, children, defaultOpen = true, className = "" }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  // soporte de compatibilidad: prioridad props.title -> props.sectionTitle
  const headerTitle = title ?? sectionTitle ?? "";

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className={`collapsible-section slide-fade-in ${className}`}>
      <div className="flex justify-between items-center px-3 py-2">
        <span className="font-bold text-3xl text-primary-200">
          {headerTitle}
        </span>

        <button
          type="button"
          onClick={handleToggle}
          className="hide-show"
          aria-expanded={isOpen}
        >
          {isOpen ? "Ocultar" : "Mostrar"}
        </button>
      </div>

      <div
        className={`collapsible-section-content smooth-fade ${isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        {children}
      </div>
    </div>
  );
}

export default CollapsibleSection;
