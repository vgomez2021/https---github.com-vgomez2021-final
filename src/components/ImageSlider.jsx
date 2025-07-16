import { useEffect } from 'react';

export default function ImageSlider() {
    useEffect(() => {
        const carousel = document.querySelector('#gioielliCarousel');
        if (window.bootstrap && carousel) {
            new window.bootstrap.Carousel(carousel, {
                interval: 5000,
                ride: 'carousel',
            });
        }
    }, [])

    return (
        <div id="gioielliCarousel" className="carousel slide">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="/images/slide1.jpg" alt="Imagen 1" />
                </div>
                <div className="carousel-item">
                    <img src="/images/slide2.jpg" alt="Imagen 2" />
                </div>
                <div className="carousel-item">
                    <img src="/images/slide3.jpg" alt="Imagen 3" />
                </div>
                <div className="carousel-item">
                    <img src="/images/slide4.jpg" alt="Imagen 4" />
                </div>
                <div className="carousel-item">
                    <img src="/images/slide5.jpg" alt="Imagen 5" />
                </div>
                <div className="carousel-item">
                    <img src="/images/slide6.jpg" alt="Imagen 6" />
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#gioielliCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#gioielliCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
            </button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}