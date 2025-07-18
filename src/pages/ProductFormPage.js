import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaArrowLeft } from 'react-icons/fa';
import styled from 'styled-components';
import ProductForm from '../components/products/ProductForm';

const PageContainer = styled.div`
  padding: 20px 0;
`;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  h2 {
    color: #333;
    font-size: 2.2rem;
  }
`;

const BackButton = styled.button`
  background-color: #6c757d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

const ProductFormPage = () => {
    const { id } = useParams(); // Obtener el ID del producto desde la URL
    const navigate = useNavigate();

    const isNewProduct = id === 'new';
    const productId = isNewProduct ? null : id;

    const handleProductSaved = () => {
        // Redirigir de vuelta a la página de administración después de guardar
        navigate('/admin');
    };

    const handleBackToList = () => {
        navigate('/admin');
    };

    return (
        <PageContainer>
            <Helmet>
                <title>
                    {isNewProduct ? 'Nuevo Producto' : 'Editar Producto'} | Gioielli 2025
                </title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <TitleBar>
                <h2>{isNewProduct ? 'Nuevo Producto' : 'Editar Producto'}</h2>
                <BackButton onClick={handleBackToList} aria-label="Volver a la lista">
                    <FaArrowLeft /> Volver a la Lista
                </BackButton>
            </TitleBar>

            <ProductForm
                productId={productId}
                onProductSaved={handleProductSaved}
            />
        </PageContainer>
    );
};

export default ProductFormPage;