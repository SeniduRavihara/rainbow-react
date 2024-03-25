import { useData } from "@/hooks/useData";

const AdvertizingSection = () => {
  const { sectionAdds } = useData();
  return (
    <div className="w-screen p-10 flex overflow-scroll">
      {sectionAdds &&
        sectionAdds.map((addObj, index) => (
          <img key={index} className="w-80" src={addObj.imageUrl} alt="ADD" />
        ))}
    </div>
  );
};
export default AdvertizingSection;
