import React, { useState } from "react";
import InputControl from "../../components/UI/InputControl";
import Button from "../../components/UI/Button";
import CollapsibleSection from "../../components/elements/CollapsibleSection";
import ListItem from "../../components/UI/ListItem";
import { useFormMethods } from "../../hooks/useFormMethods";

function FormMethods(props) {
  const fallback = useFormMethods();

  const methods = props.methods ?? fallback.methods;
  const newMethod = props.newMethod ?? fallback.newMethod;
  const setNewMethod = props.setNewMethod ?? fallback.setNewMethod;
  const handleAddMethod = props.handleAddMethod ?? fallback.handleAddMethod;
  const handleRemoveMethod = props.handleRemoveMethod ?? fallback.handleRemoveMethod;
  const handleNameChange = props.handleNameChange ?? fallback.handleNameChange;
  const handleReturnChangeValue = props.handleReturnChangeValue ?? fallback.handleReturnChangeValue;
  const addListItem = props.addListItem ?? fallback.addListItem;
  const removeListItem = props.removeListItem ?? fallback.removeListItem;

  const [newMethodParams, setNewMethodParams] = useState({});
  const [newMethodTasks, setNewMethodTasks] = useState({});

  function handleNewMethodChange(e) {
    if (setNewMethod) setNewMethod(e.target.value);
  }

  function handleAddNewMethod() {
    handleAddMethod();
  }

  function handleParamInputChange(e, methodIndex) {
    const value = e.target.value;
    setNewMethodParams((prev) => ({ ...prev, [methodIndex]: value }));
  }

  function handleTaskInputChange(e, methodIndex) {
    const value = e.target.value;
    setNewMethodTasks((prev) => ({ ...prev, [methodIndex]: value }));
  }

  function handleAddParamClick(methodIndex) {
    const value = newMethodParams[methodIndex];
    if (value && value.trim()) {
      addListItem(methodIndex, "params", value.trim());
      setNewMethodParams((prev) => ({ ...prev, [methodIndex]: "" }));
    }
  }

  function handleAddTaskClick(methodIndex) {
    const value = newMethodTasks[methodIndex];
    if (value && value.trim()) {
      addListItem(methodIndex, "tasks", value.trim());
      setNewMethodTasks((prev) => ({ ...prev, [methodIndex]: "" }));
    }
  }

  function handleRemoveParamClick(methodIndex, paramIndex) {
    removeListItem(methodIndex, "params", paramIndex);
  }

  function handleRemoveTaskClick(methodIndex, taskIndex) {
    removeListItem(methodIndex, "tasks", taskIndex);
  }

  function handleRemoveMethodClick(methodIndex) {
    handleRemoveMethod(methodIndex);
  }

  return (
    <CollapsibleSection title=">Methods">
      <div className="class-methods">
        <label className="label-style">Nuevo Método</label>

        <div className="flex gap-2 items-baseline mb-6">
          <InputControl
            value={newMethod}
            onChange={handleNewMethodChange}
            placeholder="Nuevo_metodo>"
            className="input-container flex-1"
            classInput="input-style"
          />
          <Button type="primary" onClick={handleAddNewMethod} className="header-add-button">
            Crear Método
          </Button>
        </div>

        <div className="methods-list-container space-y-4">
          {methods.map((method, i) => (
            <CollapsibleSection
              key={i}
              className="bg-secondary-600 p-0"
              title={">" + (method.name || `Método ${i + 1}`)}
              defaultOpen={true}
            >
              <div className="method-content bg-secondary-300 p-5 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-field-container">
                    <label className="label-style text-lg">Nombre del Método</label>
                    <InputControl
                      value={method.name}
                      data-index={i}
                      onChange={handleNameChange}
                      placeholder="Nombre_del_metodo>"
                      className="input-container flex-1"
                      classInput="input-style"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="form-field-container">
                    <label className="label-style text-lg">Parámetros</label>
                    {method.params.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {method.params.map((p, pIdx) => (
                          <ListItem
                            key={pIdx}
                            label={p}
                            onRemove={() => handleRemoveParamClick(i, pIdx)}
                          />
                        ))}
                      </div>
                    )}
                    <div className="form-add-row mt-2">
                      <InputControl
                        value={newMethodParams[i] || ""}
                        onChange={(e) => handleParamInputChange(e, i)}
                        placeholder="Nuevo_parámetro>"
                        className="input-container flex-1"
                        classInput="input-style"
                      />
                      <Button onClick={() => handleAddParamClick(i)} className="header-add-button">
                        Agregar
                      </Button>
                    </div>
                  </div>

                  <div className="form-field-container">
                    <label className="label-style text-lg">Tareas</label>
                    {method.tasks.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {method.tasks.map((t, tIdx) => (
                          <ListItem
                            key={tIdx}
                            label={t}
                            onRemove={() => handleRemoveTaskClick(i, tIdx)}
                          />
                        ))}
                      </div>
                    )}
                    <div className="form-add-row mt-2">
                      <InputControl
                        value={newMethodTasks[i] || ""}
                        onChange={(e) => handleTaskInputChange(e, i)}
                        placeholder="Nueva_tarea>"
                        className="input-container flex-1"
                        classInput="input-style"
                      />
                      <Button onClick={() => handleAddTaskClick(i)} className="header-add-button">
                        Agregar
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="col-span-full form-field-container mt-4">
                  <label className="label-style text-lg">Tipo de Retorno</label>
                  <InputControl
                    value={method.returnValue}
                    data-index={i}
                    onChange={handleReturnChangeValue}
                    placeholder="Valor_de_retorno>"
                    className="input-container flex-1 w-3/4"
                    classInput="input-style"
                  />
                </div>

                <div className="form-field-container flex items-end justify-end">
                  <Button type="danger" onClick={() => handleRemoveMethodClick(i)}>
                    Eliminar Método
                  </Button>
                </div>
              </div>
            </CollapsibleSection>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
}

export default FormMethods;
