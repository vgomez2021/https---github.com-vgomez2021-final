import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Restablecer estilos básicos para consistencia entre navegadores */
  *, *::before, *::after {
    box-sizing: border-box; /* Modelo de caja universal */
  }

  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Arial', sans-serif; /* Fuente base */
    line-height: 1.6;
    color: #333; /* Color de texto principal */
    background-color: #f4f7f6; /* Un gris suave para el fondo */
    -webkit-font-smoothing: antialiased; /* Suavizado de fuentes para WebKit */
    -moz-osx-font-smoothing: grayscale; /* Suavizado de fuentes para Firefox */
  }

  a {
    text-decoration: none;
    color: inherit; /* Hereda el color del padre por defecto */
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 0.5em;
    font-weight: bold;
  }

  p {
    margin-top: 0;
    margin-bottom: 1em;
  }

  /* Estilos específicos para la aplicación */
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Asegura que la aplicación ocupe al menos toda la altura de la vista */
  }

  main {
    flex: 1; /* Permite que el contenido principal ocupe el espacio restante, empujando el footer hacia abajo */
  }

  /* Sobrescribiendo/Personalizando colores de Bootstrap a través de styled-components */
  /* Si usas los componentes de Bootstrap directamente, estas reglas de '!important' son útiles.
     Si los estás envolviendo con styled-components y pasas props, es más elegante manejarlo ahí. */
  .btn-primary {
    background-color: #007bff !important;
    border-color: #007bff !important;
  }
  .btn-primary:hover {
    background-color: #0056b3 !important;
    border-color: #0056b3 !important;
  }

  .btn-success {
    background-color: #28a745 !important;
    border-color: #28a745 !important;
  }
  .btn-success:hover {
    background-color: #218838 !important;
    border-color: #1e7e34 !important;
  }

  .btn-danger {
    background-color: #dc3545 !important;
    border-color: #dc3545 !important;
  }
  .btn-danger:hover {
    background-color: #c82333 !important;
    border-color: #bd2130 !important;
  }

  .btn-warning {
    background-color: #ffc107 !important;
    border-color: #ffc107 !important;
    color: #333 !important; /* Texto oscuro para contraste en el amarillo */
  }
  .btn-warning:hover {
    background-color: #e0a800 !important;
    border-color: #d39e00 !important;
  }
  
  .btn-info {
    background-color: #17a2b8 !important;
    border-color: #17a2b8 !important;
  }
  .btn-info:hover {
    background-color: #138496 !important;
    border-color: #117a8b !important;
  }

  /* Ajustes para Toastify para que se integre bien */
  .Toastify__toast-container {
    padding: 10px;
    font-family: 'Arial', sans-serif;
  }
  .Toastify__toast--success {
    background-color: #28a745;
  }
  .Toastify__toast--error {
    background-color: #dc3545;
  }
  .Toastify__toast--warning {
    background-color: #ffc107;
  }
  .Toastify__toast--info {
    background-color: #17a2b8;
  }
`;