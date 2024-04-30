import { useRef } from "react";
import "./image-slider.css";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ImageSlider = ({
  images,
}: {
  images: Array<{ imageUrl: string; id: string; link: string }>;
}) => {
  const wrapperRef = useRef(null);
  const carouselRef = useRef(null);

  const navigate = useNavigate();

  const handleImageClick = (link: string) => {
    // console.log("SEnu", link);

    if (images) {
      if (link.startsWith("http") || link.startsWith("https")) {
        // If the URL is an external link, open it in a new tab
        window.open(link, "_blank");
      } else {
        // If the URL is a relative path within your application, use navigate()
        navigate(link);
      }
    }
  };

  const handleArrowClick = (direction: string) => {
    const carousel = carouselRef.current as unknown as HTMLDivElement;
    if (!carousel) return;
    const firstCard = carousel.querySelector(".card") as HTMLElement;
    if (!firstCard) return;
    const firstCardWidth = firstCard.offsetWidth;
    carousel.scrollLeft +=
      direction === "left" ? -firstCardWidth : firstCardWidth;
  };

  return (
    <div
      className="wrapper1 w-full flex items-center gap-10 justify-between relative"
      ref={wrapperRef}
    >
      <div
        onClick={() => handleArrowClick("left")}
        className="w-10 h-10 flex items-center absolute z-10 bg-white left-0 cursor-pointer justify-center rounded-r-2xl"
      >
        <MdArrowBackIos className="text-xl ml-2 text-black" />
      </div>

      <ul className="carousel" ref={carouselRef}>
        {images.map(({ imageUrl, id, link }) => (
          <li
            className="card border-none rounded-lg"
            key={id}
            onClick={() => handleImageClick(link)}
          >
            <img
              src={imageUrl}
              alt="img"
              draggable="false"
              className="rounded-lg w-full h-full object-cover"
            />
          </li>
        ))}
      </ul>

      <div
        onClick={() => handleArrowClick("right")}
        className="w-10 h-10 flex items-center absolute z-10 bg-white right-0 cursor-pointer justify-center rounded-l-2xl"
      >
        <MdArrowForwardIos className="text-xl" />
      </div>
    </div>
  );
};

export default ImageSlider;
