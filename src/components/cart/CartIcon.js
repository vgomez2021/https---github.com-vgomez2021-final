import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Icono del carrito
import styled from 'styled-components';
import { useCart } from '../../context/CartContext'; // Hook para el contexto del carrito
import CartModal from './CartModal'; // Importa el modal del carrito

const CartIconContainer = styled.div`
  position: relative;
  cursor: pointer;
  color: #fff; /* Color del icono */
  font-size: 1.8rem;
  margin-left: 20px;
  display: flex;
  align-items: center;

  &:hover {
    color: #eee;
  }
`;

const CartCountBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ffc107; /* Color de badge de Bootstrap warning */
  color: #333;
  border-radius: 50%;
  padding: 2px 7px;
  font-size: 0.75rem;
  font-weight: bold;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
`;

const CartIcon = () => {
    const { cartItemCount } = useCart(); // Obtiene el número total de ítems en el carrito
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para controlar la visibilidad del modal

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <CartIconContainer onClick={openModal} aria-label={`Carrito de compras con ${cartItemCount} productos`}>
                <FaShoppingCart />
                {cartItemCount > 0 && <CartCountBadge>{cartItemCount}</CartCountBadge>} {/* Muestra el contador si hay ítems */}
            </CartIconContainer>
            <CartModal isOpen={modalIsOpen} onRequestClose={closeModal} /> {/* Renderiza el modal */}
        </>
    );
};

export default CartIcon;