import React, { useState } from "react";
import { useFormHeaders } from "../../hooks/useFormHeaders";
import CollapsibleSection from "../../components/UI/CollapsibleSection";
import InputControl from "../../components/UI/InputControl";
import Button from "../../components/UI/Button";
import ListItem from "../../components/UI/ListItem";

function FormHeaders() {
  const { 
    language, setLanguage, 
    imports, handleAddImport, removeImport,
    specs, handleAddSpec, removeSpec
  } = useFormHeaders();

  const [newImport, setNewImport] = useState("");
  const [newSpec, setNewSpec] = useState("");

  const handleSync = () => {};

  const handleAddImportWrapper = () => {
    if (newImport.trim()) {
      handleAddImport(newImport.trim());
      setNewImport("");
    }
  };

  const handleAddSpecWrapper = () => {
    if (newSpec.trim()) {
      handleAddSpec(newSpec.trim());
      setNewSpec("");
    }
  };

  return (
    <CollapsibleSection onChange={handleSync}>
      <div className="class-headers">

        <div className="col-span-full md:col-span-2 form-field-container">
          <label className="label-style">Lenguaje</label>
          <InputControl
            placeholder="Lenguaje >"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="input-container flex-1 text-primary-400 text-2xl" classInput="input-style"
          />
        </div>

        <div className="form-field-container"> 
          <label className="label-style">Imports</label>
          
          {imports.length > 0 && (
            <div className="space-y-2 mt-2">
              {imports.map((item, i) => (
                <ListItem key={i} label={item} onRemove={() => removeImport(i)} />
              ))}
            </div>
          )}

          <div className="form-add-row">
            <InputControl
              placeholder="Nuevo import >"
              value={newImport}
              onChange={(e) => setNewImport(e.target.value)}
              className="input-container flex-1 text-primary-400 text-2xl"
              classInput="input-style"
            />
            <Button onClick={handleAddImportWrapper} className="header-add-button">
              Agregar
            </Button>
          </div>
        </div>

        <div className="form-field-container">
          <label className="label-style">Especificaciones</label>
          
          {specs.length > 0 && (
            <div className="space-y-2 mt-2">
              {specs.map((item, i) => (
                <ListItem key={i} label={item} onRemove={() => removeSpec(i)} />
              ))}
            </div>
          )}

          <div className="form-add-row">
            <InputControl
              placeholder="Nueva especificación >"
              value={newSpec}
              onChange={(e) => setNewSpec(e.target.value)}
              className="input-container flex-1 text-primary-400 text-2xl"
              classInput="input-style"
            />
            <Button onClick={handleAddSpecWrapper} className="header-add-button">
              Agregar
            </Button>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}

export default FormHeaders;