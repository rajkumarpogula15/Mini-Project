import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Hero.css"; // <-- your custom override styles

const Hero = () => (
  <div className="hero">
  <Carousel autoPlay infiniteLoop showThumbs={false}>
    <div className="relative">
      <img src="/images/tech2.avif" alt="Wedding" className="w-full h-[500px] object-cover" />
      <p className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white text-xl px-4 py-2 rounded">
        Plan Your Dream Wedding
      </p>
    </div>
    <div className="relative">
      <img src="/images/tech1.jpg" alt="Corporate" className="w-full h-[500px] object-cover" />
      <p className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white text-xl px-4 py-2 rounded">
        Corporate Events Made Easy
      </p>
    </div>
  </Carousel>
</div>

);

export default Hero;
