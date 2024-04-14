// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { placeholderSliderAdds } from "@/assets";
import { useData } from "@/hooks/useData";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselAdds = () => {
  const { sliderAdds } = useData();

  if (!sliderAdds) {
    // If sliderAdds is null, return null or a placeholder
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
          {placeholderSliderAdds.map((sliderAdd, index) => (
            <div key={index}>
              <img alt="Adds" src={sliderAdd} className="" />
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
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
        {sliderAdds.map((sliderAddObj, index) => (
          <div key={index}>
            <img alt="Adds" src={sliderAddObj.imageUrl ?? placeholderSliderAdds[index]} className="" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default CarouselAdds;
