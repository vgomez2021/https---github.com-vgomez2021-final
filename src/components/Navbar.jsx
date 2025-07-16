import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const cartItemCount = cart.length;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirige al home después del logout
  };

  const links = [
    { path: '/', label: 'Inicio' },
    { path: '/Collections', label: 'Colecciones' },
    { path: '/galeria', label: 'Galería' },
    { path: '/AboutUs', label: 'Nosotros' },
    { path: '/Contact', label: 'Contacto' },
  ];

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <img src="/images/LogoOK.png" width="70" height="70" alt="Logo" />
        <NavLink className="navbar-brand" to="/">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Joyería Gioielli</NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon text-light">☰</span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {links.map(({ path, label }) => (
              <li className="nav-item" key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active fw-bold text-primary' : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}

            {!user ? (
              <li className="nav-item">
                <NavLink
                  to="/Login"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active fw-bold text-primary' : ''}`
                  }
                >
                  Login
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <button className="btn btn-outline-warning ms-3" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            )}

            <li className="nav-item position-relative">
              <NavLink
                to="/Cart"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active fw-bold text-primary' : ''}`
                }
              >
                Carrito <i className="bi bi-cart"></i>
                {cartItemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItemCount}
                    <span className="visually-hidden">productos en el carrito</span>
                  </span>
                )}
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

