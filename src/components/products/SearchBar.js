import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa'; // Icono de búsqueda

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden; /* Para que el borde redondeado afecte al icono también */
`;

const SearchInput = styled.input`
  flex-grow: 1; /* Ocupa el espacio restante */
  padding: 12px 15px;
  border: none;
  font-size: 1rem;
  outline: none; /* Elimina el contorno al enfocar */

  &::placeholder {
    color: #999;
  }
`;

const SearchButton = styled.button`
  background-color: #007bff; /* Color primario de Bootstrap */
  color: white;
  border: none;
  padding: 12px 18px;
  cursor: pointer;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // Llama a la función de búsqueda del padre en tiempo real
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario
        onSearch(searchTerm); // Asegura que se dispare la búsqueda al presionar Enter o el botón
    };

    return (
        <form onSubmit={handleSubmit} role="search"> {/* Añade rol de búsqueda para accesibilidad */}
            <SearchContainer>
                <SearchInput
                    type="text"
                    placeholder="Buscar productos por nombre o categoría..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    aria-label="Barra de búsqueda de productos"
                />
                <SearchButton type="submit" aria-label="Buscar">
                    <FaSearch />
                </SearchButton>
            </SearchContainer>
        </form>
    );
};

export default SearchBar;