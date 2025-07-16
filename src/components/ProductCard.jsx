import { Link } from 'react-router-dom';

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={product.image}
          alt={product.title}
          className="card-img-top p-3"
          style={{ height: '300px', objectFit: 'contain' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text text-light">${product.price}</p>

          <div className="mt-auto d-flex justify-content-between">
            <button
              onClick={() => addToCart(product)}
              className="btn btn-primary"
            >
              Añadir
            </button>
            <Link
              to={`/product/${product.id}`}
              className="btn btn-outline-light"
            >
              Descripción
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
