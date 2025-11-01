import React, { useState, useEffect } from "react";
import CollapsibleSection from "../../components/elements/CollapsibleSection";
import InputControl from "../../components/UI/InputControl";
import Button from "../../components/UI/Button";
import ListItem from "../../components/UI/ListItem";
import { useFormHeaders } from "../../hooks/useFormHeaders";

/**
 * @component FormHeaders
 * Mantiene la estructura desacoplada (fallback hook + props opcionales).
 * Corrige el handler de eliminación de especificaciones.
 */
function FormHeaders(props) {
  const fallback = useFormHeaders();

  const language = props.language ?? fallback.language;
  const setLanguage = props.setLanguage ?? fallback.setLanguage;
  const imports = props.imports ?? fallback.imports;
  const handleAddImport = props.handleAddImport ?? fallback.handleAddImport;
  const handleRemoveImport = props.handleRemoveImport ?? fallback.handleRemoveImport;
  const specs = props.specs ?? fallback.specs;
  const handleAddSpec = props.handleAddSpec ?? fallback.handleAddSpec;
  const handleRemoveSpec = props.handleRemoveSpec ?? fallback.handleRemoveSpec;
  const variables = props.variables ?? fallback.variables;
  const setVariables = props.setVariables ?? fallback.setVariables;

  const [newImport, setNewImport] = useState("");
  const [newSpec, setNewSpec] = useState("");
  const [newVars, setNewVars] = useState(variables || "");

  function handleLanguageChange(e) {
    if (setLanguage) setLanguage(e.target.value);
  }

  function handleImportInputChange(e) {
    setNewImport(e.target.value);
  }

  function handleSpecInputChange(e) {
    setNewSpec(e.target.value);
  }

  function handleVariableChange(e) {
    setNewVars(e.target.value);
  }

  function handleAddImportClick() {
    if (newImport.trim()) {
      handleAddImport(newImport.trim());
      setNewImport("");
    }
  }

  function handleAddSpecClick() {
    if (newSpec.trim()) {
      handleAddSpec(newSpec.trim());
      setNewSpec("");
    }
  }

  useEffect(() => {
    if (setVariables) setVariables(newVars);
  }, [newVars, setVariables]);

  return (
    <CollapsibleSection title=">Headers">
      <div className="class-headers">
        {/* Lenguaje */}
        <div className="col-span-full md:col-span-2 form-field-container">
          <label className="label-style">Lenguaje</label>
          <InputControl
            placeholder="Lenguaje >"
            value={language}
            onChange={handleLanguageChange}
            className="input-container w-1/2"
            classInput="input-style"
          />
        </div>

        {/* Imports */}
        <div className="form-field-container">
          <label className="label-style">Imports</label>
          {imports.length > 0 && (
            <div className="space-y-2 mt-2">
              {imports.map((item, i) => (
                <ListItem key={i} label={item} onRemove={() => handleRemoveImport(i)} />
              ))}
            </div>
          )}
          <div className="form-add-row">
            <InputControl
              placeholder="Nuevo import >"
              value={newImport}
              onChange={handleImportInputChange}
              className="input-container"
              classInput="input-style"
            />
            <Button onClick={handleAddImportClick} className="header-add-button">
              Agregar
            </Button>
          </div>
        </div>

        {/* Especificaciones */}
        <div className="form-field-container">
          <label className="label-style">Especificaciones</label>
          {specs.length > 0 && (
            <div className="space-y-2 mt-2">
              {specs.map((item, i) => (
                <ListItem key={i} label={item} onRemove={() => handleRemoveSpec(i)} />
              ))}
            </div>
          )}
          <div className="form-add-row">
            <InputControl
              placeholder="Nueva especificación >"
              value={newSpec}
              onChange={handleSpecInputChange}
              className="input-container"
              classInput="input-style"
            />
            <Button onClick={handleAddSpecClick} className="header-add-button">
              Agregar
            </Button>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}

export default FormHeaders;
