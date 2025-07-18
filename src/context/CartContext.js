import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Importa toast para notificaciones

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    // Inicializa el carrito desde localStorage para persistencia o un array vacío
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cartItems');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Error al parsear cartItems de localStorage", error);
            return [];
        }
    });

    // Guarda el carrito en localStorage cada vez que cambia
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);
            if (existingItem) {
                // Si el producto ya está en el carrito, incrementa la cantidad
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Si el producto no está, añádelo con cantidad 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === id);
            if (existingItem && existingItem.quantity > 1) {
                // Si hay más de una unidad, decrementa la cantidad
                return prevItems.map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
            } else {
                // Si solo hay una unidad, elimina el producto del carrito
                return prevItems.filter((item) => item.id !== id);
            }
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    // Calcula el total del carrito sumando (precio * cantidad) de cada ítem
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Calcula la cantidad total de ítems (no productos únicos) en el carrito
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                cartTotal,
                cartItemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Hook personalizado para consumir el contexto del carrito fácilmente
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};