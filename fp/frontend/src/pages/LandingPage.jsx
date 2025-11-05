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
    return <div className="text-center text-primary-300 mt-10">Loading...</div>;
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
              title="API Docs" 
              link="/docs" 
              className=""
              description="Explore all endpoints, methods, parameters, and responses of the REST API." 
            />
            <Card 
              title="BackEnd - GitHub" 
              link={githubLinks.backend} 
              className=""
              description="Access the source code for the server (Flask/Python) and AI models." 
            />
            <Card 
              title="FrontEnd - GitHub" 
              link={githubLinks.frontend} 
              className=""
              description="Explore the code for the user interface (React/Tailwind CSS)." 
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