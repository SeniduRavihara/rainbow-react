import { FC } from 'react';

interface ImagesProps {
  data: {
    src: string;
    title?: string;
    description?: string;
  }[];
  onClick: (index: number) => void;
}

const Images: FC<ImagesProps> = (props) => {
  const { data, onClick } = props;

  const handleClickImage = (index: number) => {
    onClick(index);
  };

  return (
    <div className="images-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((slide, index) => (
        <div
          onClick={() => handleClickImage(index)}
          key={index}
          className="image m-1 md:m-2"
        >
          <img src={slide.src} alt={slide.description} />
        </div>
      ))}
    </div>
  );
};

export default Images;
