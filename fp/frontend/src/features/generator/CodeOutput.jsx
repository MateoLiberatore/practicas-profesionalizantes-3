import React, { useEffect, useState } from "react";

function formatCode(raw) {
  if (!raw) return "";
  let s = raw.trim();
  // eliminar triple backticks si existen
  if (s.startsWith("```")) {
    s = s.replace(/^```[a-zA-Z0-9]*\n?/, "");
    s = s.replace(/\n?```$/, "");
  }
  return s;
}

function CodeOutput({ code, onClear }) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(formatCode(code));
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      // feedback simple
      alert("Código copiado al portapapeles");
    } catch {
      alert("No se pudo copiar. Usa Ctrl+C");
    }
  };

  if (!text) {
    return (
      <div className="bg-secondary-800 text-primary-200 p-6 rounded-2xl shadow-lg w-full h-full">
        <div className="text-center text-sm opacity-60">Aquí aparecerá el código generado</div>
      </div>
    );
  }

  return (
    <div className="bg-secondary-700 text-primary-100 p-6 rounded-2xl shadow-lg w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">Código Generado</h3>
        <div className="flex gap-2">
          <button onClick={handleCopy} className="bg-primary-500 text-secondary-900 px-3 py-1 rounded-md">
            Copiar
          </button>
          <button onClick={() => { setText(""); onClear && onClear(); }} className="bg-terciary-500 text-white px-3 py-1 rounded-md">
            Limpiar
          </button>
        </div>
      </div>

      <textarea
        readOnly
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="bg-secondary-800 p-4 rounded-md text-left text-sm h-full resize-none whitespace-pre-wrap"
      />
    </div>
  );
}

export default CodeOutput;
