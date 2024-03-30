// import { useData } from "@/hooks/useData";
import { useData } from "@/hooks/useData";
import "./style.css";
import { useEffect, useState } from "react";
import { placeholderSectionAdds } from "@/assets";

const images = [
  {
    src: placeholderSectionAdds[0],
    value: "Fiddle Leaf",
    checked: false,
  },
  {
    src: placeholderSectionAdds[1],
    value: "Pink Princess",
    checked: false,
  },
  {
    src: placeholderSectionAdds[2],
    value: "Monstera",
    checked: true,
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
        pre.map((addObj, index) => ({ ...addObj, src: sectionAdds[index].imageUrl }))
      );
    }
  }, [sectionAdds]);

  return (
    <fieldset className="w-full my-5">
      {adds.map((image) => (
        <label key={image.value} style={{ background: `url(${image.src})` }}>
          <input
            type="radio"
            name="images"
            value={image.value}
            defaultChecked={image.checked}
          />
        </label>
      ))}
    </fieldset>
  );
};
export default AdvertizingSection;

