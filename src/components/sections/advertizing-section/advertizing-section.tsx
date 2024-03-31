import { useData } from "@/hooks/useData";
import "./style.css";
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

const AdvertizingSection = () => {
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
    <div className="">
      <div className="hidden  lg:flex">
        <fieldset className="w-full my-5">
          {adds.map((image) => (
            <label
              key={image.value}
              style={{
                backgroundImage: `url(${image.src})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
              className="h-52"
            >
              <input
                type="radio"
                name="images"
                value={image.value}
                defaultChecked={image.checked}
              />
            </label>
          ))}
        </fieldset>
      </div>

      {/* ------------Mobile view-------------- */}

      <div className="flex overflow-x-scroll gap-2 lg:hidden px-10 my-10">
        {adds.map((image) => (
          <img
            key={image.value}
            src={image.src}
            className="rounded-md w-52 h-32 object-cover"
          />
        ))}
      </div>
    </div>
  );
};
export default AdvertizingSection;
