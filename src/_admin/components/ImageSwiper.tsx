// Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "./styles.css";
// import { Pagination, Navigation } from "swiper/modules";
import { imageGalery } from "@/assets";
import { Carousel } from "react-responsive-carousel";
import { cn } from "@/lib/utils";

type ImageSwiperProps = {
  storeImages: Array<{
    index: number;
    file?: File;
    imageUrl: null | string;
  }>;
  setStoreImages: React.Dispatch<
    React.SetStateAction<
      Array<{
        index: number;
        file?: File;
        imageUrl: null | string;
      }>
    >
  >;
};

const ImageSwiper = ({ setStoreImages, storeImages }: ImageSwiperProps) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create a copy of the previous images array
    const updatedImages = [...storeImages];

    // Check if an image with the same index already exists
    const existingImageIndex = updatedImages.findIndex(
      (item) => item.index === index
    );

    // If an image with the same index exists, replace it with the new image
    if (existingImageIndex !== -1) {
      updatedImages[existingImageIndex] = { index, file, imageUrl: null };
    } else {
      // Otherwise, add the new image to the array
      updatedImages.push({ index, file, imageUrl: null });
    }

    // Update the storeImages state with the updated array
    setStoreImages(updatedImages);
  };

  const renderSlides = () => {
    const slides = [];
    for (let i = 1; i <= 5; i++) {
      const file = storeImages[i - 1]?.file;
      const imgUrl = storeImages[i - 1].imageUrl;

      const imageUrl = file ? URL.createObjectURL(file) : imgUrl ?? imageGalery;


      slides.push(
        <div
          key={i}
          className="w-full h-full flex flex-col items-center justify-center"
        >
          <div>
            <img
              src={imageUrl}
              className={cn(
                "w-[80%] h-[80%] object-covr rounded-l-md",
                imageUrl === imageGalery && "w-32 h-32"
              )}
              alt=""
            />
          </div>

          <div>
            <input
              id={`fileInput${i}`}
              type="file"
              accept="image/*"
              onChange={(e) => handleChange(e, i)}
              required
              className="hidden"
            />
            <p>
              Select your store image{" "}
              <label htmlFor={`fileInput${i}`} className="text-blue-500">
                Browse
              </label>
            </p>
          </div>
        </div>
      );
    }
    return slides;
  };

  return (
    <>
      <Carousel
        showStatus={false}
        interval={3000}
        stopOnHover={false}
        showIndicators={false}
        transitionTime={800}
        showThumbs={false}
        autoPlay={false}
        className="w-[90%] md:w-full h-full border bg-slate-200 rounded-md py-3 md:p-3 lg:p-5"
      >
        {renderSlides()}
      </Carousel>
    </>
  );
};

export default ImageSwiper;
