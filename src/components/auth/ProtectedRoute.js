import React from 'react';
import { Navigate } from 'react-router-dom'; // Para redirigir
import { useAuth } from '../../context/AuthContext'; // Hook para el contexto de autenticación
import { toast } from 'react-toastify'; // Para notificaciones

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth(); // Obtiene el estado de autenticación

    if (!isLoggedIn) {
        // Si el usuario no está logueado, muestra una advertencia y redirige a la página de login
        toast.warn('Necesitas iniciar sesión para acceder a esta página.');
        return <Navigate to="/login" replace />; // 'replace' evita que el usuario regrese con el botón "atrás"
    }

    return children; // Si está logueado, renderiza los componentes hijos
};

export default ProtectedRoute;