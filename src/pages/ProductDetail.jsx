import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center">Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div style={{ marginBottom: '80px' }}>
      <div className="container mt-5 text-light">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
              style={{ maxHeight: 400 }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="text-gold">{product.title}</h2>
            <p>{product.description}</p>
            <p><strong>Precio:</strong> ${product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

