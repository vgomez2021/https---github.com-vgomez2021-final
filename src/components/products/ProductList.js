import React from 'react';
import ProductCard from './ProductCard'; // Componente de tarjeta de producto
import styled from 'styled-components'; // Estilos CSS-in-JS

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Grilla responsiva */
  gap: 30px; /* Espacio entre las tarjetas */
  padding: 20px 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* Una columna en pantallas muy pequeñas */
    gap: 15px;
  }
`;

const NoProductsMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #777;
  padding: 50px;
`;

const ProductList = ({ products }) => {
    if (!products || products.length === 0) {
        return <NoProductsMessage>No hay productos disponibles que coincidan con tu búsqueda.</NoProductsMessage>;
    }

    return (
        // Las clases de Bootstrap (row, row-cols-*) ayudan a que la grilla sea responsiva automáticamente
        <ProductGrid className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </ProductGrid>
    );
};

export default ProductList;