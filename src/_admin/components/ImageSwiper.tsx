// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Pagination, Navigation } from "swiper/modules";

type ImageSwiperProps = {
  storeImages: Array<{
    index: number;
    file: File;
    imageUrl: null | string;
  }>;
  setStoreImages: React.Dispatch<
    React.SetStateAction<
      Array<{
        index: number;
        file: File;
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

      const imageUrl = file
        ? URL.createObjectURL(file)
        : "/assets/img/image-gallery.png";

      slides.push(
        <SwiperSlide key={i}>
          <div className="img-area">
            <div className="">
              <div className="upload-img">
                <img src={imageUrl} className="w-10 h-10" alt="" />
              </div>
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
                <label htmlFor={`fileInput${i}`}>Browse</label>
              </p>
            </div>
          </div>
        </SwiperSlide>
      );
    }
    return slides;
  };

  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {renderSlides()}
      </Swiper>
    </>
  );
};

export default ImageSwiper;
