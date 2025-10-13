import React, { useState } from 'react';
import InputControl from '../../components/UI/InputControl';
import Button from '../../components/UI/Button';
import CollapsibleSection from '../../components/UI/CollapsibleSection';
import {
    addMethod,
    removeMethod,
    handleMethodNameChange,
    addParam,
    removeParam,
    addTask,
    removeTask,
    handleReturnChange
} from './controllers/MethodsController';

/* Render helpers */

function renderParamRow(param, pidx, mIndex, handleRemoveParam) {
    return (
        <div key={'param-' + mIndex + '-' + pidx} className="">
            <span>{param}</span>
            <Button type="secondary" data-method={mIndex} data-param={pidx} onClick={handleRemoveParam}>Eliminar</Button>
        </div>
    );
}

function renderParamsList(paramsArray, mIndex, handleRemoveParam) {
    var result = [];
    var i;
    for (i = 0; i < paramsArray.length; i = i + 1) {
        result.push(renderParamRow(paramsArray[i], i, mIndex, handleRemoveParam));
    }
    return result;
}

function renderTaskRow(task, tidx, mIndex, handleRemoveTask) {
    return (
        <div key={'task-' + mIndex + '-' + tidx} className="">
            <span>{task}</span>
            <Button type="secondary" data-method={mIndex} data-task={tidx} onClick={handleRemoveTask}>Eliminar</Button>
        </div>
    );
}

function renderTasksList(tasksArray, mIndex, handleRemoveTask) {
    var result = [];
    var i;
    for (i = 0; i < tasksArray.length; i = i + 1) {
        result.push(renderTaskRow(tasksArray[i], i, mIndex, handleRemoveTask));
    }
    return result;
}

function renderMethodRow(method, index, handlers) {
    var idxStr = index.toString();

    return (
        <div key={'method-' + index} className="method-block space-y-3 border p-3 rounded">
            <div>
                <label htmlFor={'method-' + idxStr} className="block mb-1">Nombre del método</label>
                <InputControl id={'method-' + idxStr} value={method.name} onChange={handlers.handleNameChange} data-index={idxStr} className="w-full" />
            </div>

            <div>
                <label className="block mb-1">Parámetros</label>
                <div className="params space-y-2">
                    {renderParamsList(method.params, index, handlers.handleRemoveParam)}
                </div>
                <div className="mt-2 flex gap-2">
                    <InputControl id={'new-param-' + idxStr} placeholder="Nuevo parámetro" value={handlers.newParams[idxStr] || ''} onChange={handlers.handleNewParamChange} data-index={idxStr} className="flex-1" />
                    <Button type="primary" data-index={idxStr} onClick={handlers.handleAddParam}>Agregar Parámetro</Button>
                </div>
            </div>

            <div>
                <label className="block mb-1">Tareas</label>
                <div className="tasks space-y-2">
                    {renderTasksList(method.tasks, index, handlers.handleRemoveTask)}
                </div>
                <div className="mt-2 flex gap-2">
                    <InputControl id={'new-task-' + idxStr} placeholder="Nueva tarea" value={handlers.newTasks[idxStr] || ''} onChange={handlers.handleNewTaskChange} data-index={idxStr} className="flex-1" />
                    <Button type="primary" data-index={idxStr} onClick={handlers.handleAddTask}>Agregar Tarea</Button>
                </div>
            </div>

            <div>
                <label htmlFor={'return-' + idxStr} className="block mb-1">Valor de retorno</label>
                <InputControl id={'return-' + idxStr} placeholder="Valor de retorno" value={method.returnValue} onChange={handlers.handleReturnInput} data-index={idxStr} className="w-full" />
            </div>

            <div className="flex justify-end">
                <Button type="secondary" data-index={idxStr} onClick={handlers.handleRemoveMethod}>Eliminar Método</Button>
            </div>
        </div>
    );
}

function renderMethodsList(methodsArray, handlers) {
    var result = [];
    var i;
    for (i = 0; i < methodsArray.length; i = i + 1) {
        result.push(renderMethodRow(methodsArray[i], i, handlers));
    }
    return result;
}

/* Componente */

function FormMethods() {
    var stateMethods = useState([]);
    var methods = stateMethods[0];
    var setMethods = stateMethods[1];

    var stateNewMethod = useState('');
    var newMethod = stateNewMethod[0];
    var setNewMethod = stateNewMethod[1];

    var stateNewParams = useState({});
    var newParams = stateNewParams[0];
    var setNewParams = stateNewParams[1];

    var stateNewTasks = useState({});
    var newTasks = stateNewTasks[0];
    var setNewTasks = stateNewTasks[1];

    /* Handlers nombrados */

    function handleNewMethodChange(event) {
        setNewMethod(event.target.value);
    }

    function handleAddMethod() {
        addMethod(methods, setMethods, newMethod, setNewMethod);
    }

    function handleRemoveMethod(event) {
        removeMethod(event, methods, setMethods);
    }

    function handleNewParamChange(event) {
        var idx = event.target.getAttribute('data-index');
        var copy = Object.assign({}, newParams);
        copy[idx] = event.target.value;
        setNewParams(copy);
    }

    function handleAddParam(event) {
        addParam(event, methods, setMethods, newParams);
        setNewParams(Object.assign({}, newParams));
    }

    function handleRemoveParam(event) {
        removeParam(event, methods, setMethods);
    }

    function handleNewTaskChange(event) {
        var idx = event.target.getAttribute('data-index');
        var copy = Object.assign({}, newTasks);
        copy[idx] = event.target.value;
        setNewTasks(copy);
    }

    function handleAddTask(event) {
        addTask(event, methods, setMethods, newTasks);
        setNewTasks(Object.assign({}, newTasks));
    }

    function handleRemoveTask(event) {
        removeTask(event, methods, setMethods);
    }

    function handleReturnInput(event) {
        handleReturnChange(event, methods, setMethods);
    }

    function handleNameChange(event) {
        handleMethodNameChange(event, methods, setMethods);
    }

    var handlers = {
        handleNameChange: handleNameChange,
        handleRemoveParam: handleRemoveParam,
        handleAddParam: handleAddParam,
        handleNewParamChange: handleNewParamChange,
        handleRemoveTask: handleRemoveTask,
        handleAddTask: handleAddTask,
        handleNewTaskChange: handleNewTaskChange,
        handleReturnInput: handleReturnInput,
        handleRemoveMethod: handleRemoveMethod,
        newParams: newParams,
        newTasks: newTasks
    };

    return (
        <CollapsibleSection>
            <div className="methods-inner space-y-4">
                <div className="new-method flex gap-2 items-center">
                    <label htmlFor="new-method" className="block">Nuevo método</label>
                    <InputControl id="new-method" value={newMethod} onChange={handleNewMethodChange} className="flex-1" />
                    <Button type="primary" onClick={handleAddMethod}>Agregar Método</Button>
                </div>

                <div className="methods-list space-y-4">
                    {renderMethodsList(methods, handlers)}
                </div>
            </div>
        </CollapsibleSection>
    );
}

export default FormMethods;
