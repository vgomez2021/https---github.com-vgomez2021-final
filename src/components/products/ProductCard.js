import React from 'react';
import styled from 'styled-components';
import { FaCartPlus } from 'react-icons/fa'; // Icono de añadir al carrito
import { Link } from 'react-router-dom'; // Para el enlace a la página de detalle
import { useCart } from '../../context/CartContext'; // Hook para el contexto del carrito
import { toast } from 'react-toastify'; // Notificaciones

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  background-color: white;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover; /* Ajusta la imagen para cubrir el área, cortando si es necesario */
  border-bottom: 1px solid #eee;
`;

const CardBody = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Permite que el cuerpo de la tarjeta ocupe el espacio restante */
`;

const ProductName = styled.h5`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #333;
  flex-grow: 1;
`;

const ProductPrice = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #007bff; /* Un color distintivo para el precio */
  margin-bottom: 10px;
`;

const CardActions = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailsLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const AddToCartButton = styled.button`
  background-color: #28a745; /* Color de éxito de Bootstrap */
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const ProductCard = ({ product }) => {
    const { addToCart } = useCart(); // Obtiene la función para añadir al carrito

    const handleAddToCart = () => {
        addToCart(product); // Añade el producto al carrito
        toast.success(`${product.name} añadido al carrito!`); // Muestra notificación
    };

    return (
        <Card className="col"> {/* Usa la clase 'col' de Bootstrap para el sistema de grillas */}
            <ProductImage src={product.imageUrl} alt={product.name} />
            <CardBody>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                <CardActions>
                    <DetailsLink to={`/product/${product.id}`} aria-label={`Ver detalles de ${product.name}`}>Ver Detalles</DetailsLink>
                    <AddToCartButton onClick={handleAddToCart} aria-label={`Añadir ${product.name} al carrito`}>
                        <FaCartPlus /> Añadir
                    </AddToCartButton>
                </CardActions>
            </CardBody>
        </Card>
    );
};

export default ProductCard;