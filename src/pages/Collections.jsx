import ProductList from '../components/ProductList';
import { useCart } from '../context/CartContext';

export default function Home() {
    const { addToCart } = useCart();

    return (
        <div className="container mt-5">
            <div className="text-center mb-5">
                <h1 className="display-4">Colección Gioielli</h1>
                <p className="lead text-secondary">Joyas que brillan con elegancia</p>
            </div>
            <ProductList addToCart={addToCart} />
        </div>
    );
}