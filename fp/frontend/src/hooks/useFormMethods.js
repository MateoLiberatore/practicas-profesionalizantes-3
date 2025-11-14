import { useState } from "react";
import { addItem, removeItem } from "../features/generator/controllers/ListController";
import {
  addMethod,
  handleMethodNameChange,
  handleReturnChange
} from "../features/generator/controllers/MethodsController";

export function useFormMethods() {
  const [methods, setMethods] = useState([]);
  const [newMethod, setNewMethod] = useState("");

  function handleAddMethod() {
    setMethods((prev) => addMethod(prev, newMethod));
    setNewMethod("");
  }

  function handleRemoveMethod(index) {
    setMethods((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }

function handleNameChange(event) {
  setMethods((prev) => handleMethodNameChange(event, prev));
}

function handleReturnChangeValue(event) {
  setMethods((prev) => handleReturnChange(event, prev));
}

  function addListItem(methodIndex, type, value) {
    if (type !== "params" && type !== "tasks") return;
    setMethods((prev) =>
      prev.map((method, i) => {
        if (i === methodIndex) {
          const currentList = method[type];
          const updatedList = addItem(currentList, value);
          return { ...method, [type]: updatedList };
        }
        return method;
      })
    );
  }

  function removeListItem(methodIndex, type, itemIndex) {
    if (type !== "params" && type !== "tasks") return;
    setMethods((prev) =>
      prev.map((method, i) => {
        if (i === methodIndex) {
          const currentList = method[type];
          const updatedList = removeItem(currentList, itemIndex);
          return { ...method, [type]: updatedList };
        }
        return method;
      })
    );
  }

  return {
    methods,
    setMethods,
    newMethod,
    setNewMethod,
    handleAddMethod,
    handleRemoveMethod,
    handleNameChange,
    handleReturnChangeValue,
    addListItem,
    removeListItem,
  };
}
