
import { useData } from "@/hooks/useData";
import { StoreObj } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "../components/search-result-page/Navbar";
import SocialMediaArea from "@/components/sections/social-media-area";
import DiscriptionArea from "@/components/sections/discription-area";
import Footer from "@/components/footer";
import BottomBanner from "@/components/bottom-banner";
import { FcLike } from "react-icons/fc";
import RatingComponent from "../components/search-result-page/RatingComponent";
import { IonIcon } from "@ionic/react";
import { Tag } from "@chakra-ui/react";
import { locationOutline } from "ionicons/icons";
import ReviewsAndRatings from "../components/store-details-page/ReviewsAndRatings";
import Gallery from "../components/store-details-page/Gallery";
import OpenTimes from "../components/store-details-page/OpenTimes";
import DetailsPageAdds from "../components/store-details-page/DetailsPageAdds";
const StoreDetailsPage = () => {
  const { searchResultStores } = useData();
  const [selectedStore, setSelectedStore] = useState<StoreObj | null>(null);
  const params = useParams();
  const storeId = params.storeId;

  const navigate = useNavigate();

  useEffect(() => {
    if (!searchResultStores) navigate("/");
    setSelectedStore(
      searchResultStores?.find((storeObj) => storeObj.id === storeId) ?? null
    );
  }, [navigate, searchResultStores, storeId]);

  return (
    <div className="w-full min-h-screen">
      <div className="fixed top-0 left-0 z-50">
        <Navbar />
      </div>

      <div className="mt-20 w-full ">
        <Gallery />
        <div className="flex justify-between">
          <div>
            <div className="flex rounded-md max-w-[750px] h-44 border-2">
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
                  {selectedStore?.storeImages.map((image, index) => (
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
              <div className="w-8/12 p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <h1>{selectedStore?.title}</h1>
                  <FcLike className="text-2xl" />
                </div>

                <div className="flex gap-2 items-center ">
                  <p className="text-white bg-[#0d8012] rounded-md text-center py-[3px] w-[30px] text-xs">
                    {3}
                  </p>
                  <RatingComponent value={2} />
                  <div className="text-sm text-[#2a2a2a]">
                    <span id="ratingCount">1</span> Ratings
                  </div>
                </div>

                <div className="users-located-place flex items-center">
                  <IonIcon icon={locationOutline}></IonIcon>
                  <div>{selectedStore?.address}</div>
                </div>

                <div>
                  <Tag>{selectedStore?.tags}</Tag>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <div>{selectedStore?.whatssappNumber}</div>
                    <div>Send Enquery</div>
                    <div>Chat</div>
                  </div>
                  <div>test text</div>
                </div>
              </div>
            </div>

            <ReviewsAndRatings />
          </div>
          <div className="flex flex-col gap-10">
            <OpenTimes />
            <DetailsPageAdds />
          </div>
        </div>
        <SocialMediaArea />
        <DiscriptionArea />
        <Footer />
        <BottomBanner />
      </div>
    </div>
  );
};

export default StoreDetailsPage;
