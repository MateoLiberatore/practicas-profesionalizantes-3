import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import LoginContainer from "../features/authentication/LoginContainer";
import Card from "../components/elements/Card";
import Socials from "../components/elements/Socials"; 

function LandingPage() {
  const { user, isInitialized } = useAuth();

  const githubLinks = {
    backend: "https://github.com/MateoLiberatore/practicas-profesionalizantes-3/tree/main/fp/backend", 
    frontend: "https://github.com/MateoLiberatore/practicas-profesionalizantes-3/tree/main/fp/frontend", 
  };

  if (!isInitialized) {
    return <div className="text-center text-primary-300 mt-10">Cargando...</div>;
  }

  if (user) {
    return <Navigate to="/form" replace />;
  }

  return (
    
    <div className="flex items-center min-h-screen  bg-secondary-800">
     
        <LoginContainer /> 
  
        <div className="w-1/2 ml-30 ">
          
          <div className="grid grid-cols-3 gap-8">
            <Card 
              title="Documentación API" 
              link="/docs" 
              className=""
              description="Explora todos los endpoints, métodos, parámetros y respuestas de nuestra API REST." 
            />
            <Card 
              title="GitHub BackEnd" 
              link={githubLinks.backend} 
              className=""
              description="Accede al código fuente del servidor (Flask/Python) y modelos de IA." 
            />
            <Card 
              title="GitHub FrontEnd" 
              link={githubLinks.frontend} 
              className=""
              description="Explora el código de la interfaz de usuario (React/Tailwind CSS)." 
            />
          </div>

          <div className="mt-8 w-full mx-auto">
            <Socials />
          </div>
        </div>
    
    </div>
  );
}

export default LandingPage;