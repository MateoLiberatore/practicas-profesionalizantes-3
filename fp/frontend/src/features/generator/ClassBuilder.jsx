import React from "react";
import FormHeaders from "./FormHeaders";
import FormConstructor from "./FormConstructor";
import FormMethods from "./FormMethods";
import Button from "../../components/UI/Button";
import { useFormConstructor } from "../../hooks/useFormConstructor";
import { useFormHeaders } from "../../hooks/useFormHeaders";
import { useFormMethods } from "../../hooks/useFormMethods";

function ClassBuilder({ onGenerate, loading }) {
  const constructorState = useFormConstructor();
  const headersState = useFormHeaders();
  const methodsState = useFormMethods();

  function handleGenerateClick() {
    const payload = {
      language: headersState.language,
      instructions: headersState.instructions || "",
      className: constructorState.className,
      params: constructorState.params,
      properties: constructorState.properties,
      methods: methodsState.methods,
      variableStyle: headersState.variables || "snake_case",
    };

    if (typeof onGenerate === "function") {
      onGenerate(payload);
    }
  }

  return (
    <div className="class-builder-container w-full">
      <h2 className="text-4xl font-bold mb-6 text-center">&gt; Generador de Clases</h2>

      <div className="grid grid-cols-1 gap-4">
        <FormHeaders {...headersState} />
        <FormConstructor {...constructorState} />
        <FormMethods {...methodsState} />
      </div>

      <div className="flex justify-end mt-4 gap-3">
        <Button onClick={handleGenerateClick} loading={loading} type="primary">
          Generar Código
        </Button>
      </div>
    </div>
  );
}

export default ClassBuilder;
