import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { GeneratorProvider } from "../context/GeneratorContext";
import ClassBuilder from "../features/generator/ClassBuilder";

function GenerationPage() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return (
        <GeneratorProvider>
            <div className="generation-page-wrapper">
                <ClassBuilder />
            </div>
        </GeneratorProvider>
    );
}

export default GenerationPage;
