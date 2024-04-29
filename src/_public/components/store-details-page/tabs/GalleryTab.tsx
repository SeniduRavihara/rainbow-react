
const GalleryTab = ({ gallery }: { gallery: string[] }) => {
  return (
    <div className="w-full h-full">
      <ul className="grid grid-cols-4 gap-2">
        {gallery.map((image, index) => (
          <li key={index}>
            <img src={image} alt="" className="w-[200px]" />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default GalleryTab;
