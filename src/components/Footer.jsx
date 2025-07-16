import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <ul className="social-icons">
                <li>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/estilo.gioielli/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                </li>
                <li>
                    <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-whatsapp"></i>
                    </a>
                </li>
                <li>
                    <a href="mailto:gioielli.artesanal@gmail.com">
                        <i className="fas fa-envelope"></i>
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.google.com/maps/place/Plaza+General+San+Mart%C3%ADn/@-34.346051,-58.7969854,17z/data=!3m1!4b1!4m6!3m5!1s0x95bb61baab870cab:0xdd91a53d238613d!8m2!3d-34.3460555!4d-58.7944105!16s%2Fg%2F1hc1kj0bx?hl=es&entry=ttu"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fas fa-map-marker-alt"></i>
                    </a>
                </li>
            </ul>
            <p>&copy; 2025 Gioielli</p>
        </footer>
    );
};

export default Footer;
