import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Hero = () => (
  <div className="hero">
    <Carousel autoPlay infiniteLoop>
      <div><img src="/images/wedding.jpg" alt="Wedding" /><p className="legend">Plan Your Dream Wedding</p></div>
      <div><img src="/images/corporate.jpg" alt="Corporate" /><p className="legend">Corporate Events Made Easy</p></div>
    </Carousel>
  </div>
);

export default Hero;
