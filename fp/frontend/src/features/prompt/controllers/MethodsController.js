
import {
    addItem,
    removeItem,
    duplicateList
} from './ListsController';

/**
 * @file MethodsController.js
 * @description Controlador específico para la manipulación de métodos,
 * usando las utilidades genéricas de ListsController.
 */

/* =====================================================
   FUNCIONES PRINCIPALES
   ===================================================== */

function addMethod(methods, setMethods, newMethod, setNewMethod) {
    if (!newMethod || newMethod.trim() === '') {
        return;
    }

    var newEntry = {
        name: newMethod.trim(),
        params: [],
        tasks: [],
        returnValue: ''
    };

    var updated = addItem(methods, newEntry);
    setMethods(updated);
    setNewMethod('');
}

function removeMethod(event, methods, setMethods) {
    var idx = parseInt(event.currentTarget.getAttribute('data-index'), 10);
    if (isNaN(idx)) {
        return;
    }

    var updated = removeItem(methods, idx);
    setMethods(updated);
}

function handleMethodNameChange(event, methods, setMethods) {
    var idx = parseInt(event.currentTarget.getAttribute('data-index'), 10);
    if (isNaN(idx)) {
        return;
    }

    var newName = event.target.value;
    var copy = duplicateList(methods);
    copy[idx].name = newName;
    setMethods(copy);
}

function addParam(event, methods, setMethods, newParams) {
    var idx = parseInt(event.currentTarget.getAttribute('data-index'), 10);
    if (isNaN(idx)) {
        return;
    }

    var copy = duplicateList(methods);
    var newValue = newParams[idx];
    if (!newValue || newValue.trim() === '') {
        return;
    }

    copy[idx].params = addItem(copy[idx].params, newValue.trim());
    setMethods(copy);
}

function removeParam(event, methods, setMethods) {
    var mIndex = parseInt(event.currentTarget.getAttribute('data-method'), 10);
    var pIndex = parseInt(event.currentTarget.getAttribute('data-param'), 10);
    if (isNaN(mIndex) || isNaN(pIndex)) {
        return;
    }

    var copy = duplicateList(methods);
    copy[mIndex].params = removeItem(copy[mIndex].params, pIndex);
    setMethods(copy);
}

function addTask(event, methods, setMethods, newTasks) {
    var idx = parseInt(event.currentTarget.getAttribute('data-index'), 10);
    if (isNaN(idx)) {
        return;
    }

    var copy = duplicateList(methods);
    var newValue = newTasks[idx];
    if (!newValue || newValue.trim() === '') {
        return;
    }

    copy[idx].tasks = addItem(copy[idx].tasks, newValue.trim());
    setMethods(copy);
}

function removeTask(event, methods, setMethods) {
    var mIndex = parseInt(event.currentTarget.getAttribute('data-method'), 10);
    var tIndex = parseInt(event.currentTarget.getAttribute('data-task'), 10);
    if (isNaN(mIndex) || isNaN(tIndex)) {
        return;
    }

    var copy = duplicateList(methods);
    copy[mIndex].tasks = removeItem(copy[mIndex].tasks, tIndex);
    setMethods(copy);
}

function handleReturnChange(event, methods, setMethods) {
    var idx = parseInt(event.currentTarget.getAttribute('data-index'), 10);
    if (isNaN(idx)) {
        return;
    }

    var newValue = event.target.value;
    var copy = duplicateList(methods);
    copy[idx].returnValue = newValue;
    setMethods(copy);
}

export {
    addMethod,
    removeMethod,
    handleMethodNameChange,
    addParam,
    removeParam,
    addTask,
    removeTask,
    handleReturnChange
};
