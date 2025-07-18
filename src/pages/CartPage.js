import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async'; // Para SEO y meta tags
import styled from 'styled-components'; // Estilos CSS-in-JS
import { useCart } from '../context/CartContext'; // Hook para el contexto del carrito
import { Link } from 'react-router-dom'; // Para el enlace de "seguir comprando"
import { toast } from 'react-toastify'; // Notificaciones
import { FaTrashAlt, FaShoppingCart, FaArrowLeft, FaCheckCircle } from 'react-icons/fa'; // Iconos

// Estilos principales del componente
const CartPageContainer = styled.div`
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const PageTitle = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  font-size: 2.5rem;
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 50px;
  color: #777;
  font-size: 1.2rem;

  svg {
    font-size: 3rem;
    color: #ccc;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 20px;
  }
`;

const CartItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;

  th,
  td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #f8f8f8;
    font-weight: bold;
    color: #555;
  }

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
  }

  .item-name {
    font-weight: bold;
    color: #333;
  }

  .item-price, .item-quantity, .item-total {
    color: #666;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  button {
    background-color: #007bff;
    color: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 1.2rem;
    &:hover {
      background-color: #0056b3;
    }
  }
  span {
    font-weight: bold;
    font-size: 1.1rem;
    min-width: 25px;
    text-align: center;
  }
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #c82333;
  }
`;

const CartSummary = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  border-top: 1px solid #eee;
  padding-top: 20px;

  span:first-child {
    margin-right: 20px;
  }
`;

const CartActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  flex-wrap: wrap;
  gap: 20px;

  .btn {
    flex: 1 1 auto;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    .btn {
      max-width: 100%;
    }
  }
`;

// Estilos del Modal
const Modal = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ModalButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

const CartPage = () => {
  const { cartItems, removeFromCart, addToCart, clearCart, cartTotal } = useCart();
  const [showModal, setShowModal] = useState(false);

  const handleRemoveOne = (product) => {
    removeFromCart(product.id);
    toast.info(`Una unidad de "${product.name}" eliminada.`);
  };

  const handleAddOne = (product) => {
    addToCart(product);
    toast.info(`Una unidad más de "${product.name}" añadida.`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.warn('Tu carrito ha sido vaciado.');
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      toast.success('¡Compra realizada con éxito! Gracias por tu pedido.');
      clearCart();
      // Muestra un modal de confirmación (si deseas un feedback visual más grande)
      setShowModal(true);
    } else {
      toast.error('No hay productos en el carrito para realizar la compra.');
    }
  };

  return (
    <CartPageContainer>
      <Helmet>
        <title>Mi Carrito | Gioielli 2025</title>
        <meta name="description" content="Revisa los productos en tu carrito de compras de Gioielli 2025. Edita cantidades, elimina productos y finaliza tu compra." />
        <meta name="keywords" content="carrito de compras, joyas, comprar, resumen de compra, eliminar producto, checkout" />
      </Helmet>

      <PageTitle>Tu Carrito de Compras</PageTitle>

      {cartItems.length === 0 ? (
        <EmptyCartMessage>
          <FaShoppingCart />
          <p>Tu carrito está vacío. ¡Empieza a llenarlo con nuestras hermosas joyas!</p>
          <Link to="/" className="btn btn-primary">
            <FaArrowLeft /> Volver a la Tienda
          </Link>
        </EmptyCartMessage>
      ) : (
        <>
          <div className="table-responsive">
            <CartItemsTable className="table table-hover">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img src={item.imageUrl} alt={item.name} className="me-3" />
                        <span className="item-name">{item.name}</span>
                      </div>
                    </td>
                    <td className="item-price">${item.price.toFixed(2)}</td>
                    <td className="item-quantity">
                      <QuantityControls>
                        <button onClick={() => handleRemoveOne(item)} aria-label={`Quitar una unidad de ${item.name}`}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleAddOne(item)} aria-label={`Añadir una unidad de ${item.name}`}>+</button>
                      </QuantityControls>
                    </td>
                    <td className="item-total">${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <RemoveButton onClick={() => { removeFromCart(item.id); toast.error(`${item.name} eliminado del carrito.`); }} aria-label={`Eliminar todas las unidades de ${item.name}`}>
                        <FaTrashAlt />
                      </RemoveButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </CartItemsTable>
          </div>

          <CartSummary>
            <span>Total del Carrito:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </CartSummary>

          <CartActions>
            <Link to="/" className="btn btn-info">
              <FaArrowLeft /> Seguir Comprando
            </Link>
            <button onClick={handleClearCart} className="btn btn-warning">
              <FaTrashAlt /> Vaciar Carrito
            </button>
            <button onClick={handleCheckout} className="btn btn-success">
              <FaCheckCircle /> Finalizar Compra
            </button>
          </CartActions>
        </>
      )}

      {/* Modal de Confirmación de Compra */}
      <Modal show={showModal}>
        <ModalContent>
          <h2>¡Compra Realizada!</h2>
          <p>Gracias por tu compra. Pronto recibirás tu pedido.</p>
          <ModalButton onClick={() => setShowModal(false)}>Cerrar</ModalButton>
        </ModalContent>
      </Modal>
    </CartPageContainer>
  );
};

export default CartPage;
