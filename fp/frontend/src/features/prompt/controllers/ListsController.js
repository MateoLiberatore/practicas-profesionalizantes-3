/**
 * @file ListsController.js
 * @description Controlador genérico para manipular listas dentro de los formularios
 * del generador de clases. Contiene funciones puras y reutilizables.
 */

/* =====================================================
   FUNCIONES DE AGREGADO
   ===================================================== */

function addItem(list, newItem) {
    if (!Array.isArray(list)) {
        return [];
    }

    var trimmed = typeof newItem === 'string' ? newItem.trim() : newItem;
    if (trimmed === '' || trimmed === null || trimmed === undefined) {
        return list.slice();
    }

    var copy = list.slice();
    copy.push(trimmed);
    return copy;
}

/* =====================================================
   FUNCIONES DE REMOCIÓN
   ===================================================== */

function removeItem(list, index) {
    if (!Array.isArray(list)) {
        return [];
    }

    if (index < 0 || index >= list.length) {
        return list.slice();
    }

    var copy = list.slice();
    copy.splice(index, 1);
    return copy;
}

/* =====================================================
   FUNCIONES DE ACTUALIZACIÓN
   ===================================================== */

function updateItem(list, index, newValue) {
    if (!Array.isArray(list)) {
        return [];
    }

    if (index < 0 || index >= list.length) {
        return list.slice();
    }

    var copy = list.slice();
    copy[index] = newValue;
    return copy;
}

/* =====================================================
   FUNCIONES DE UTILIDAD
   ===================================================== */

function clearList() {
    return [];
}

function hasDuplicates(list) {
    if (!Array.isArray(list)) {
        return false;
    }

    var seen = {};
    var i;
    for (i = 0; i < list.length; i++) {
        if (seen[list[i]]) {
            return true;
        }
        seen[list[i]] = true;
    }
    return false;
}

function findItem(list, query) {
    if (!Array.isArray(list)) {
        return -1;
    }

    var i;
    for (i = 0; i < list.length; i++) {
        if (typeof list[i] === 'string' && typeof query === 'string') {
            if (list[i].toLowerCase() === query.toLowerCase()) {
                return i;
            }
        } else if (list[i] === query) {
            return i;
        }
    }

    return -1;
}

function toggleItem(list, item) {
    var index = findItem(list, item);
    if (index === -1) {
        return addItem(list, item);
    }
    return removeItem(list, index);
}

function duplicateList(list) {
    return JSON.parse(JSON.stringify(list));
}

/* =====================================================
   EXPORTACIÓN
   ===================================================== */

export {
    addItem,
    removeItem,
    updateItem,
    clearList,
    hasDuplicates,
    findItem,
    toggleItem,
    duplicateList
};
