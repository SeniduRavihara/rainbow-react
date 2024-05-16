// import { useData } from "@/hooks/useData";
// import "./style.css";
// import { useEffect, useState } from "react";
// // import { placeholderSectionAdds } from "@/assets";

// // const images = [
// //   {
// //     src: placeholderSectionAdds[0],
// //     value: "Fiddle Leaf",
// //     checked: true,
// //   },
// //   {
// //     src: placeholderSectionAdds[1],
// //     value: "Pink Princess",
// //     checked: false,
// //   },
// //   {
// //     src: placeholderSectionAdds[2],
// //     value: "Monstera",
// //     checked: false,
// //   },
// //   {
// //     src: placeholderSectionAdds[3],
// //     value: "Pothos",
// //     checked: false,
// //   },
// // ];

// const AdvertizingSection = () => {
//   const { sectionAdds } = useData();
//   const [adds, setAdds] = useState(images);

//   useEffect(() => {
//     if (sectionAdds) {
//       setAdds((pre) =>
//         pre.map((addObj, index) => ({
//           ...addObj,
//           src: sectionAdds[index].imageUrl,
//         }))
//       );
//     }
//   }, [sectionAdds]);

//   return (
//     <div className="w-full my-10">
//       <div className="hidden lg:flex w-full ">
//         <fieldset className="w-full px-20 fieldset1">
//           {adds.map((image) => (
//             <label
//               key={image.value}
//               style={{
//                 backgroundImage: `url(${image.src})`,
//                 backgroundPosition: "center",
//                 backgroundSize: "cover",
//                 backgroundRepeat: "no-repeat",
//               }}
//               className="h-52"
//             >
//               <input
//                 type="radio"
//                 name="images"
//                 value={image.value}
//                 defaultChecked={image.checked}
//               />
//             </label>
//           ))}
//         </fieldset>
//       </div>

//       {/* ------------Mobile view-------------- */}

//       <div className="flex flex-col gap-2 lg:hidden w-full px-2 my-10">
//         <fieldset className="w-full fieldset2">
//           {adds.map(
//             (image, index) =>
//               index <= 1 && (
//                 <label
//                   key={image.value}
//                   style={{
//                     backgroundImage: `url(${image.src})`,
//                     backgroundPosition: "center",
//                     backgroundSize: "cover",
//                     backgroundRepeat: "no-repeat",
//                   }}
//                   className="h-52"
//                 >
//                   <input
//                     type="radio"
//                     name="images"
//                     value={image.value}
//                     defaultChecked={image.checked}
//                   />
//                 </label>
//               )
//           )}
//         </fieldset>

//         <fieldset className="w-full fieldset3">
//           {adds.map(
//             (image, index) =>
//               index >= 2 && (
//                 <label
//                   key={image.value}
//                   style={{
//                     backgroundImage: `url(${image.src})`,
//                     backgroundPosition: "center",
//                     backgroundSize: "cover",
//                     backgroundRepeat: "no-repeat",
//                   }}
//                   className="h-52"
//                 >
//                   <input
//                     type="radio"
//                     name="images"
//                     value={image.value}
//                     defaultChecked={image.checked}
//                   />
//                 </label>
//               )
//           )}
//         </fieldset>
//       </div>
//     </div>
//   );
// };
// export default AdvertizingSection;
