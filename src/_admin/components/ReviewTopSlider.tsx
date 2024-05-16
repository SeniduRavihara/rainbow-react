// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { placeholderSliderAdds } from "@/assets";
import { db } from "@/firebase/config";
import { CircularProgress } from "@chakra-ui/react";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ReviewTopSlider = ({ storeId }: { storeId: string }) => {
  const [sliderImages, setSliderImages] =
    useState<Array<{ imageUrl: string; id: string; link: string }>>();

  useEffect(() => {
    const collectionRef = collection(db, "latestStore", storeId, "top-slider");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const sliderAddsArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<{ imageUrl: string; id: string; link: string }>;

      // console.log(sliderAddsArr);
      setSliderImages(sliderAddsArr);
    });

    return unsubscribe;
  }, [storeId]);

  if (!sliderImages) {
    // If detailsPageSliderAdds is null, return null or a placeholder
    return (
      <div
        className="w-full flex items-center justify-center
      "
      >
        <CircularProgress size="30px" isIndeterminate color="green.300" />
      </div>
    );
  }
  return (
    <div className="w-full -mt-5 lg:mt-0">
      <Carousel
        showStatus={false}
        autoPlay
        interval={3000}
        infiniteLoop
        showArrows={false}
        stopOnHover={false}
        showIndicators={false}
        transitionTime={800}
        showThumbs={false}
      >
        {sliderImages.map((sliderAddObj, index) => (
          <div key={index}>
            <img
              alt="Adds"
              src={sliderAddObj.imageUrl ?? ""}
              className="h-[180px md:h-[250px object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default ReviewTopSlider;
