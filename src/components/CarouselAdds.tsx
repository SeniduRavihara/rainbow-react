// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarouselAdds = () => {
  return (
    <div className="w-full p-5">
      here
      <Carousel
        showStatus={false}
        autoPlay
        interval={3000}
        infiniteLoop
        showArrows={false}
        stopOnHover={false}
        showIndicators={false}
        transitionTime={800}
      >
        <div>
          <img
            alt=""
            src="https://dmrqkbkq8el9i.cloudfront.net/Pictures/480xany/1/3/0/283130_cadburydelightsorangecaramel_602912_crop.jpg"
            className=""
          />
        </div>
        <div>
          <img alt="" src="/img/slideshow/im2.jpg" className="" />
        </div>
        <div>
          <img alt="" src="/img/slideshow/im3.jpg" className="" />
        </div>
        <div>
          <img alt="" src="/img/slideshow/im4.jpg" className="" />
        </div>
      </Carousel>
    </div>
  );
};
export default CarouselAdds;
