import React from 'react';
import styled from 'styled-components';
import { FaExclamationTriangle } from 'react-icons/fa'; // Icono de advertencia

const ErrorContainer = styled.div`
  background-color: #f8d7da; /* Color de fondo de alerta de Bootstrap danger */
  color: #721c24; /* Color de texto de alerta de Bootstrap danger */
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  padding: 15px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ErrorMessage = ({ message }) => {
  return (
    <ErrorContainer className="alert alert-danger" role="alert" aria-live="assertive">
      <FaExclamationTriangle size={20} />
      <span>{message || 'Ha ocurrido un error inesperado.'}</span> {/* Mensaje por defecto */}
    </ErrorContainer>
  );
};

export default ErrorMessage;