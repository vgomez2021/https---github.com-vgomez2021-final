import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, clearCart, removeFromCart } = useCart();

  // Calcular total
  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const handlePurchase = () => {
    alert('¡Gracias por tu compra!');
    clearCart();
  };

  return (
    <div className="cart-page">
      <div className="container mt-4">
        <h2>Carrito</h2>

        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.title}</strong>
                    <div className="text-muted">${item.price}</div>
                  </div>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.id)}>
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

            <h4>Total: ${total}</h4>

            <div className="d-flex gap-2 mt-3">
              <button onClick={clearCart} className="btn btn-danger">
                Vaciar carrito
              </button>
              <button onClick={handlePurchase} className="btn btn-success">
                Comprar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
