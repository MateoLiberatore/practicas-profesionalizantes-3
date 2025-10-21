import React, { useState } from "react";
import { useFormMethods } from "../../hooks/useFormMethods";
import InputControl from "../../components/UI/InputControl";
import Button from "../../components/UI/Button";
import CollapsibleSection from "../../components/UI/CollapsibleSection";
import ListItem from "../../components/UI/ListItem";

function FormMethods() {
    const {
        methods,
        newMethod, setNewMethod,
        handleAddMethod, handleRemoveMethod,
        handleNameChange, handleReturnChangeValue,
        addListItem, removeListItem,
    } = useFormMethods();

    const [newMethodParam, setNewMethodParam] = useState("");
    const [newMethodTask, setNewMethodTask] = useState("");

    const handleSync = () => {};

    const handleAddParamWrapper = (methodIndex) => {
        if (newMethodParam.trim()) {
            addListItem(methodIndex, 'params', newMethodParam.trim());
            setNewMethodParam("");
        }
    };

    const handleAddTaskWrapper = (methodIndex) => {
        if (newMethodTask.trim()) {
            addListItem(methodIndex, 'tasks', newMethodTask.trim());
            setNewMethodTask("");
        }
    };

    return (
        <CollapsibleSection  onChange={handleSync}>
            <div className="class-methods">
                <label className="label-style">Nuevo Método</label>

                <div className="flex gap-2 items-baseline mb-6">
                    <InputControl
                        value={newMethod}
                        onChange={(e) => setNewMethod(e.target.value)}
                        placeholder="Nuevo_metodo>"
                        className="input-container flex-1 text-primary-400 text-2xl"
                        classInput="input-style"
                    />
                    <Button type="primary" onClick={handleAddMethod}
                        className="header-add-button">
                        Crear Método
                    </Button>
                </div>

                <div className="methods-list-container space-y-4">
                    {methods.map((method, i) => (
                        <CollapsibleSection key={i} data-index={i} className="">
                            
                            <div className="method-content bg-secondary-300 p-5 rounded-lg mt-20 pb-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="form-field-container">
                                        <label className="label-style text-lg">Nombre del Método</label>
                                        <InputControl
                                            value={method.name}
                                            data-index={i}
                                            onChange={handleNameChange}
                                            placeholder="Nombre_del_metodo>"
                                            className="input-container flex-1 text-primary-400 text-2xl"
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
                                                        onRemove={() => removeListItem(i, 'params', pIdx)} 
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        <div className="form-add-row mt-2">
                                            <InputControl
                                                value={newMethodParam}
                                                onChange={(e) => setNewMethodParam(e.target.value)}
                                                placeholder="Nuevo_parámetro>"
                                                className="input-container flex-1 text-primary-400 text-2xl"
                                                classInput="input-style"
                                            />
                                            <Button onClick={() => handleAddParamWrapper(i)}
                                                className="header-add-button">Agregar</Button>
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
                                                        onRemove={() => removeListItem(i, 'tasks', tIdx)} 
                                                    />
                                                ))}
                                            </div>
                                        )}
                                        <div className="form-add-row mt-2">
                                            <InputControl
                                                value={newMethodTask}
                                                onChange={(e) => setNewMethodTask(e.target.value)}
                                                placeholder="Nueva_tarea>"
                                                className="input-container flex-1 text-primary-400 text-2xl"
                                                classInput="input-style"
                                            />
                                            <Button onClick={() => handleAddTaskWrapper(i)}
                                                className="header-add-button">Agregar</Button>
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
                                        className="input-container flex-1 text-primary-400 text-2xl w-3/4"
                                        classInput="input-style"
                                    />
                                </div>
                                
                                <div className="form-field-container flex items-end justify-end">
                                    <Button
                                        type="secondary"
                                        onClick={() => handleRemoveMethod(i)}
                                        className="header-delete-button w-full sm:w-auto mt-4 p-1"
                                    >
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