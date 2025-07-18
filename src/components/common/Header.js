import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import {
  FaGem,
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaTools,
  FaInfoCircle,
  FaImage,
  FaPhoneAlt,
  FaHome,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import CartIcon from '../cart/CartIcon';

const StyledHeader = styled.header`
  background-color: #333;
  color: white;
  padding: 15px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  z-index: 1001;

  span {
    margin-left: 10px;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    
    span {
      margin-left: 8px;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
    
    span {
      display: none; /* Oculta el texto en móviles muy pequeños */
    }
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
  transition: color 0.3s ease;

  &:hover {
    color: #ffc107;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 280px;
    height: 100vh;
    background-color: #333;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 80px 20px 20px;
    transition: right 0.3s ease;
    z-index: 1000;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 480px) {
    width: 100%;
    right: ${props => props.isOpen ? '0' : '-100%'};
  }
`;

const NavItem = styled.li`
  margin-left: 30px;

  @media (max-width: 768px) {
    margin: 0 0 15px 0;
    width: 100%;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    color: #ffc107;
  }

  svg {
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    padding: 10px 0;
    font-size: 1.2rem;
    width: 100%;
    border-bottom: 1px solid #555;
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    color: #ffc107;
  }

  svg {
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    padding: 10px 0;
    font-size: 1.2rem;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid #555;
  }
`;

const Overlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

const DesktopCartWrapper = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileCartWrapper = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #555;
  }
`;

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.info('¡Sesión cerrada con éxito!');
    navigate('/');
    setIsMobileMenuOpen(false); // Cierra el menú móvil
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = () => {
    closeMobileMenu();
  };

  return (
    <>
      <StyledHeader>
        <NavContainer>
          <Logo to="/" onClick={handleLinkClick}>
            <FaGem />
            <span>Joyería Gioielli</span>
          </Logo>

          <DesktopCartWrapper>
            <CartIcon />
          </DesktopCartWrapper>

          <MobileMenuButton onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>

          <NavLinks isOpen={isMobileMenuOpen}>
            <NavItem>
              <StyledLink to="/" onClick={handleLinkClick}>
                <FaHome /> Inicio
              </StyledLink>
            </NavItem>

            <NavItem>
              <StyledLink to="/gallery" onClick={handleLinkClick}>
                <FaImage /> Galería
              </StyledLink>
            </NavItem>

            <NavItem>
              <StyledLink to="/about" onClick={handleLinkClick}>
                <FaInfoCircle /> Nosotros
              </StyledLink>
            </NavItem>

            <NavItem>
              <StyledLink to="/contact" onClick={handleLinkClick}>
                <FaPhoneAlt /> Contacto
              </StyledLink>
            </NavItem>

            <NavItem>
              <StyledLink to="/cart" onClick={handleLinkClick}>
                Carrito
              </StyledLink>
            </NavItem>

            <MobileCartWrapper>
              <CartIcon />
            </MobileCartWrapper>

            {isLoggedIn ? (
              <>
                <NavItem>
                  <StyledLink to="#" aria-label="Mi cuenta" onClick={handleLinkClick}>
                    <FaUserCircle /> Mi Cuenta
                  </StyledLink>
                </NavItem>
                <NavItem>
                  <LogoutButton onClick={handleLogout} aria-label="Cerrar sesión">
                    <FaSignOutAlt /> Salir
                  </LogoutButton>
                </NavItem>
              </>
            ) : (
              <NavItem>
                <StyledLink to="/login" aria-label="Iniciar sesión" onClick={handleLinkClick}>
                  <FaSignInAlt /> Iniciar Sesión
                </StyledLink>
              </NavItem>
            )}

            <NavItem>
              <StyledLink to="/admin" onClick={handleLinkClick}>
                <FaTools /> Admin
              </StyledLink>
            </NavItem>
          </NavLinks>
        </NavContainer>
      </StyledHeader>

      <Overlay isOpen={isMobileMenuOpen} onClick={closeMobileMenu} />
    </>
  );
};

export default Header;