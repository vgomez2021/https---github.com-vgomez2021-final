import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import Login from './components/auth/Login';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import ProductFormPage from './pages/ProductFormPage'; 
import ProtectedRoute from './components/auth/ProtectedRoute';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="container my-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <CartPage />
                    </ProtectedRoute>
                  }
                />
                
                {/* Ruta para la página principal de administración (solo lista) */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  }
                />
                
                {/* Ruta para crear un nuevo producto */}
                <Route
                  path="/admin/edit/new"
                  element={
                    <ProtectedRoute>
                      <ProductFormPage />
                    </ProtectedRoute>
                  }
                />
                
                {/* Ruta para editar un producto existente */}
                <Route
                  path="/admin/edit/:id"
                  element={
                    <ProtectedRoute>
                      <ProductFormPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;