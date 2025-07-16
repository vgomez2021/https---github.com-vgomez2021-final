import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className="flex-grow-1">
                {children}
            </main>
            <Footer />
        </>
    );
}
