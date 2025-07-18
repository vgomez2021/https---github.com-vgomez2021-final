import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px; /* Para asegurar que el spinner sea visible */
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3; /* Color de fondo del spinner */
  border-top: 4px solid #3498db; /* Color del spinner (azul) */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite; /* Animación de giro */
`;

const LoadingSpinner = () => {
    return (
        <SpinnerContainer role="status" aria-live="polite" aria-label="Cargando contenido">
            <Spinner />
        </SpinnerContainer>
    );
};

export default LoadingSpinner;