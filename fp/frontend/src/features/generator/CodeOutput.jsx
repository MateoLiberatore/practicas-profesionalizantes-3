import React from "react";
import { Copy, Trash2 } from "lucide-react";
import Button from "../../components/UI/Button";

function CodeOutput({ code, onClear, loading }) {

  async function handleCopyClick() {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      alert("¡Código copiado al portapapeles!");
    } catch (err) {
      console.error('Error al copiar el texto: ', err);
      alert("Error al copiar el código.");
    }
  }

  function handleClearClick() {
    if (typeof onClear === "function") onClear();
  }

  return (
    <div className="code-output-container slide-fade-in w-full">
      <div className="code-output-header">
        <h2 className="code-output-title">&gt; Código Generado</h2>
        <div className="code-output-actions">
          <Button onClick={handleCopyClick} type="primary" disabled={!code}>
            <Copy size={16} />
          </Button>
          <Button onClick={handleClearClick} type="danger">
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="spinner"></div>
        </div>
      ) : code ? (
        <pre className="bg-secondary-800 p-4 rounded-xl overflow-x-auto text-primary-100 font-mono text-sm smooth-fade">
          {code}
        </pre>
      ) : (
        <p className="text-secondary-400 text-center py-4">
          Aún no se ha generado código.
        </p>
      )}
    </div>
  );
}

export default CodeOutput;