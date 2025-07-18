import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Hooks de React Router
import { Helmet } from 'react-helmet-async'; // Para SEO y meta tags
import styled from 'styled-components'; // Estilos CSS-in-JS
import { getProductById } from '../api/mockApi'; // Función para obtener un producto por ID
import LoadingSpinner from '../components/common/LoadingSpinner'; // Componente de carga
import ErrorMessage from '../components/common/ErrorMessage'; // Componente de error
import { useCart } from '../context/CartContext'; // Hook para el contexto del carrito
import { toast } from 'react-toastify'; // Notificaciones
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa'; // Iconos

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (min-width: 992px) {
    flex-direction: row; /* Diseño de fila en pantallas grandes */
    align-items: flex-start;
    gap: 50px;
  }
`;

const ProductImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  @media (min-width: 992px) {
    margin-bottom: 0;
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  object-fit: contain; /* Ajusta la imagen dentro de su contenedor sin recortar */
  max-height: 400px;
`;

const ProductInfo = styled.div`
  flex: 1.5; /* Ocupa más espacio que la imagen */
  text-align: center;

  @media (min-width: 992px) {
    text-align: left;
  }
`;

const ProductName = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 15px;
`;

const ProductPrice = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #007bff; /* Color distintivo para el precio */
  margin-bottom: 20px;
`;

const ProductDescription = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 300px;
  margin: 0 auto; /* Centra los botones en pantallas pequeñas */

  @media (min-width: 992px) {
    flex-direction: row; /* Botones en fila en pantallas grandes */
    margin: 0;
    max-width: none;
    justify-content: flex-start;
  }
`;

const AddToCartButton = styled.button`
  background-color: #28a745; /* Color de éxito de Bootstrap */
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const BackButton = styled(Link)`
  background-color: #6c757d; /* Color secundario de Bootstrap */
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a6268;
  }
`;

const ProductDetailPage = () => {
    const { id } = useParams(); // Obtiene el ID del producto de la URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart(); // Función para añadir al carrito

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(id); // Llama a la API para obtener el producto
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError('No se pudo cargar el producto. Inténtalo de nuevo más tarde.');
                toast.error('Error al cargar el producto.');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]); // Se ejecuta cuando el ID en la URL cambia

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            toast.success(`${product.name} ha sido añadido al carrito.`);
        }
    };

    if (loading) {
        return <LoadingSpinner />; // Muestra spinner mientras carga
    }

    if (error) {
        return <ErrorMessage message={error} />; // Muestra error si falla la carga
    }

    if (!product) {
        return <ErrorMessage message="Producto no encontrado." />; // Si no hay producto después de cargar
    }

    return (
        <DetailContainer className="row align-items-center"> {/* Utiliza clases de Bootstrap para el layout */}
            <Helmet>
                <title>{product.name} | Gioielli 2025</title>
                <meta name="description" content={`Detalles del producto: ${product.name}. ${product.description}`} />
                <meta name="keywords" content={`${product.name}, ${product.category}, joyería, comprar joyas, producto`} />
            </Helmet>

            <div className="col-lg-6"> {/* Columna para la imagen */}
                <ProductImageContainer>
                    <ProductImage src={product.imageUrl} alt={product.name} />
                </ProductImageContainer>
            </div>
            <div className="col-lg-6"> {/* Columna para la información del producto */}
                <ProductInfo>
                    <ProductName>{product.name}</ProductName>
                    <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                    <ProductDescription>{product.description}</ProductDescription>
                    <ButtonGroup>
                        <AddToCartButton onClick={handleAddToCart} aria-label={`Añadir ${product.name} al carrito`}>
                            <FaShoppingCart /> Añadir al Carrito
                        </AddToCartButton>
                        <BackButton to="/" aria-label="Volver al catálogo de productos">
                            <FaArrowLeft /> Volver al Catálogo
                        </BackButton>
                    </ButtonGroup>
                </ProductInfo>
            </div>
        </DetailContainer>
    );
};

export default ProductDetailPage;