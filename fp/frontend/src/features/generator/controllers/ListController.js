export function addItem(list, newItem) {
    if (!newItem || typeof newItem !== "string") {
        return list;
    }
    const trimmed = newItem.trim();
    if (trimmed === "" || list.includes(trimmed)) {
        return list;
    }
    return [...list, trimmed];
}

export function removeItem(list, index) {
    if (!Array.isArray(list) || index < 0 || index >= list.length) {
        return list;
    }
    return list.filter(function filterItem(_, i) {
        return i !== index;
    });
}