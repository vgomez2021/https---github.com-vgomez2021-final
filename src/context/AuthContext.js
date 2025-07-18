import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Inicializa el estado de autenticación leyendo de localStorage
    // Esto permite que el usuario permanezca logueado al recargar la página
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error parsing user data from localStorage", error);
            return null;
        }
    });

    // Efecto para actualizar localStorage cada vez que isLoggedIn o user cambian
    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
        localStorage.setItem('user', JSON.stringify(user));
    }, [isLoggedIn, user]);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        // Limpia también el localStorage al desloguear
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para consumir el contexto de autenticación fácilmente
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};