

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

import useProducts from '../hooks/useProducts';
import { deleteProduct } from '../api/mockApi';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

Modal.setAppElement('#root');

const AdminContainer = styled.div`
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

const AddProductButton = styled(Link)`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
    color: white;
  }
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;

  th,
  td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
    color: #555;
  }

  td {
    color: #666;
    vertical-align: middle;
  }

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
`;

const ActionsCell = styled.td`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: ${(props) => props.color || '#333'};
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.hoverColor || '#007bff'};
  }
`;

const StyledModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;

  h3 {
    margin-bottom: 20px;
    color: #dc3545;
  }

  p {
    margin-bottom: 30px;
    color: #555;
  }

  div {
    display: flex;
    justify-content: center;
    gap: 15px;
  }

  button {
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }
`;

const ConfirmDeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  &:hover {
    background-color: #c82333;
  }
`;

const CancelDeleteButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  &:hover {
    background-color: #5a6268;
  }
`;

const AdminPage = () => {
  const { products, loading, error, refetchProducts } = useProducts();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete.id);
        toast.success(`Producto "${productToDelete.name}" eliminado con éxito.`);
        refetchProducts();
      } catch (err) {
        toast.error('Error al eliminar el producto.');
        console.error('Error deleting product:', err);
      } finally {
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <AdminContainer>
      <Helmet>
        <title>Administración de Productos | Gioielli 2025</title>
        <meta name="description" content="Panel de administración para gestionar productos de joyería en Gioielli 2025: agregar, editar y eliminar." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <TitleBar>
        <h2>Gestión de Productos</h2>
        <AddProductButton to="/admin/edit/new" aria-label="Agregar nuevo producto">
          <FaPlusCircle /> Nuevo Producto
        </AddProductButton>
      </TitleBar>

      {products.length === 0 ? (
        <p className="text-center">No hay productos para mostrar. ¡Agrega uno!</p>
      ) : (
        <div className="table-responsive">
          <ProductTable className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <img src={product.imageUrl} alt={product.name} />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <ActionsCell>
                    <Link to={`/admin/edit/${product.id}`} aria-label={`Editar ${product.name}`}>
                      <ActionButton color="#007bff" hoverColor="#0056b3">
                        <FaEdit />
                      </ActionButton>
                    </Link>
                    <ActionButton
                      onClick={() => handleDeleteClick(product)}
                      color="#dc3545"
                      hoverColor="#c82333"
                      aria-label={`Eliminar ${product.name}`}
                    >
                      <FaTrashAlt />
                    </ActionButton>
                  </ActionsCell>
                </tr>
              ))}
            </tbody>
          </ProductTable>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        contentLabel="Confirmar Eliminación"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '0',
            border: 'none',
            borderRadius: '8px',
            background: 'none',
          },
        }}
      >
        <StyledModalContent>
          <h3>Confirmar Eliminación</h3>
          <p>
            ¿Estás seguro de que quieres eliminar el producto "
            <strong>{productToDelete?.name}</strong>"? Esta acción no se puede
            deshacer.
          </p>
          <div>
            <CancelDeleteButton onClick={() => setIsDeleteModalOpen(false)}>
              Cancelar
            </CancelDeleteButton>
            <ConfirmDeleteButton onClick={confirmDelete}>
              Eliminar
            </ConfirmDeleteButton>
          </div>
        </StyledModalContent>
      </Modal>
    </AdminContainer>
  );
};

export default AdminPage;