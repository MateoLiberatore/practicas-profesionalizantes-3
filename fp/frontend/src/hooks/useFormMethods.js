import { useState } from "react";
import { addItem, removeItem } from "../features/generator/controllers/ListController";
import {
    addMethod, handleMethodNameChange, handleReturnChange
} from "../features/generator/controllers/MethodsController";

export function useFormMethods() {
    const [methods, setMethods] = useState([]);
    const [newMethod, setNewMethod] = useState("");

    function handleAddMethod() {
        setMethods(addMethod(methods, newMethod));
        setNewMethod("");
    }

    function handleRemoveMethod(index) {
        if (index < 0 || index >= methods.length) return;
        
        const updatedMethods = methods.filter((_, i) => i !== index);
        setMethods(updatedMethods);
    }

    function handleNameChange(event) {
        setMethods(handleMethodNameChange(event, methods));
    }

    function handleReturnChangeValue(event) {
        setMethods(handleReturnChange(event, methods));
    }

    function addListItem(methodIndex, type, value) {
        if (type !== 'params' && type !== 'tasks') return;

        const updated = methods.map((method, i) => {
            if (i === methodIndex) {
                const currentList = method[type];
                const updatedList = addItem(currentList, value);
                return {
                    ...method,
                    [type]: updatedList
                };
            }
            return method;
        });
        setMethods(updated);
    }

    function removeListItem(methodIndex, type, itemIndex) {
        if (type !== 'params' && type !== 'tasks') return;

        const updated = methods.map((method, i) => {
            if (i === methodIndex) {
                const currentList = method[type];
                const updatedList = removeItem(currentList, itemIndex);
                return {
                    ...method,
                    [type]: updatedList
                };
            }
            return method;
        });
        setMethods(updated);
    }

    return {
        methods, setMethods,
        newMethod, setNewMethod,
        handleAddMethod, handleRemoveMethod,
        handleNameChange, handleReturnChangeValue,
        addListItem, removeListItem,
    };
}