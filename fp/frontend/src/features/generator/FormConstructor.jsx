// src/features/generator/FormConstructor.jsx
import React, { useState } from "react";
import CollapsibleSection from "../../components/UI/CollapsibleSection";
import InputControl from "../../components/UI/InputControl";
import Button from "../../components/UI/Button";
import ListItem from "../../components/UI/ListItem";
import { useFormConstructor } from "../../hooks/useFormConstructor";

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

  return (
    <CollapsibleSection className="rounded-lg">
      <div className="class-constructor">
        <div className="col-span-full md:col-span-2 form-field-container">
          <label className="label-style">Nombre de Clase</label>
          <InputControl
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="Nombre_de_clase>"
            className="input-container flex-1 text-primary-400"
            classInput="input-style"
          />
        </div>

        <div className="form-field-container">
          <label className="label-style">Parámetros del Constructor</label>
          <div className="space-y-2 mt-2">
            {params.map((p, i) => (
              <ListItem key={i} label={p} onRemove={() => handleRemoveParam(i)} />
            ))}
          </div>
          <div className="form-add-row">
            <InputControl
              value={newParam}
              onChange={(e) => setNewParam(e.target.value)}
              placeholder="Nuevo_parámetro>"
              className="input-container flex-1"
              classInput="input-style"
            />
            <Button
              onClick={() => {
                handleAddParam(newParam);
                setNewParam("");
              }}
              className="header-add-button"
            >
              Agregar
            </Button>
          </div>
        </div>

        <div className="form-field-container">
          <label className="label-style">Propiedades de Clase</label>
          <div className="space-y-2 mt-2">
            {properties.map((p, i) => (
              <ListItem key={i} label={p} onRemove={() => handleRemoveProperty(i)} />
            ))}
          </div>
          <div className="form-add-row">
            <InputControl
              value={newProperty}
              onChange={(e) => setNewProperty(e.target.value)}
              placeholder="Nueva_propiedad>"
              className="input-container flex-1"
              classInput="input-style"
            />
            <Button
              onClick={() => {
                handleAddProperty(newProperty);
                setNewProperty("");
              }}
              className="header-add-button"
            >
              Agregar
            </Button>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}

export default FormConstructor;
