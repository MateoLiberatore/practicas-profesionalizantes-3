import React, { useState } from "react";
import Button from "../UI/Button";
function CollapsibleSection({ title, sectionTitle, children, defaultOpen = true, className = "" }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
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

        <Button
          type="secondary"
          onClick={handleToggle}
          className="hide-show"
          aria-expanded={isOpen}
        >
          {isOpen ? "Hide" : "Show"}
        </Button>
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
