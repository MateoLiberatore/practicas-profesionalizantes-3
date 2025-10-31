// src/features/generator/ClassBuilder.jsx
import React from "react";
import FormHeaders from "./FormHeaders";
import FormConstructor from "./FormConstructor";
import FormMethods from "./FormMethods";
import { useFormConstructor } from "../../hooks/useFormConstructor";
import { useFormHeaders } from "../../hooks/useFormHeaders";
import { useFormMethods } from "../../hooks/useFormMethods";

function ClassBuilder({ onGenerate, loading }) {
  // centralizamos estados usando los hooks
  const constructorState = useFormConstructor();
  const headersState = useFormHeaders();
  const methodsState = useFormMethods();

  const handleGenerateClick = () => {
    const payload = {
      language: headersState.language,
      instructions: headersState.instructions || "", // puede venir de un campo libre
      className: constructorState.className,
      params: constructorState.params,
      properties: constructorState.properties,
      methods: methodsState.methods,
      variableStyle: headersState.variables || "snake_case",
    };

    if (typeof onGenerate === "function") {
      onGenerate(payload);
    }
  };

  return (
    <div className="bg-secondary-600 text-primary-200 rounded-2xl p-5 pb-6 mt-5 mx-auto w-full">
      <h2 className="text-4xl font-bold mb-6 text-center">&gt; Generador de Clases</h2>

      <div className="grid grid-cols-1 gap-4">
        <FormHeaders {...headersState} />
        <FormConstructor {...constructorState} />
        <FormMethods {...methodsState} />
      </div>

      <div className="flex justify-end mt-4 gap-3">
        <button
          onClick={handleGenerateClick}
          disabled={loading}
          className="bg-primary-500 hover:bg-primary-700 text-secondary-900 font-semibold py-2 px-4 rounded-md"
        >
          {loading ? "Generando..." : "Generar Código"}
        </button>
      </div>
    </div>
  );
}

export default ClassBuilder;
