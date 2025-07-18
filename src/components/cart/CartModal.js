import React from 'react';
import Modal from 'react-modal'; // Componente de modal
import { useCart } from '../../context/CartContext'; // Hook para el contexto del carrito
import { FaTrashAlt, FaTimes } from 'react-icons/fa'; // Iconos
import styled from 'styled-components'; // Estilos CSS-in-JS
import { toast } from 'react-toastify'; // Notificaciones

Modal.setAppElement('#root'); // Importante: Asocia el modal al elemento root para accesibilidad

const StyledModalContent = styled.div`
  padding: 20px;
  border-radius: 8px;
  background: white;
  max-width: 500px;
  margin: 0 auto; /* Centra el modal */
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  h2 {
    margin: 0;
    color: #333;
  }
  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #888;
    &:hover {
      color: #333;
    }
  }
`;

const CartItemsContainer = styled.div`
  max-height: 400px; /* Altura máxima para scroll */
  overflow-y: auto; /* Permite scroll si hay muchos ítems */
  margin-bottom: 20px;
  border-top: 1px solid #eee;
  padding-top: 10px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none; /* No hay borde en el último ítem */
  }
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
  }
  .item-info {
    flex-grow: 1; /* Ocupa el espacio restante */
    h5 {
      margin: 0 0 5px 0;
      font-size: 1rem;
      color: #333;
    }
    p {
      margin: 0;
      font-size: 0.9rem;
      color: #666;
    }
  }
  button {
    background-color: #dc3545; /* Color de peligro de Bootstrap */
    color: white;
    border: none;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    &:hover {
      background-color: #c82333;
    }
  }
`;

const CartSummary = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;

const EmptyCartMessage = styled.p`
  text-align: center;
  color: #777;
  padding: 30px;
`;

const CartModal = ({ isOpen, onRequestClose }) => {
  const { cartItems, removeFromCart, cartTotal, clearCart } = useCart();

  const handleFinishPurchase = () => {
    // Muestra una confirmación de compra
    const confirmPurchase = window.confirm("¿Estás seguro de que quieres finalizar la compra?");
    if (confirmPurchase) {
      toast.success('¡Compra realizada con éxito!');
      clearCart();
      onRequestClose(); // Cierra el modal
    } else {
      toast.info('Compra cancelada');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Carrito de Compras"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)', // Fondo oscuro semitransparente
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
          background: 'none', // StyledModalContent manejará el fondo blanco
        },
      }}
    >
      <StyledModalContent>
        <ModalHeader>
          <h2>Tu Carrito</h2>
          <button onClick={onRequestClose} aria-label="Cerrar carrito">
            <FaTimes />
          </button>
        </ModalHeader>

        {cartItems.length === 0 ? (
          <EmptyCartMessage>Tu carrito está vacío.</EmptyCartMessage>
        ) : (
          <>
            <CartItemsContainer>
              {cartItems.map((item) => (
                <CartItem key={item.id}>
                  <img src={item.imageUrl} alt={item.name} />
                  <div className="item-info">
                    <h5>{item.name}</h5>
                    <p>
                      {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)} // Elimina un producto por su ID
                    aria-label={`Eliminar ${item.name} del carrito`}
                  >
                    <FaTrashAlt />
                  </button>
                </CartItem>
              ))}
            </CartItemsContainer>
            <CartSummary>
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </CartSummary>
            <button
              onClick={() => {
                clearCart(); // Vacía completamente el carrito
                toast.info('Carrito vaciado.');
                onRequestClose(); // Cierra el modal
              }}
              className="btn btn-warning mt-3 w-100" // Clases de Bootstrap
            >
              Vaciar Carrito
            </button>
            <button
              onClick={handleFinishPurchase}
              className="btn btn-success mt-2 w-100"
            >
              Finalizar Compra
            </button>
          </>
        )}
      </StyledModalContent>
    </Modal>
  );
};

export default CartModal;
