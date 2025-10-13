import React from 'react';
import LandingView from '../features/authentication/LoginView'; 
import { useAuth } from '../hooks/useAuth';
import Login from '../features/authentication/LoginContainer';
import { Navigate } from 'react-router-dom';


function LandingPage() {

    const { handleLogin, isLoading, error, user } = useAuth();
    
    if (user) { 
        return <Navigate to="/form" replace />; 
    }
    
    const LoginController = (
        <Login 
            onSubmit={handleLogin}
            isLoading={isLoading} 
            apiError={error} 
        />
    );

    return (
        <LandingView 
           LoginComponent={LoginController} 
        />
    );
}

export default LandingPage;