import React, { useState } from 'react';
import InputControl from '../../components/UI/InputControl';
import Button from '../../components/UI/Button';
import CollapsibleSection from '../../components/UI/CollapsibleSection';
import { addItem, removeItem } from './controllers/ListsController';

/* ============================
   Renderizadores externos
   ============================ */

function renderParam(param, index, onRemove) {
    return (
        <div key={'param-' + index} className="flex justify-between">
            <span>{param}</span>
            <Button type="secondary" data-index={index} onClick={onRemove}>Eliminar</Button>
        </div>
    );
}

function renderParams(params, onRemove) {
    var result = [];
    var i;
    for (i = 0; i < params.length; i++) {
        result.push(renderParam(params[i], i, onRemove));
    }
    return result;
}

function renderProperty(prop, index, onRemove) {
    return (
        <div key={'prop-' + index} className="flex justify-between">
            <span>{prop}</span>
            <Button type="secondary" data-index={index} onClick={onRemove}>Eliminar</Button>
        </div>
    );
}

function renderProperties(properties, onRemove) {
    var result = [];
    var i;
    for (i = 0; i < properties.length; i++) {
        result.push(renderProperty(properties[i], i, onRemove));
    }
    return result;
}

/* ============================
   Componente principal
   ============================ */

function FormConstructor() {
    var stateClassName = useState('');
    var className = stateClassName[0];
    var setClassName = stateClassName[1];

    var stateParams = useState([]);
    var params = stateParams[0];
    var setParams = stateParams[1];

    var stateNewParam = useState('');
    var newParam = stateNewParam[0];
    var setNewParam = stateNewParam[1];

    var stateProperties = useState([]);
    var properties = stateProperties[0];
    var setProperties = stateProperties[1];

    var stateNewProperty = useState('');
    var newProperty = stateNewProperty[0];
    var setNewProperty = stateNewProperty[1];

    function handleClassNameChange(event) {
        setClassName(event.target.value);
    }

    function handleNewParamChange(event) {
        setNewParam(event.target.value);
    }

    function handleAddParam() {
        setParams(addItem(params, newParam));
        setNewParam('');
    }

    function handleRemoveParam(event) {
        var idx = parseInt(event.currentTarget.getAttribute('data-index'), 10);
        setParams(removeItem(params, idx));
    }

    function handleNewPropertyChange(event) {
        setNewProperty(event.target.value);
    }

    function handleAddProperty() {
        setProperties(addItem(properties, newProperty));
        setNewProperty('');
    }

    function handleRemoveProperty(event) {
        var idx = parseInt(event.currentTarget.getAttribute('data-index'), 10);
        setProperties(removeItem(properties, idx));
    }

    return (
        <CollapsibleSection >
            <div className="space-y-4 bg-primary-300 text-secondary-800 rounded-2xl p-5">

                <div className=" rounded-2xl p-4">
                    <label htmlFor="class-name" className='font-semibold text-lg'>Nombre de la clase</label>

                    <InputControl id="class-name" value={className} onChange={handleClassNameChange} 
                    className="w-1/4 ml-3 bg-primary-100 rounded-md focus:outline-none text-gray-800 p-2 text-base" />
                </div>

                <div className="field">
                    <label>Parámetros del Constructor</label>
                    <div className="space-y-2">{renderParams(params, handleRemoveParam)}</div>
                    <div className="flex gap-2 mt-2">
                        <InputControl id="new-param" placeholder="Nuevo parámetro" value={newParam} onChange={handleNewParamChange} 
                        className="w-1/4 ml-3" />
                        <Button type="primary" onClick={handleAddParam}>Agregar Parámetro</Button>
                    </div>
                </div>

                <div className="field">
                    <label>Propiedades</label>
                    <div className="space-y-2">{renderProperties(properties, handleRemoveProperty)}</div>
                    <div className="flex gap-2 mt-2">
                        <InputControl id="new-property" placeholder="Nueva propiedad" value={newProperty} onChange={handleNewPropertyChange} 
                        className="w-1/4 ml-3" />
                        <Button type="primary" onClick={handleAddProperty}>Agregar Propiedad</Button>
                    </div>
                </div>

            </div>
        </CollapsibleSection>
    );
}

export default FormConstructor;
