import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useData } from "@/hooks/useData";
import { useEffect, useState } from "react";
import { placeholderSectionAdds } from "@/assets";
import { MdArrowForwardIos } from "react-icons/md";

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
  const { sectionAdds, sectionStaticAdds } = useData();
  const [adds, setAdds] = useState(images);

  // const navigate = useNavigate();

  useEffect(() => {
    if (sectionAdds) {
      setAdds((pre) =>
        pre.map((addObj, index) => ({
          ...addObj,
          src: sectionAdds[index]?.imageUrl || "",
        }))
      );
    }
  }, [sectionAdds]);

  const handleSliderImageClick = (index: number) => {
    if (sectionAdds) {
      const url = sectionAdds[index].link;
      if (url.startsWith("http") || url.startsWith("https")) {
        // If the URL is an external link, open it in a new tab
        window.open(url, "_blank");
      } else {
        // If the URL is a relative path within your application, use navigate()
        // window.open(url);
      }
    }
  };

  const handleStaticImageClick = (link: string) => {
    if (sectionStaticAdds) {
      if (link.startsWith("http") || link.startsWith("https")) {
        // If the URL is an external link, open it in a new tab
        window.open(link, "_blank");
      } else {
        // If the URL is a relative path within your application, use navigate()
        // window.open(link, "_blank");
      }
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-2 my-10 px-2 md:px-10 md:h-[200px] h-[400px]">
      <div className="w-full md:w-[40%] h-[250px]">
        <Carousel
          showStatus={false}
          interval={3000}
          infiniteLoop
          stopOnHover={false}
          // showIndicators={false}
          transitionTime={800}
          showThumbs={false}
          onClickItem={(index) => handleSliderImageClick(index)}
        >
          {adds.map((image, index) => (
            <div key={index}>
              <img
                src={image.src}
                className="h-[200px] object-cover rounded-xl"
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="w-full md:w-[60%] flex gap-2 h-[200px]">
        {sectionStaticAdds?.map((addObj, index) => (
          <div key={index} className="w-[25%] relative flex">
            <div
              onClick={() => handleStaticImageClick(addObj.link)}
              className="absolute w-6 h-7 cursor-pointer backdrop-blur-xl text-white bottom-8 flex items-center justify-center rounded-r-lg"
            >
              <MdArrowForwardIos />
            </div>
            <img
              src={addObj.imageUrl}
              alt=""
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default CatogarySlider;
