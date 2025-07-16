import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cart from './components/Cart';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import AboutUs from './pages/AboutUs';
import Collections from './pages/Collections';
import Contact from './pages/Contact';
import Login from './components/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import '@fortawesome/fontawesome-free/css/all.min.css';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route
          path="/Collections"
          element={
            <ProtectedRoute isAuthenticated={!!user}>
              <Collections />
            </ProtectedRoute>
          }
        />

        <Route path="/Contact" element={<Contact />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute isAuthenticated={!!user}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

// App envuelto en AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
