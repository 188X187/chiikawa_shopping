import Carousel from 'react-bootstrap/Carousel';
import kidult from './kidult.jpg'

export default function ImageSlide() {
    return (
        <Carousel>
            <Carousel.Item>
                <CarouselImage1 text="First slide" />
            </Carousel.Item>
            <Carousel.Item>
                <CarouselImage2 text="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
                <CarouselImage3 text="Third slide" />
            </Carousel.Item>
        </Carousel>
    )
}

function CarouselImage1() {
    return (
        <img
            className="d-block w-100"
            src={kidult}
        />
    )
}

function CarouselImage2() {
    return (
        <img
            className="d-block w-100"
            src={kidult}
        />
    )
}

function CarouselImage3() {
    return (
        <img
            className="d-block w-100"
            src={kidult}
        />
    )
}