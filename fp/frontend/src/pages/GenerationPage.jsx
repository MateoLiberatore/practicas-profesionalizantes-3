import React from "react";
import PromptingContainer from "../features/prompt/ClassBuilder" 
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom'; 
import ClassBuilder from "../features/prompt/ClassBuilder";

function GenerationPage() {
    // Asumimos que useAuth devuelve 'user' (o 'isAuthenticated')
    const { user } = useAuth(); 
    if (!user) { 
        // Redirigir a la ruta de inicio/login
        return <Navigate to="/" replace />; 
    }

    return (
        <div className="generation-page-wrapper">
            <ClassBuilder/>
        </div>
    )
}

export default GenerationPage;