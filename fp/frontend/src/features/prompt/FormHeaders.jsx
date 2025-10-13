import React, { useState } from 'react';
import InputControl from '../../components/UI/InputControl';
import Button from '../../components/UI/Button';
import CollapsibleSection from '../../components/UI/CollapsibleSection';
import { addItem, removeItem } from './controllers/ListsController';

/* =============================================
   Renderizadores 
   ============================================= */

function renderImportItem(item, index, onRemove) {
    return (
        <div key={'import-' + index} className="flex justify-between">
            <span>{item}</span>
            <Button type="secondary" data-index={index} onClick={onRemove}>Eliminar</Button>
        </div>
    );
}

function renderImportsList(imports, onRemove) {
    var result = [];
    var i;
    for (i = 0; i < imports.length; i++) {
        result.push(renderImportItem(imports[i], i, onRemove));
    }
    return result;
}

function renderSpecItem(item, index, onRemove) {
    return (
        <div key={'spec-' + index} className="flex justify-between">
            <span>{item}</span>
            <Button type="secondary" data-index={index} onClick={onRemove}>Eliminar</Button>
        </div>
    );
}

function renderSpecsList(specs, onRemove) {
    var result = [];
    var i;
    for (i = 0; i < specs.length; i++) {
        result.push(renderSpecItem(specs[i], i, onRemove));
    }
    return result;
}

/* =============================================
   Componente principal
   ============================================= */

function FormHeaders() {
    var stateLanguage = useState('');
    var language = stateLanguage[0];
    var setLanguage = stateLanguage[1];

    var stateFramework = useState('');
    var framework = stateFramework[0];
    var setFramework = stateFramework[1];

    var stateImports = useState([]);
    var imports = stateImports[0];
    var setImports = stateImports[1];

    var stateNewImport = useState('');
    var newImport = stateNewImport[0];
    var setNewImport = stateNewImport[1];

    var stateSpecs = useState([]);
    var specs = stateSpecs[0];
    var setSpecs = stateSpecs[1];

    var stateNewSpec = useState('');
    var newSpec = stateNewSpec[0];
    var setNewSpec = stateNewSpec[1];

    /* =============================
       Handlers explícitos
       ============================= */

    function handleLanguageChange(event) {
        setLanguage(event.target.value);
    }

    function handleFrameworkChange(event) {
        setFramework(event.target.value);
    }

    function handleNewImportChange(event) {
        setNewImport(event.target.value);
    }

    function handleAddImport() {
        setImports(addItem(imports, newImport));
        setNewImport('');
    }

    function handleRemoveImport(event) {
        var idx = parseInt(event.currentTarget.getAttribute('data-index'), 10);
        setImports(removeItem(imports, idx));
    }

    function handleNewSpecChange(event) {
        setNewSpec(event.target.value);
    }

    function handleAddSpec() {
        setSpecs(addItem(specs, newSpec));
        setNewSpec('');
    }

    function handleRemoveSpec(event) {
        var idx = parseInt(event.currentTarget.getAttribute('data-index'), 10);
        setSpecs(removeItem(specs, idx));
    }

    /* =============================
       Render
       ============================= */

    return (
        
        <CollapsibleSection >
        
            <div className="bg-secondary-400 rounded-2xl p-6 
            shadow-[0_0px_30px_rgba(0,0,0,0.1)] shadow-secondary-800
            text-secondary-800" >

                <div className="field">
                    <label htmlFor="language" className="mb-1 font-bold w-fit ">Lenguaje</label>
                    <InputControl id="language" value={language} onChange={handleLanguageChange} className="w-1/3" />
                </div>

                <div className="field">
                    <label htmlFor="framework" className="block mb-1">Framework (opcional)</label>
                    <InputControl id="framework" value={framework} onChange={handleFrameworkChange} className="w-full" />
                </div>

                <div className="field">
                    <label className="block mb-1">Imports</label>
                    <div className="space-y-2">{renderImportsList(imports, handleRemoveImport)}</div>
                    <div className="mt-2 flex gap-2">
                        <InputControl id="new-import" placeholder="Nuevo import" value={newImport} onChange={handleNewImportChange} className="flex-1" />
                        <Button type="primary" onClick={handleAddImport}>Agregar Import</Button>
                    </div>
                </div>

                <div className="field">
                    <label className="block mb-1">Especificaciones</label>
                    <div className="space-y-2">{renderSpecsList(specs, handleRemoveSpec)}</div>
                    <div className="mt-2 flex gap-2">
                        <InputControl id="new-spec" placeholder="Nueva especificación" value={newSpec} onChange={handleNewSpecChange} className="flex-1" />
                        <Button type="primary" onClick={handleAddSpec}>Agregar Especificación</Button>
                    </div>
                </div>
            </div>
        </CollapsibleSection>
    );
}

export default FormHeaders;
