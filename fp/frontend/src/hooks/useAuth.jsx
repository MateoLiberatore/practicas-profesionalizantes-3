import { useState, createContext, useContext } from "react";
import { loginUser } from '../api/services/authService';

// Crear el contexto
const AuthContext = createContext(null); 

// Crear el Proveedor 
export function AuthProvider({ children }) { 
    const [user, setUser] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleLogin(email, password) {
        setIsLoading(true);
        setError(null);
        
        try {
            const userData = await loginUser(email, password);
            setUser(userData.user); 
            console.log("Inicio de sesión exitoso:", userData);
            
        } catch (err) {
            setError(err.message || 'Fallo de conexión. Por favor, revisa el servidor.');
            setUser(null); 
            
        } finally {
            setIsLoading(false);
        }
    }

    const value = { 
        handleLogin, 
        isLoading, 
        error, 
        user 
    }; 

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

//Hook Consumidor
export function useAuth() {
    const context = useContext(AuthContext); 
    
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
}