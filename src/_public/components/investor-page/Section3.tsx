import { useEffect, useState } from "react";
import "./style.css"

const CascadeSlider = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 5000); // Change interval as needed

    return () => clearInterval(interval);
  }, [totalImages]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalImages - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  return (
    <div className="cascade-slider_container">
      <div className="cascade-slider_slides">
        {images.map((imageUrl, index) => (
          <div
            className={`cascade-slider_item ${
              index === currentIndex
                ? "now"
                : index === (currentIndex + 1) % totalImages
                ? "next"
                : "prev"
            }`}
            key={index}
          >
            <a href="javvascript:void(0)">
              <img src={imageUrl} alt={`Slide ${index + 1}`} />
            </a>
          </div>
        ))}
      </div>
      <span
        className="cascade-slider_arrow cascade-slider_arrow-left"
        onClick={handlePrevClick}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </span>
      <span
        className="cascade-slider_arrow cascade-slider_arrow-right"
        onClick={handleNextClick}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </span>
    </div>
  );
};



const Section3 = () => {
  const images = [
    "/invester-page-imgs/001.jpg",
    "/invester-page-imgs/002.jpg",
    "/invester-page-imgs/003.jpg",
    "/invester-page-imgs/004.jpg",
    "/invester-page-imgs/005.jpg",
    "/invester-page-imgs/006.jpg",
    "/invester-page-imgs/007.jpg",
    "/invester-page-imgs/008.jpg",
  ];

  return (
    <div className="app">
      <CascadeSlider images={images} />
    </div>
  );
}
export default Section3