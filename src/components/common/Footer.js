import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarker, FaMapMarkerAlt } from 'react-icons/fa'; // Iconos de redes sociales

const StyledFooter = styled.footer`
  background-color: #222;
  color: #f8f8f8;
  padding: 40px 0;
  margin-top: 50px;
  font-size: 0.9rem;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que las secciones se envuelvan en pantallas pequeñas */
  justify-content: space-around;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left; /* Alinea a la izquierda en pantallas más grandes */
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 250px; /* Ancho mínimo para cada sección */
  margin: 20px;

  h5 {
    color: #fff;
    margin-bottom: 20px;
    font-size: 1.1rem;
    text-transform: uppercase;
    text-align: center;
  }

  p, a {
    color: #ccc;
    text-decoration: none;
    line-height: 1.8;
  }

  a:hover {
    color: #fff;
    text-decoration: underline;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 10px;
  }
`;

const SocialIcons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: #fff;
    font-size: 1.5rem;
    margin-right: 15px;
    transition: color 0.3s ease;
    &:hover {
      color: #007bff; /* Un color de destaque al pasar el mouse */
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #444;
  color: #aaa;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="container"> {/* Contenedor de Bootstrap para centrar el contenido */}
        <FooterContent>
          <FooterSection>
            <h5>Sobre Nosotros</h5>
            <p>
              Gioielli ofrece una exquisita colección de joyas, diseñadas para capturar la esencia de la belleza y la elegancia.
            </p>
          </FooterSection>
          <FooterSection>
            <h5>Redes Sociales</h5>
            <SocialIcons>
              <a href="https://www.facebook.com/" target="_blank" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://www.instagram.com/estilo.gioielli/" target="_blank" aria-label="Instagram"><FaInstagram /></a>
            </SocialIcons>
          </FooterSection>
          <FooterSection>
            <h5>Contacto</h5>
            <SocialIcons>
              <a href="https://wa.me/" target="_blank" aria-label="WhatsApp"><FaWhatsapp /></a>
              <a href="mailto:gioielli.artesanal@gmail.com" aria-label="Mail"><FaEnvelope /></a>
            </SocialIcons>
          </FooterSection>
          <FooterSection>
            <h5>Ubicación</h5>
            <SocialIcons>
              <a href="https://www.google.com/maps/place/Plaza+General+San+Mart%C3%ADn/@-34.346051,-58.7969854,17z/data=!3m1!4b1!4m6!3m5!1s0x95bb61baab870cab:0xdd91a53d238613d!8m2!3d-34.3460555!4d-58.7944105!16s%2Fg%2F1hc1kj0bx?hl=es&entry=ttu" target="_blank" aria-label="Map"><FaMapMarkerAlt /></a>
            </SocialIcons>
          </FooterSection>
        </FooterContent>
        <Copyright>
          &copy; {new Date().getFullYear()} Gioielli. Todos los derechos reservados.
        </Copyright>
      </div>
    </StyledFooter>
  );
};

export default Footer;