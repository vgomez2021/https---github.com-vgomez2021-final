import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Hooks de React Router
import styled from 'styled-components'; // Estilos CSS-in-JS
import { toast } from 'react-toastify'; // Notificaciones
import { validateProduct } from '../../utils/validations'; // Función de validación
import { createProduct, getProductById, updateProduct } from '../../api/mockApi'; // Funciones de la API
import LoadingSpinner from '../common/LoadingSpinner'; // Componente de carga
import ErrorMessage from '../common/ErrorMessage'; // Componente de error
import { FaSave, FaTimes } from 'react-icons/fa'; // Iconos

const FormContainer = styled.div`
  max-width: 700px;
  margin: 30px auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    outline: none;
  }
`;

const ErrorText = styled.p`
  color: #dc3545; /* Color de peligro de Bootstrap */
  font-size: 0.85rem;
  margin-top: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
`;

const SubmitButton = styled.button`
  background-color: #28a745; /* Color de éxito de Bootstrap */
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background-color: #218838;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background-color: #6c757d; /* Color secundario de Bootstrap */
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background-color: #5a6268;
  }
`;

const ProductForm = ({ onProductSaved }) => {
    const { id } = useParams(); // Obtiene el ID del producto si estamos en modo edición
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        imageUrl: '',
        category: '',
    });
    const [errors, setErrors] = useState({}); // Estado para errores de validación
    const [isLoading, setIsLoading] = useState(false); // Estado de carga
    const [fetchError, setFetchError] = useState(null); // Estado para errores de API

    useEffect(() => {
        if (id) {
            // Si hay un ID, estamos en modo edición: cargar datos del producto
            setIsLoading(true);
            getProductById(id)
                .then((data) => {
                    setProduct(data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setFetchError('Error al cargar el producto para edición.');
                    toast.error('Error al cargar el producto.');
                    setIsLoading(false);
                });
        }
    }, [id]); // Se ejecuta cuando el ID en la URL cambia

    useEffect(() => {
    if (id && id !== "new") {
        setIsLoading(true);
        getProductById(id)
            .then((data) => {
                setProduct(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setFetchError('Error al cargar el producto para edición.');
                toast.error('Error al cargar el producto.');
                setIsLoading(false);
            });
    }
}, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: name === 'price' ? parseFloat(value) || '' : value, // Convierte el precio a número
        }));
        // Limpiar el error cuando el usuario empieza a escribir en el campo
        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: null,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateProduct(product); // Valida el formulario
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors); // Establece los errores
            toast.error('Por favor, corrige los errores en el formulario.');
            return;
        }

        setIsLoading(true);
        setFetchError(null);

        try {
            if (id) {
                // Si hay un ID, actualiza el producto existente
                await updateProduct(id, product);
                toast.success('Producto actualizado con éxito!');
            } else {
                // Si no hay ID, crea un nuevo producto
                await createProduct(product);
                toast.success('Producto agregado con éxito!');
                setProduct({ name: '', price: '', description: '', imageUrl: '', category: '' }); // Limpia el formulario
            }
            onProductSaved && onProductSaved(); // Llama a la función de callback para actualizar la lista en AdminPage
            navigate('/admin'); // Redirige de vuelta a la lista de administración
        } catch (error) {
            setFetchError(`Error al ${id ? 'actualizar' : 'crear'} el producto. Inténtalo de nuevo.`);
            toast.error(`Error al ${id ? 'actualizar' : 'crear'} el producto.`);
        } finally {
            setIsLoading(false);
        }
    };

    // Muestra spinner o error si hay problemas al cargar el producto para edición
    if (isLoading && id && !fetchError) return <LoadingSpinner />;
    if (fetchError) return <ErrorMessage message={fetchError} />;

    return (
        <FormContainer>
            <Title>{id ? 'Editar Producto' : 'Agregar Nuevo Producto'}</Title>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="name">Nombre del Producto:</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Ej: Anillo de Zafiro"
                        required
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "name-error" : null}
                    />
                    {errors.name && <ErrorText id="name-error">{errors.name}</ErrorText>}
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="price">Precio:</Label>
                    <Input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Ej: 299.99"
                        step="0.01" // Permite decimales para el precio
                        min="0" // Precio no puede ser negativo
                        required
                        aria-invalid={errors.price ? "true" : "false"}
                        aria-describedby={errors.price ? "price-error" : null}
                    />
                    {errors.price && <ErrorText id="price-error">{errors.price}</ErrorText>}
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="description">Descripción:</Label>
                    <TextArea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Una breve descripción de 10 caracteres mínimo..."
                        rows="4"
                        required
                        aria-invalid={errors.description ? "true" : "false"}
                        aria-describedby={errors.description ? "description-error" : null}
                    ></TextArea>
                    {errors.description && <ErrorText id="description-error">{errors.description}</ErrorText>}
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="imageUrl">URL de la Imagen:</Label>
                    <Input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={product.imageUrl}
                        onChange={handleChange}
                        placeholder="Ej: https://ejemplo.com/imagen.jpg"
                        required
                        aria-invalid={errors.imageUrl ? "true" : "false"}
                        aria-describedby={errors.imageUrl ? "imageUrl-error" : null}
                    />
                    {errors.imageUrl && <ErrorText id="imageUrl-error">{errors.imageUrl}</ErrorText>}
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="category">Categoría:</Label>
                    <Select
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                        aria-invalid={errors.category ? "true" : "false"}
                        aria-describedby={errors.category ? "category-error" : null}
                    >
                        <option value="">Selecciona una categoría</option>
                        <option value="anillos">Anillos</option>
                        <option value="collares">Collares</option>
                        <option value="pulseras">Pulseras</option>
                        <option value="pendientes">Pendientes</option>
                        <option value="sets">Sets de Joyas</option>
                        <option value="otros">Otros</option>
                    </Select>
                    {errors.category && <ErrorText id="category-error">{errors.category}</ErrorText>}
                </FormGroup>

                <ButtonGroup>
                    <CancelButton type="button" onClick={() => navigate('/admin')}>
                        <FaTimes /> Cancelar
                    </CancelButton>
                    <SubmitButton type="submit" disabled={isLoading}>
                        {isLoading ? <LoadingSpinner /> : (id ? <><FaSave /> Actualizar</> : <><FaSave /> Agregar</>)}
                    </SubmitButton>
                </ButtonGroup>
            </form>
        </FormContainer>
    );
};

export default ProductForm;