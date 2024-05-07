import  { useEffect, useState } from "react";
import "./style2.css";

const images= [
  "/invester-page-imgs/001.jpg",
  "/invester-page-imgs/002.jpg",
  "/invester-page-imgs/003.jpg",
  "/invester-page-imgs/004.jpg",
  "/invester-page-imgs/005.jpg",
  "/invester-page-imgs/006.jpg",
  "/invester-page-imgs/007.jpg",
]

const Slide = ({ currentIdx, idx }: { currentIdx: number; idx: number }) => {
  const classNames = [
    "card",
    idx === currentIdx && "card--center",
    idx === currentIdx - 1 && "card--left-inner",
    idx < currentIdx - 1 && "card--left-outer",
    idx === currentIdx + 1 && "card--right-inner",
    idx > currentIdx + 1 && "card--right-outer",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames}>
      <div className="card__face">
        {/* <div className="card__text">{idx + 1}</div> */}
        <img src={images[idx]} className="rounded-lg" alt="" />
      </div>
    </div>
  );
};

const items = [35, 20, 10, 0, -10, -20, -35];


const Section32 = () => {
  const [currentIdx, setCurrentIdx] = useState(Math.floor(items.length / 2));

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentIdx((prev) => (prev + 1) % images.length);
      }, 4000); // Change interval as needed (in milliseconds)

      return () => clearInterval(intervalId);
    }, []);

  // const handlePrevClick = () => {
  //   setCurrentIdx((prev) => (prev + (items.length - 1)) % items.length);
  // };

  // const handleNextClick = () => {
  //   setCurrentIdx((prev) => (prev + 1) % items.length);
  // };

  return (
    <div className=" flex items-center justify-center">
      <div className="slider">
        <div className="slider__track">
          {/* <div
            className="slider__btn slider__btn--prev"
            onClick={handlePrevClick}
          >
            &#x2190;
          </div> */}
          <ul
            className="slider__list"
            style={{ transform: `translateX(${items[currentIdx]}rem)` }}
          >
            {items.map((_, i) => (
              <li className="slider__item" key={i}>
                <Slide idx={i} currentIdx={currentIdx} />
              </li>
            ))}
          </ul>
          {/* <div
            className="slider__btn slider__btn--next"
            onClick={handleNextClick}
          >
            &#x2192;
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Section32;
