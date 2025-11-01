import React, { useState } from "react";
import CollapsibleSection from "../../components/elements/CollapsibleSection";
import InputControl from "../../components/UI/InputControl";
import Button from "../../components/UI/Button";
import ListItem from "../../components/UI/ListItem";
import { useFormConstructor } from "../../hooks/useFormConstructor";

/**
 * @component FormConstructor
 * Usa el patrón fallback + props (igual que antes).
 * Los botones 'Eliminar' en las listas ocupan la mitad del ancho por el grid 2-col.
 */
function FormConstructor(props) {
  const fallback = useFormConstructor();

  const className = props.className ?? fallback.className;
  const setClassName = props.setClassName ?? fallback.setClassName;
  const params = props.params ?? fallback.params;
  const handleAddParam = props.handleAddParam ?? fallback.handleAddParam;
  const handleRemoveParam = props.handleRemoveParam ?? fallback.handleRemoveParam;
  const properties = props.properties ?? fallback.properties;
  const handleAddProperty = props.handleAddProperty ?? fallback.handleAddProperty;
  const handleRemoveProperty = props.handleRemoveProperty ?? fallback.handleRemoveProperty;

  const [newParam, setNewParam] = useState("");
  const [newProperty, setNewProperty] = useState("");

  /* ===================== HANDLERS ===================== */
  function handleClassNameChange(e) {
    if (setClassName) setClassName(e.target.value);
  }

  function handleParamInputChange(e) {
    setNewParam(e.target.value);
  }

  function handleAddParamClick() {
    if (newParam.trim()) {
      handleAddParam(newParam);
      setNewParam("");
    }
  }

  function handleRemoveParamClick(index) {
    handleRemoveParam(index);
  }

  function handlePropertyInputChange(e) {
    setNewProperty(e.target.value);
  }

  function handleAddPropertyClick() {
    if (newProperty.trim()) {
      handleAddProperty(newProperty);
      setNewProperty("");
    }
  }

  function handleRemovePropertyClick(index) {
    handleRemoveProperty(index);
  }

  /* ===================================================== */

  return (
    <CollapsibleSection title=">Constructor">
      <div className="class-constructor">
        {/* Nombre de clase */}
        <div className="col-span-full md:col-span-2 form-field-container">
          <label className="label-style">Nombre de Clase</label>
          <InputControl
            value={className}
            onChange={handleClassNameChange}
            placeholder="Nombre_de_clase>"
            className="input-container flex-1 text-primary-400 w-1/2"
            classInput="input-style"
          />
        </div>

        {/* Parámetros */}
        <div className="form-field-container">
          <label className="label-style">Parámetros del Constructor</label>
          <div className="space-y-2 mt-2">
            {params.map((p, i) => (
              <ListItem key={i} label={p} onRemove={() => handleRemoveParamClick(i)} />
            ))}
          </div>
          <div className="form-add-row">
            <InputControl
              value={newParam}
              onChange={handleParamInputChange}
              placeholder="Nuevo_parámetro>"
              className="input-container flex-1"
              classInput="input-style"
            />
            <Button onClick={handleAddParamClick} className="header-add-button">
              Agregar
            </Button>
          </div>
        </div>

        {/* Propiedades */}
        <div className="form-field-container">
          <label className="label-style">Propiedades de Clase</label>
          <div className="space-y-2 mt-2">
            {properties.map((p, i) => (
              <ListItem key={i} label={p} onRemove={() => handleRemovePropertyClick(i)} />
            ))}
          </div>
          <div className="form-add-row">
            <InputControl
              value={newProperty}
              onChange={handlePropertyInputChange}
              placeholder="Nueva_propiedad>"
              className="input-container flex-1"
              classInput="input-style"
            />
            <Button onClick={handleAddPropertyClick} className="header-add-button">
              Agregar
            </Button>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}

export default FormConstructor;
