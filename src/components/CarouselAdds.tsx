// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useData } from "@/hooks/useData";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselAdds = () => {
  const { sliderAdds } = useData();

  return (
    <div className="w-full -mt-5 lg:mt-0">
      <Carousel
      showStatus={false}
      autoPlay
      interval={3000}
      infiniteLoop
      showArrows={false}
      stopOnHover={false}
      showIndicators={false}
      transitionTime={800}
       showThumbs={false}
      >
        {sliderAdds && sliderAdds.map(
          (sliderAddObj, index) => (
            <div key={index}>
              <img alt="sen" src={sliderAddObj.imageUrl} className="" />
            </div>
          ),
        )}
      </Carousel>
    </div>
  );
};
export default CarouselAdds;
