import "photoswipe/dist/photoswipe.css";
import Gallery from "react-photo-gallery";

const photos = [
  {
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 4,
    height: 3,
  },
  {
    src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    width: 1,
    height: 1,
  },
  {
    src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    width: 3,
    height: 4,
  },
];

const GalleryTab = () => {
  return (
    <div className="w-full h-full bg-slate-500">
      <Gallery photos={photos} direction={"column"} />
    </div>
  );
};
export default GalleryTab;
