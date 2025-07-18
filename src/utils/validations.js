// src/utils/validations.js
export const validateProduct = (product) => {
    const errors = {};

    if (!product.name || product.name.trim() === '') {
        errors.name = 'El nombre del producto es obligatorio.';
    }

    // Validar que el precio sea un número y mayor que 0
    if (isNaN(product.price) || parseFloat(product.price) <= 0) {
        errors.price = 'El precio debe ser un número mayor que 0.';
    }

    if (!product.description || product.description.trim().length < 10) {
        errors.description = 'La descripción debe tener al menos 10 caracteres.';
    }

    if (!product.imageUrl || product.imageUrl.trim() === '') {
        errors.imageUrl = 'La URL de la imagen es obligatoria.';
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/i.test(product.imageUrl)) {
        // Validación básica de formato de URL de imagen
        errors.imageUrl = 'La URL de la imagen no es válida.';
    }

    if (!product.category || product.category.trim() === '') {
        errors.category = 'La categoría es obligatoria.';
    }

    return errors;
};