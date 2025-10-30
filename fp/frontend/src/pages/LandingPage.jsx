import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import LoginContainer from "../features/authentication/LoginContainer";

function LandingPage() {
  const { user, isInitialized } = useAuth();

  if (!isInitialized) {
    return <div className="text-center text-primary-100 mt-10">Cargando...</div>;
  }

  if (user) return <Navigate to="/form" replace />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary-800">
      <LoginContainer />
    </div>
  );
}

export default LandingPage;
