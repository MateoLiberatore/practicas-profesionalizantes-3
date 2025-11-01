export function addMethod(methods, newMethodName) {
    if (!newMethodName || typeof newMethodName !== "string") {
        return methods;
    }
    const trimmed = newMethodName.trim();
    if (trimmed === "" || methods.some(m => m.name === trimmed)) {
        return methods;
    }
    const newMethod = {
        name: trimmed,
        params: [],
        tasks: [],
        returnValue: ""
    };
    return [...methods, newMethod];
}

export function removeMethod(event, methods) {
    const target = event.currentTarget.closest("[data-index]");
    if (!target) return methods;
    
    const index = parseInt(target.getAttribute("data-index"), 10);
    if (isNaN(index) || index < 0 || index >= methods.length) {
        return methods;
    }
    return methods.filter(function filterMethods(_, i) {
        return i !== index;
    });
}

export function handleMethodNameChange(event, methods) {
  
    const index = parseInt(event.target.getAttribute("data-index"), 10);
  const newName = event.target.value;

  if (isNaN(index)) return methods;
  return methods.map((m, i) =>
    i === index ? { ...m, name: newName } : m
  );
}

export function handleReturnChange(event, methods) {
    const index = parseInt(event.target.getAttribute("data-index"), 10);
    const newValue = event.target.value;

    if (isNaN(index)) return methods;
    
    const updated = methods.map(function updateReturn(m, i) {
        if (i === index) {
            return { ...m, returnValue: newValue };
        }
        return m;
    });
    return updated;
}