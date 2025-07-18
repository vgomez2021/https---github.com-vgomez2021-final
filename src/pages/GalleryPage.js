import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

// Styled Components para la sección de la galería
const GalleryContainer = styled.div`
  padding: 60px 0;
  background-color: #f8f9fa; /* Un fondo suave para diferenciar la sección */
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 1200px; /* Limita el ancho del contenedor principal */
  margin: 30px auto; /* Centra el contenido y le da margen superior */
`;

const PageTitle = styled.h1`
  font-size: 3.2rem; /* Un poco más grande para el título de página */
  color: #333;
  margin-bottom: 50px;
  position: relative;
  padding-bottom: 15px;

  &::after {
    content: '';
    display: block;
    width: 120px;
    height: 5px;
    background-color: #007bff; /* Línea decorativa */
    margin: 20px auto 0;
    border-radius: 3px;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Columnas responsivas */
  gap: 30px;
  max-width: 1100px; /* Ancho máximo para la rejilla interna */
  margin: 0 auto;
  padding: 0 20px;
`;

const GalleryItem = styled.div`
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer; /* Indica que es interactuable */

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
  }

  img {
    width: 100%;
    height: 280px; /* Altura fija para las imágenes */
    object-fit: cover; /* Asegura que la imagen cubra el espacio sin distorsionarse */
    display: block;
    border-bottom: 1px solid #eee;
  }

  .item-info {
    padding: 20px;
    h4 {
      font-size: 1.4rem;
      color: #333;
      margin-bottom: 8px;
    }
    p {
      font-size: 1rem;
      color: #666;
      line-height: 1.5;
    }
  }
`;

const GalleryPage = () => {
  const featuredJewelryImages = [
    {
      src: 'https://m.media-amazon.com/images/I/514cyH6Y4EL._UF894,1000_QL80_.jpg',
      alt: 'Anillo de compromiso con diamante',
      title: 'Anillo "Eternidad"',
      description: 'Un símbolo de amor eterno, diseñado con maestría.',
    },
    {
      src: 'https://acdn-us.mitiendanube.com/stores/001/365/307/products/rbvawf1_m_capqxsaaet75idlom951_1200x1200-3253c7db241afa976d17210726540263-1024-1024.jpg',
      alt: 'Collar de oro con colgante de gema',
      title: 'Collar "Esencia Azul"',
      description: 'Elegancia que cautiva con un toque vibrante.',
    },
    {
      src: 'https://zonaonce.com.ar/wp-content/uploads/2025/04/IMG-20250410-WA0163.jpg',
      alt: 'Pulsera de plata con dijes',
      title: 'Pulsera "Encanto Personal"',
      description: 'Crea tu propia historia con cada dije.',
    },
    {
      src: 'https://http2.mlstatic.com/D_NQ_NP_617673-MLA79472795081_092024-O.webp',
      alt: 'Aretes de perlas clásicos',
      title: 'Aretes "Perla Clásica"',
      description: 'Sofisticación atemporal para cualquier ocasión.',
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZTf_NkGQOyPBs8FIujUFjYj2iD6TmXU7jhB2TmaYcYOFRpeOCxPOKWQdzu_Ud8MR6sY&usqp=CAU',
      alt: 'Anillo de oro blanco con zafiro',
      title: 'Anillo "Zafiro Real"',
      description: 'Lujo y distinción en una pieza única.',
    },
    {
      src: 'https://acdn-us.mitiendanube.com/stores/067/661/products/ililo1-fb8ca4d8bc02f4ed5115941756678656-1024-1024.jpg',
      alt: 'Collar de plata con diseño moderno',
      title: 'Collar "Minimal Chic"',
      description: 'Diseño contemporáneo para el día a día.',
    },
    {
      src: 'https://www.pedroluisolivaresjoyero.com/media/catalog/product/cache/55ad6519381e93cd8315fe465564ee1e/p/u/pulsera-oro.rosa-diamantes-2-quilates-joyeria--en-murcia.jpg',
      alt: 'Pulsera de oro rosa con diamantes',
      title: 'Pulsera "Destello Rosa"',
      description: 'Un toque de brillo sutil y sofisticado.',
    },
    {
      src: 'https://http2.mlstatic.com/D_NQ_NP_957718-MLA81956256961_012025-O.webp',
      alt: 'Pendientes de aro con incrustaciones',
      title: 'Aros "Glamour Urbano"',
      description: 'Perfectos para cualquier ocasión, de día o de noche.',
    },
    {
      src: 'https://i.etsystatic.com/26662213/r/il/ab3c9c/3127815418/il_570xN.3127815418_j46v.jpg',
      alt: 'Anillo con varias gemas de colores',
      title: 'Anillo "Arcoíris de Gemas"',
      description: 'Una explosión de color y alegría en tu mano.',
    },
    {
      src: 'https://i.pinimg.com/736x/55/a5/28/55a52883514cc21be7b79ec9943abc71.jpg',
      alt: 'Collar con dije de corazón y diamantes',
      title: 'Collar "Corazón Brillante"',
      description: 'El regalo ideal para expresar amor verdadero.',
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0667/8111/8710/files/My_Girl_Halo_2_480x480.jpg?v=1676361006',
      alt: 'Anillo de compromiso moderno',
      title: 'Anillo "Vanguardia"',
      description: 'Diseño audaz para mentes modernas.',
    },
    {
      src: 'https://png.pngtree.com/png-vector/20250325/ourlarge/pngtree-elegant-gold-pendant-necklace-with-blue-gem-centerpiece-png-image_15844747.png',
      alt: 'Collar elegante con piedra central',
      title: 'Collar "Realeza"',
      description: 'Una pieza que inspira majestuosidad.',
    },
  ];

  return (
    <GalleryContainer>
      <Helmet>
        <title>Galería de Joyas | Gioielli 2025</title>
        <meta name="description" content="Descubre nuestra exclusiva galería de joyas destacadas en Gioielli 2025. Anillos, collares, pulseras y pendientes de diseño único y alta calidad." />
        <meta name="keywords" content="galería de joyas, joyas destacadas, joyería exclusiva, anillos, collares, pulseras, pendientes, oro, plata, diamantes, gemas, Gioielli 2025" />
      </Helmet>

      <PageTitle>Nuestra Galería de Joyas</PageTitle>

      <GalleryGrid>
        {featuredJewelryImages.map((item, index) => (
          <GalleryItem key={index}>
            <img src={item.src} alt={item.alt} />
            <div className="item-info">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </GalleryItem>
        ))}
      </GalleryGrid>
    </GalleryContainer>
  );
};

export default GalleryPage;