import axios from 'axios';

const API_BASE_URL = 'https://6878340b31d28a460e1d705f.mockapi.io';

const mockApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = async () => {
    try {
        const response = await mockApi.get('/products');
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const response = await mockApi.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener producto con ID ${id}:`, error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await mockApi.post('/products', productData);
        return response.data;
    } catch (error) {
        console.error('Error al crear producto:', error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await mockApi.put(`/products/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar producto con ID ${id}:`, error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await mockApi.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar producto con ID ${id}:`, error);
        throw error;
    }
};

export default mockApi;