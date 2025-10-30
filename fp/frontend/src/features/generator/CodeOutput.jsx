import React, { useState } from "react";

function CodeOutput({ code, onClear }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!code) return null;

  return (
    <div className="bg-secondary-700 text-primary-100 p-6 rounded-2xl shadow-lg w-full h-full overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">Código Generado</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="bg-primary-500 text-secondary-900 px-3 py-1 rounded-md hover:bg-primary-700"
          >
            {copied ? "Copiado ✅" : "Copiar"}
          </button>
          <button
            onClick={onClear}
            className="bg-terciary-500 text-white px-3 py-1 rounded-md hover:bg-terciary-700"
          >
            Limpiar
          </button>
        </div>
      </div>
      <pre className="bg-secondary-800 p-4 rounded-md text-left text-sm whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default CodeOutput;
