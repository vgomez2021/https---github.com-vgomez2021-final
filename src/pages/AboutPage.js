import React from 'react';
import { Helmet } from 'react-helmet-async'; // Para SEO y meta tags
import styled from 'styled-components'; // Estilos CSS-in-JS
import { FaGem, FaHeart, FaAward, FaStar } from 'react-icons/fa';

const AboutContainer = styled.div`
  padding: 40px 0;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 900px;
  margin: 30px auto; /* Centra el contenido y le da margen superior */
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  font-size: 2.8rem;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: #007bff; /* Línea decorativa */
    margin: 15px auto 0;
    border-radius: 2px;
  }
`;

const Section = styled.section`
  margin-bottom: 50px;
  text-align: center;
  padding: 0 20px;

  @media (min-width: 768px) {
    text-align: left; /* Alinea a la izquierda en pantallas más grandes */
  }
`;

const SectionHeader = styled.h3`
  font-size: 2rem;
  color: #007bff; /* Color principal para los títulos de sección */
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center; /* Centra el icono y texto en pantallas pequeñas */

  @media (min-width: 768px) {
    justify-content: flex-start; /* Alinea a la izquierda en pantallas más grandes */
  }

  svg {
    margin-right: 15px;
    font-size: 2.5rem;
    color: #ffc107; /* Un color de acento para los iconos */
  }
`;

const SectionParagraph = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.8;
  max-width: 700px; /* Limita el ancho del texto para mejor legibilidad */
  margin: 0 auto; /* Centra el texto */

  @media (min-width: 768px) {
    margin-left: 0; /* Deshace el centrado en pantallas grandes */
  }
`;

const HighlightText = styled.span`
  color: #28a745; /* Color de éxito de Bootstrap */
  font-weight: bold;
`;

const ReviewsSection = styled(Section)`
  background-color: #f8f9fa; /* Un fondo ligeramente diferente para destacar */
  padding: 30px 20px;
  border-radius: 8px;
  margin-top: 60px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  margin-top: 30px;
`;

const ReviewCard = styled.div`
  background-color: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 25px;
  max-width: 400px;
  text-align: left;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  p {
    font-style: italic;
    color: #495057;
    margin-bottom: 15px;
    line-height: 1.6;
  }

  strong {
    color: #007bff;
    font-weight: 600;
  }
`;

const Stars = styled.div`
  color: #ffc107; /* Color de las estrellas */
  margin-bottom: 10px;
  font-size: 1.1rem;

  svg {
    margin-right: 2px;
  }
`;

const AboutPage = () => {
    const reviews = [
        {
            text: "Compré un anillo de compromiso en Gioielli y superó todas mis expectativas. La calidad es impecable y el diseño transmite elegancia en cada detalle. Mi pareja quedó encantada.",
            author: "Cliente Satisfecho",
            stars: 5,
        },
        {
            text: "La atención personalizada que recibí fue maravillosa. Me ayudaron a elegir la joya perfecta para un regalo muy especial. ¡Definitivamente volveré a comprar!",
            author: "María G.",
            stars: 5,
        },
        {
            text: "Tuve un problema con mi pedido y el equipo de atención al cliente lo resolvió de manera rápida y eficiente. ¡Excelente servicio!",
            author: "Pedro L.",
            stars: 4,
        },
        {
            text: "La entrega fue súper rápida. ¡Estoy muy satisfecha con la compra!",
            author: "Ana R.",
            stars: 5,
        },
        {
            text: "La página web es muy fácil de usar y la información del producto es clara y concisa.",
            author: "Juan M.",
            stars: 4,
        },
        {
            text: "El proceso de compra fue muy sencillo y seguro.",
            author: "Sofía P.",
            stars: 5,
        },
        {
            text: "La presentación del producto, el empaque y la rapidez del envío me sorprendieron. Una experiencia de compra de lujo, desde la web hasta el momento de abrir la caja.",
            author: "Lucía C.",
            stars: 5,
        },
        {
            text: "Tenía dudas sobre qué elegir y el equipo de Gioielli me asesoró con una calidez increíble. El resultado fue una joya hermosa que atesoraré por años.",
            author: "Carlos V.",
            stars: 5,
        },
    ];
    return (
        <AboutContainer>
            <Helmet>
                <title>Sobre Nosotros | Gioielli 2025</title>
                <meta name="description" content="Conoce la historia y la pasión detrás de Gioielli 2025. Descubre nuestra misión de ofrecer joyas exclusivas y de alta calidad." />
                <meta name="keywords" content="sobre nosotros, historia, misión, visión, joyería, calidad, exclusividad, Gioielli 2025" />
            </Helmet>

            <PageTitle>Nuestra Historia</PageTitle>

            <Section>
                <SectionHeader>
                    <FaGem /> Nuestra Pasión por la Joyería
                </SectionHeader>
                <SectionParagraph>
                    En <HighlightText>Gioielli 2025</HighlightText>, nuestra historia es un reflejo de una profunda pasión por la creación y el diseño de joyas que perduren en el tiempo. Fundada con la visión de fusionar la artesanía tradicional con un toque moderno, cada pieza que ofrecemos es el resultado de dedicación y un meticuloso trabajo manual. Creemos que una joya no es solo un adorno, sino una expresión de momentos especiales y emociones.
                </SectionParagraph>
            </Section>

            <Section>
                <SectionHeader>
                    <FaHeart /> Nuestra Misión
                </SectionHeader>
                <SectionParagraph>
                    Nuestra misión es simple pero poderosa: <HighlightText>embellecer vidas a través de la belleza de la joyería</HighlightText>. Nos esforzamos por curar y crear colecciones que no solo sigan las últimas tendencias, sino que también reflejen la individualidad y el estilo de quienes las llevan. Nos comprometemos con la excelencia en cada detalle, desde la selección de los materiales más finos hasta el acabado perfecto de cada diseño.
                </SectionParagraph>
            </Section>

            <Section>
                <SectionHeader>
                    <FaAward /> Compromiso con la Calidad
                </SectionHeader>
                <SectionParagraph>
                    En Gioielli 2025, la calidad es nuestro pilar fundamental. Trabajamos con los más altos estándares, seleccionando metales preciosos y gemas de origen ético. Cada pieza es inspeccionada rigurosamente para asegurar que cumpla con nuestras exigentes expectativas y, lo más importante, con las tuyas. Es este compromiso inquebrantable el que nos permite ofrecerte joyas que no solo son hermosas, sino también <HighlightText>duraderas y valiosas</HighlightText>.
                </SectionParagraph>
            </Section>

            <ReviewsSection>
                <SectionHeader style={{ justifyContent: 'center' }}>
                    <FaStar /> Reseñas de Nuestros Clientes
                </SectionHeader>
                <ReviewContainer>
                    {reviews.map((review, index) => (
                        <ReviewCard key={index}>
                            <Stars>
                                {[...Array(review.stars)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </Stars>
                            <p>"{review.text}"</p>
                            <strong>- {review.author}</strong>
                        </ReviewCard>
                    ))}
                </ReviewContainer>
            </ReviewsSection>

            <Section style={{ textAlign: 'center' }}>
                <SectionHeader style={{ justifyContent: 'center' }}>
                    Gracias por Elegirnos
                </SectionHeader>
                <SectionParagraph>
                    Te invitamos a explorar nuestra colección y a encontrar esa pieza especial que hable por ti. En Gioielli 2025, estamos emocionados de ser parte de tus momentos más preciados.
                </SectionParagraph>
            </Section>
        </AboutContainer>
    );
};

export default AboutPage;