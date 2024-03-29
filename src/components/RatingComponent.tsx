import { useState } from "react";
import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

type RatingComponentProps = {
  readonly?: boolean;
  value?: number;
  setValue? : React.Dispatch<React.SetStateAction<number>>
}

function RatingComponent({
  readonly = true,
  value = 0,
  setValue,
}: RatingComponentProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const stars = Array(5).fill(0);

  const handleClick = (value: number) => {
    if (readonly) return;
    if (setValue) {
      setValue(value);
    }
    console.log(value);
  };

  const handleMouseOver = (newHoverValue: number) => {
    if (readonly) return;
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverValue(null);
  };

  return (
    <div className="flex">
      {stars.map((_, index) => {
        return (
          <FaStar
            key={index}
            size={15}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            color={(hoverValue || value) > index ? colors.orange : colors.grey}
            className={`mr-1  ${!readonly && "cursor-pointer"}`}
          />
        );
      })}
    </div>
  );
}

export default RatingComponent;
