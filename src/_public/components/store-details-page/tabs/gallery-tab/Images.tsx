import { FC } from 'react';
// import Masonry from "@mui/lab/Masonry";

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

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(0.5),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  // }));

  return (
    <div className="images-containe xsm:columns-2 md:columns-3 columns-1 2xl:columns-4">
      {/* <Masonry columns={4} spacing={2}>
        {data.map((slide, index) => (
          <Item key={index}>
            <img src={slide.src} alt={slide.description} />
          </Item>
        ))}
      </Masonry> */}
      

      {data.map((slide, index) => (
        <div
          onClick={() => handleClickImage(index)}
          key={index}
          className="image my-3"
        >
          <img src={slide.src} alt={slide.description} />
        </div>
      ))}
    </div>
  );
};

export default Images;
