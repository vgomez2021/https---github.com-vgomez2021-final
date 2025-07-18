import React from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Iconos de flecha

const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const PaginationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 8px; /* Espacio entre los botones de paginación */
`;

const PaginationItem = styled.li`
  /* Puedes añadir estilos específicos para el ítem de la lista aquí si es necesario,
     pero las clases de Bootstrap ya manejan la mayoría del diseño. */
`;

const PaginationButton = styled.button`
  background-color: ${(props) => (props.active ? '#007bff' : '#f8f9fa')}; /* Color primario / claro de Bootstrap */
  color: ${(props) => (props.active ? 'white' : '#007bff')}; /* Color de texto */
  border: 1px solid #dee2e6; /* Borde de Bootstrap */
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  min-width: 40px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? '#0056b3' : '#e9ecef')};
    color: ${(props) => (props.active ? 'white' : '#0056b3')};
  }

  &:disabled {
    background-color: #e9ecef;
    color: #6c757d; /* Color secundario de Bootstrap */
    cursor: not-allowed;
  }
`;

const Paginator = ({ totalPages, currentPage, onPageChange }) => {
    // Crea un array de números de página (ej. [1, 2, 3, ...])
    const pages = [...Array(totalPages).keys()].map((i) => i + 1);

    return (
        <PaginationContainer aria-label="Navegación de páginas de productos">
            <PaginationList className="pagination"> {/* Clases de paginación de Bootstrap */}
                <PaginationItem className="page-item">
                    <PaginationButton
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1} // Deshabilita si es la primera página
                        aria-label="Página anterior"
                    >
                        <FaChevronLeft />
                    </PaginationButton>
                </PaginationItem>

                {pages.map((page) => (
                    <PaginationItem key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <PaginationButton
                            className="page-link"
                            onClick={() => onPageChange(page)}
                            active={currentPage === page} // Activa el botón si es la página actual
                            aria-current={currentPage === page ? "page" : undefined} // Para accesibilidad
                            aria-label={`Ir a la página ${page}`}
                        >
                            {page}
                        </PaginationButton>
                    </PaginationItem>
                ))}

                <PaginationItem className="page-item">
                    <PaginationButton
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages} // Deshabilita si es la última página
                        aria-label="Página siguiente"
                    >
                        <FaChevronRight />
                    </PaginationButton>
                </PaginationItem>
            </PaginationList>
        </PaginationContainer>
    );
};

export default Paginator;