import { useData } from "@/hooks/useData";
import { StoreObj } from "@/types";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { locationOutline } from "ionicons/icons";
import ReviewsAndRatings from "../components/store-details-page/ReviewsAndRatings";
// import Gallery from "../components/store-details-page/Gallery";
import OpenTimes from "../components/store-details-page/OpenTimes";
import DetailsPageAdds from "../components/store-details-page/DetailsPageAdds";
// import TabComponent from "../components/store-details-page/tabs/TabComponent";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import { FaPhoneAlt } from "react-icons/fa";
import { fb, insta, linkedin, twitter, whatsapp, yt } from "@/assets";
import { PiShareFatLight } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { MdOutlineEdit } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tag } from "@chakra-ui/react";
import InfoTab from "../components/store-details-page/tabs/InfoTab";

const StoreDetailsPage = () => {
  const { searchResultStores, currentUserData } = useData();
  const [selectedStore, setSelectedStore] = useState<StoreObj | null>(null);
  const params = useParams();
  const storeId = params.storeId;
  const [detailsPageAdds, setDetailsPageAdds] = useState<Array<{
    imageUrl: string;
    id: string;
  }> | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "detailsPageAdds");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const searchResultAdds = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<{ imageUrl: string; id: string }>;

      // console.log(searchResultAdds);
      setDetailsPageAdds(searchResultAdds);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!searchResultStores) navigate("/");
    setSelectedStore(
      searchResultStores?.find((storeObj) => storeObj.id === storeId) ?? null
    );
  }, [navigate, searchResultStores, storeId]);



  return (
    <div className="w-full">
      <div className="fixed top-0 left-0 z-50  p-2 md:p-5">
        <Navbar />
      </div>

      <div className="mt-20 w-full">
        {/* <Gallery /> */}
        <div className="w-full flex items-center justify-between pt-2 px-2">
          {/* ----------Desktop--------- */}
          <div className="hidden md:flex rounded-md max-w-[750px] h-44 ">
            <div className="w-4/12 flex items-center justify-center ">
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
                {/* <FcLike className="text-2xl" /> */}
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

              <div className="flex gap-1">
                {selectedStore?.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  {/* <div>{selectedStore?.whatsappNumber}</div>    TODO */}
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        size="sm"
                        className="flex gap-1 items-center px-2 py-1 rounded-md justify-center bg-green-600 hover:bg-green-600/90 text-white"
                      >
                        <FaPhoneAlt className="text-xs" />
                        <h4>Show Number</h4>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-52 px-3 py-2 text-center">
                      {selectedStore?.whatsappNumber}
                    </PopoverContent>
                  </Popover>
                  {/* <div>Send Enquery</div> */}
                  <Link
                    to={`https://wa.me/${selectedStore?.whatsappNumber.replace(
                      "+",
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex gap-1 items-center justify-center"
                    >
                      <img src={whatsapp} className="w-5" />
                      <h4>Chat</h4>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex px-2 py-1 gap-1 items-center justify-center"
                  >
                    <PiShareFatLight />
                    <h4>Share</h4>
                  </Button>
                  {selectedStore?.id === currentUserData?.id && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex px-2 py-1 gap-1 items-center justify-center"
                    >
                      <MdOutlineEdit />
                      <h4>Edit</h4>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ----------Mobile------------ */}
          <div className="flex flex-col md:hidden rounded-md w-full border-2">
            <div className="w-full flex items-center justify-center ">
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
            <div className="w-full gap-2 p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-medium">{selectedStore?.title}</h1>
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

              <div className="flex gap-1">
                {selectedStore?.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </div>

              <div className="flex items-start flex-col text-sm justify-start sm:flex-row sm:justify-between">
                <div className="flex gap-2 items-center">
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        size="sm"
                        className="flex gap-1 items-center px-2 py-1 rounded-md justify-center bg-green-600 hover:bg-green-600/90 text-white"
                      >
                        <FaPhoneAlt className="text-xs" />
                        <h4>Show Number</h4>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-52 px-3 py-2 text-center">
                      {selectedStore?.whatsappNumber}
                    </PopoverContent>
                  </Popover>

                  {/* <div>Send Enquery</div> */}
                  <Link
                    to={`https://wa.me/${selectedStore?.whatsappNumber.replace(
                      "+",
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex gap-1 items-center justify-center"
                    >
                      <img src={whatsapp} className="w-5" />
                      <h4>Chat</h4>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex px-2 py-1 gap-1 items-center justify-center"
                  >
                    <PiShareFatLight />
                    <h4>Share</h4>
                  </Button>
                  {selectedStore?.id === currentUserData?.id && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex px-2 py-1 gap-1 items-center justify-center"
                      onClick={() => navigate("/manage-store")}
                    >
                      <MdOutlineEdit />
                      <h4>Edit</h4>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ------ */}

          <div className=" flex-col gap-6 hidden md:flex">
            <h2 className="text-3xl text-center text-blue-500 font-medium">
              Share
            </h2>
            <div className="ad flex">
              <a href="#" className="scl-md-links">
                <img src={fb} alt="" />
              </a>
              <a href="#" className="scl-md-links">
                <img src={yt} alt="" />
              </a>
              <a href="#" className="scl-md-links">
                <img src={insta} alt="" />
              </a>
              <a href="#" className="scl-md-links">
                <img src={linkedin} alt="" />
              </a>
              <a href="#" className="scl-md-links">
                <img src={twitter} alt="" />
              </a>
            </div>
            <button className="bg-blue-600 px-4 py-1 rounded-md text-white">
              <h2>Enquire Now</h2>
              <p className="text-xs">Get free details instantly via SMS</p>
            </button>
          </div>
        </div>
        <div className=" flex flex-col gap-4 md:flex-row md:flex md:justify-between">
          <div className="w-full flex flex-col md:w-9/12">
            {/* <TabComponent selectedStore={selectedStore} /> */}
            <div className="my-5 px-3">
              <div className="">Information</div>
              {selectedStore && (
                <InfoTab
                  info1={selectedStore.info1}
                  info2={selectedStore.info2}
                />
              )}
            </div>
            <ReviewsAndRatings selectedStore={selectedStore} />
          </div>

          <div className="flex flex-col gap-10 md:mt-14 w-full md:w-3/12 px-10 md:px-1">
            <OpenTimes schedulArr={selectedStore?.schedulArr || []} />
            <DetailsPageAdds detailsPageAdds={detailsPageAdds} />
          </div>
        </div>

        <SocialMediaArea
          facebookUrl={selectedStore?.fasebook}
          instagramUrl={selectedStore?.instagram}
          linkedinUrl={selectedStore?.linkedin}
          twitterUrl={selectedStore?.twitter}
          youtubeUrl={selectedStore?.youtube}
        />
        <DiscriptionArea />
        <Footer />
        <BottomBanner />
      </div>
    </div>
  );
};

export default StoreDetailsPage;
