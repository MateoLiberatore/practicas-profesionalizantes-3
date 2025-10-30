import React, { createContext, useContext, useState } from "react";

/**
 * @context GeneratorContext
 * @description Almacena y comparte el estado global del generador.
 */
const GeneratorContext = createContext();

export function GeneratorProvider({ children }) {
    const [headers, setHeaders] = useState({});
    const [constructor, setConstructor] = useState({});
    const [methods, setMethods] = useState([]);

    const value = { headers, setHeaders, constructor, setConstructor, methods, setMethods };

    return (
        <GeneratorContext.Provider value={value}>
            {children}
        </GeneratorContext.Provider>
    );
}

export function useGenerator() {
    return useContext(GeneratorContext);
}
    