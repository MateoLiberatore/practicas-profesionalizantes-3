import { useState } from "react";
import { addItem, removeItem } from "../features/generator/controllers/ListController";

export function useFormHeaders() {
    const [language, setLanguage] = useState("");
    const [imports, setImports] = useState([]);
    const [specs, setSpecs] = useState([]);

    function handleAddImport(item) {
        setImports(addItem(imports, item));
    }

    function handleRemoveImport(index) {
        setImports(removeItem(imports, index));
    }

    function handleAddSpec(item) {
        setSpecs(addItem(specs, item));
    }

    function handleRemoveSpec(index) {
        setSpecs(removeItem(specs, index));
    }

    return {
        language, setLanguage,
        imports, handleAddImport, handleRemoveImport,
        specs, handleAddSpec, handleRemoveSpec
    };
}