// // import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// // import { placeholderSliderAdds } from "@/assets";
// import { useData } from "@/hooks/useData";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { useNavigate } from "react-router-dom";

// const DetalsPageCarosel = () => {
//   const { detailsPageSliderAdds } = useData();
//   const navigate = useNavigate();

//   const handleImageClick = (index: number) => {
//     if (detailsPageSliderAdds && detailsPageSliderAdds[index].link) {
//       const url = detailsPageSliderAdds[index].link;
//       if (url.startsWith("http") || url.startsWith("https")) {
//         // If the URL is an external link, open it in a new tab
//         window.open(url, "_blank");
//       } else {
//         // If the URL is a relative path within your application, use navigate()
//         navigate(url);
//       }
//     }
//   };

//   if (!detailsPageSliderAdds) {
//     // If detailsPageSliderAdds is null, return null or a placeholder
//     return (
//       <div className="w-full -mt-5 lg:mt-0">
//         <Carousel
//           showStatus={false}
//           autoPlay
//           interval={3000}
//           infiniteLoop
//           showArrows={false}
//           stopOnHover={false}
//           showIndicators={false}
//           transitionTime={800}
//           showThumbs={false}
//         >
//           {placeholderSliderAdds.map((sliderAdd, index) => (
//             <div key={index}>
//               <img alt="Adds" src={sliderAdd} className="" />
//             </div>
//           ))}
//         </Carousel>
//       </div>
//     );
//   }
//   return (
//     <div className="w-full -mt-5 lg:mt-0">
//       <Carousel
//         showStatus={false}
//         autoPlay
//         interval={3000}
//         infiniteLoop
//         showArrows={false}
//         stopOnHover={false}
//         showIndicators={false}
//         transitionTime={800}
//         showThumbs={false}
//         onClickItem={(index) => handleImageClick(index)}
//       >
//         {detailsPageSliderAdds.map((sliderAddObj, index) => (
//           <div key={index}>
//             <img
//               alt="Adds"
//               // src={sliderAddObj.imageUrl ?? placeholderSliderAdds[index]}
//               src={sliderAddObj.imageUrl}
//               className="cursor-pointer h-[100px] md:h-[200px]"
//             />
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// };
// export default DetalsPageCarosel;
