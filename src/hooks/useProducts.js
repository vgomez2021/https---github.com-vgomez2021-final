import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../api/mockApi'; // Función para obtener productos
import { toast } from 'react-toastify'; // Notificaciones

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado de error

    // useCallback para memorizar la función y evitar re-renderizados innecesarios
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null); // Resetea el error antes de cada intento
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            setError('Error al cargar los productos. Por favor, inténtalo de nuevo.');
            toast.error('Error al cargar los productos.'); // Notificación de error
            console.error(err); // Log del error para depuración
        } finally {
            setLoading(false); // Siempre finaliza el estado de carga
        }
    }, []); // Dependencias vacías: la función solo se crea una vez

    // useEffect para llamar a fetchProducts cuando el componente se monta
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]); // Dependencia: fetchProducts para que se ejecute al inicio

    // Retorna los estados y la función para recargar productos
    return { products, loading, error, refetchProducts: fetchProducts };
};

export default useProducts;