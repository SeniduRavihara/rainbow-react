// import { useData } from "@/hooks/useData";
import { useData } from "@/hooks/useData";
import "./style.css";
import { useEffect } from "react";

const images = [
  {
    src: "https://firebasestorage.googleapis.com/v0/b/rainbow-32f4a.appspot.com/o/img1.jpg?alt=media&token=05281c6c-6454-4907-a53b-a355abe7a61e",
    value: "Fiddle Leaf",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/rainbow-32f4a.appspot.com/o/img2.jpg?alt=media&token=45aa7f33-97b8-4d6e-9a9e-18ba34af0435",
    value: "Pink Princess",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/rainbow-32f4a.appspot.com/o/img3.jpg?alt=media&token=f14473c2-12bd-4712-a1a0-94863dd8bfb1", 
    value: "Monstera",
    checked: true,
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/rainbow-32f4a.appspot.com/o/img4.jpg?alt=media&token=9ce9556c-e9bf-4750-8071-656dd805839a",
    value: "Pothos",
  },
];

const AdvertizingSection = () => {
  const { sectionAdds } = useData();

  useEffect(()=>{
    
  },[sectionAdds])

  return (
    <fieldset className="w-full my-5">
      {images.map((image) => (
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

// const AdvertizingSection = () => {
//   const { sectionAdds } = useData();
//   return (
//     <div className="w-screen p-10 flex overflow-x-scroll">
//       {sectionAdds &&
//         sectionAdds.map((addObj, index) => (
//           <img key={index} className="w-80" src={addObj.imageUrl} alt="ADD" />
//         ))}
//     </div>
//   );
// };
// export default AdvertizingSection;
