import { Carousel } from "react-responsive-carousel";
import { FcLike } from "react-icons/fc";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RatingComponent from "./RatingComponent";
// import { useState } from "react";
import { IonIcon } from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import { Tag } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type StoreCardProps = {
  title: string;
  whatsappnumber: string;
  tags: string[];
  address: string;
  storeImages: string[];
  rating: number;
  id: string;
};

const StoreCard = ({
  title = "Makeup By Sandali",
  tags,
  whatsappnumber = "0781717888",
  rating = 3,
  address,
  storeImages,
  id,
}: StoreCardProps) => {
  const navigate = useNavigate();

  const handleStoreClick = (id: string) => {
    navigate(`/store-details/${id}`);
  };

  return (
    <div className="flex rounded-md max-w-[750px] h-44 border-2 cursor-pointer">
      <div className="w-4/12 flex items-center justify-center">
        <Carousel
          showStatus={false}
          interval={3000}
          infiniteLoop
          stopOnHover={false}
          showIndicators={false}
          transitionTime={800}
          showThumbs={false}
          className="w-full h-full"
        >
          {storeImages.map((image, index) => (
            <div
              key={index}
              className="w-full h-44 flex items-center justify-center"
            >
              <img
                src={image}
                className="w-full h-full object-cover rounded-l-md"
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div
        className="w-8/12 p-3 flex flex-col justify-between"
        onClick={() => handleStoreClick(id)}
      >
        <div className="flex items-center justify-between">
          <h1>{title}</h1>
          <FcLike className="text-2xl" />
        </div>

        <div className="flex gap-2 items-center ">
          <p className="text-white bg-[#0d8012] rounded-md text-center py-[3px] w-[30px] text-xs">
            {rating}
          </p>
          <RatingComponent value={rating} />
          <div className="text-sm text-[#2a2a2a]">
            <span id="ratingCount">1</span> Ratings
          </div>
        </div>

        <div className="users-located-place flex items-center">
          <IonIcon icon={locationOutline}></IonIcon>
          <div>{address}</div>
        </div>

        <div>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <div>{whatsappnumber}</div>
            <div>Send Enquery</div>
            <div>Chat</div>
          </div>
          <div>test text</div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
