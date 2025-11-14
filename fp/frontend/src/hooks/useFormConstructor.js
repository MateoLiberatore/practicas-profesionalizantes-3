import { useState } from "react";
import { addItem, removeItem } from "../features/generator/controllers/ListController";

export function useFormConstructor() {
    const [className, setClassName] = useState("");
    const [params, setParams] = useState([]);
    const [properties, setProperties] = useState([]);

    function handleAddParam(param) {
        setParams(addItem(params, param));
    }

    function handleRemoveParam(index) {
        setParams(removeItem(params, index));
    }

    function handleAddProperty(prop) {
        setProperties(addItem(properties, prop));
    }

    function handleRemoveProperty(index) {
        setProperties(removeItem(properties, index));
    }

    return {
        className, setClassName,
        params, handleAddParam, handleRemoveParam,
        properties, handleAddProperty, handleRemoveProperty
    };
}