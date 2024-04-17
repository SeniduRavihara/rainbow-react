import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useData } from "@/hooks/useData";
import { useEffect, useState } from "react";
import { placeholderSectionAdds } from "@/assets";

const images = [
  {
    src: placeholderSectionAdds[0],
    value: "Fiddle Leaf",
    checked: true,
  },
  {
    src: placeholderSectionAdds[1],
    value: "Pink Princess",
    checked: false,
  },
  {
    src: placeholderSectionAdds[2],
    value: "Monstera",
    checked: false,
  },
  {
    src: placeholderSectionAdds[3],
    value: "Pothos",
    checked: false,
  },
];

const CatogarySlider = () => {
  const { sectionAdds } = useData();
  const [adds, setAdds] = useState(images);

  useEffect(() => {
    if (sectionAdds) {
      setAdds((pre) =>
        pre.map((addObj, index) => ({
          ...addObj,
          src: sectionAdds[index].imageUrl,
        }))
      );
    }
  }, [sectionAdds]);

  return (
    <div className="w-full flex gap-2 h-[200px] my-10 px-10">
      <div className="w-[40%] h-[200px]">
        <Carousel
          showStatus={false}
          interval={3000}
          infiniteLoop
          stopOnHover={false}
          // showIndicators={false}
          transitionTime={800}
          showThumbs={false}
        >
          {adds.map((image, index) => (
            <div key={index}>
              <img src={image.src} className="h-[200px] object-cover rounded-xl" />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="w-[15%] bg-slate-400"></div>

      <div className="w-[15%] bg-slate-400"></div>

      <div className="w-[15%] bg-slate-400"></div>

      <div className="w-[15%] bg-slate-400"></div>
    </div>
  );
};
export default CatogarySlider;
