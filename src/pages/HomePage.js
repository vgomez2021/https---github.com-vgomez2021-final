import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; // Para SEO y meta tags
import styled from 'styled-components'; // Estilos CSS-in-JS
import ProductList from '../components/products/ProductList'; // Lista de productos
import SearchBar from '../components/products/SearchBar'; // Barra de búsqueda
import Paginator from '../components/products/Paginator'; // Paginador
import LoadingSpinner from '../components/common/LoadingSpinner'; // Componente de carga
import ErrorMessage from '../components/common/ErrorMessage'; // Componente de error
import useProducts from '../hooks/useProducts'; // Custom hook para productos
import Slider from 'react-slick'; // Componente de carrusel de react-slick
import image1 from '../assets/slide1.jpg';
import image2 from '../assets/slide2.jpg';
import image3 from '../assets/slide3.jpg';
import image4 from '../assets/slide4.jpg';
import image5 from '../assets/slide5.jpg';
import image6 from '../assets/slide6.jpg';

const HomePageContainer = styled.div`
  padding: 20px 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 2.2rem;
  position: relative;
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background-color: #007bff; /* Línea decorativa bajo el título */
    margin: 10px auto 0;
  }
`;

const PRODUCTS_PER_PAGE = 8; // Define cuántos productos se mostrarán por página

// Contenedor centrado del carrusel
const CarouselWrapper = styled.div`
  margin-bottom: 40px; /* Espacio entre el carrusel y la colección */
  max-width: 1200px; /* Limita el ancho máximo */
  margin: 0 auto; /* Centrado automático */
  padding: 0 20px; /* Espaciado interno */
  display: flex;
  justify-content: center; /* Asegura que el contenido del carrusel esté centrado */
  align-items: center; /* Centra verticalmente */
`;

const SliderWrapper = styled.div`
  width: 100%;
  height: auto; /* Altura dinámica dependiendo del tamaño de la imagen */
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 60%; /* Ajusta el ancho de la imagen al 60% del contenedor */
  max-width: 900px; /* Limita el ancho máximo de la imagen */
  height: auto; /* Ajusta la altura proporcionalmente */
  object-fit: contain; /* Asegura que la imagen se ajuste sin recortarse */
  border-radius: 8px; /* Añadir bordes redondeados a las imágenes */
  display: block; /* Elimina el espacio adicional debajo de las imágenes */
  margin: 0 auto; /* Centra la imagen si tiene espacio vacío */
`;

const HomePage = () => {
    const { products, loading, error } = useProducts(); // Obtiene productos y estados
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const [filteredProducts, setFilteredProducts] = useState([]); // Productos después de aplicar el filtro

    useEffect(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const result = products.filter(
            (product) =>
                product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                product.category.toLowerCase().includes(lowerCaseSearchTerm)
        );
        setFilteredProducts(result);
        setCurrentPage(1); // Resetear a la primera página cada vez que el filtro cambia
    }, [searchTerm, products]); // Dependencias: se ejecuta cuando searchTerm o products cambian

    // Lógica de paginación
    const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll suave al inicio de la página al cambiar
    };

    // Configuración del carrusel
    const carouselSettings = {
        dots: true, // Muestra puntos de navegación
        infinite: true, // Carrusel infinito
        speed: 500, // Velocidad de transición
        slidesToShow: 1, // Número de imágenes que se muestran a la vez
        slidesToScroll: 1, // Número de imágenes que se desplazan a la vez
        autoplay: true, // Habilitar autoplay
        autoplaySpeed: 3000, // Intervalo de autoplay
        centerMode: true, // Centra la imagen activa
    };

    return (
        <HomePageContainer>
            <Helmet> {/* Componente para SEO y meta tags */}
                <title>Gioielli 2025 | Joyería Exclusiva Online</title>
                <meta name="description" content="Descubre nuestra colección de joyas únicas y elegantes en Gioielli 2025. Anillos, collares, pulseras y más." />
                <meta name="keywords" content="joyas, joyería, anillos, collares, pulseras, oro, plata, diamantes, tienda de joyas, comprar joyas" />
            </Helmet>

            <CarouselWrapper>
                <SliderWrapper>
                    <Slider {...carouselSettings}>
                        <div>
                            <Image src={image1} alt="Imagen 1" />
                        </div>
                        <div>
                            <Image src={image2} alt="Imagen 2" />
                        </div>
                        <div>
                            <Image src={image3} alt="Imagen 3" />
                        </div>
                        <div>
                            <Image src={image4} alt="Imagen 4" />
                        </div>
                        <div>
                            <Image src={image5} alt="Imagen 5" />
                        </div>
                        <div>
                            <Image src={image6} alt="Imagen 6" />
                        </div>
                    </Slider>
                </SliderWrapper>
            </CarouselWrapper>
<br></br>
            <SectionTitle>Nuestra Colección</SectionTitle>
            <SearchBar onSearch={setSearchTerm} /> {/* Pasa la función para actualizar el término de búsqueda */}

            {loading && <LoadingSpinner />} {/* Muestra spinner si está cargando */}
            {error && <ErrorMessage message={error} />} {/* Muestra error si hay problemas */}
            {!loading && !error && (
                <>
                    <ProductList products={currentProducts} /> {/* Muestra la lista de productos actuales */}
                    {filteredProducts.length > PRODUCTS_PER_PAGE && ( // Solo muestra el paginador si hay más productos que el límite por página
                        <Paginator
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </HomePageContainer>
    );
};

export default HomePage;
