import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Item {
    logo: string;
    img: string;
    link: string;
}

interface Props {
    items: Item[];
}

const CarouselComponent = ({ items }: Props) => {
    return (
        <Carousel className="m-carousel" variant="dark" interval={null}>
            {items.map((item, index) => (
                <Carousel.Item key={index}>
                    <img src={item.logo} className="m-carouselLogo" />
                    <img src={item.img} style={{ height: '100%', width: '350px' }} />
                    <Link to={item.link} className="m-carouselBtn">discover the brand</Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default CarouselComponent;