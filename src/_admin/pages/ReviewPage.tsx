import { useData } from "@/hooks/useData";
import { StoreObj } from "@/types";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import SocialMediaArea from "@/components/sections/social-media-area";
import DiscriptionArea from "@/components/sections/discription-area";
import Footer from "@/components/footer";
import BottomBanner from "@/components/bottom-banner";
import RatingComponent from "@/_public/components/search-result-page/RatingComponent";
import { IonIcon } from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import ReviewsAndRatings from "@/_public/components/store-details-page/ReviewsAndRatings";
import OpenTimes from "@/_public/components/store-details-page/OpenTimes";
import DetailsPageAdds from "@/_public/components/store-details-page/DetailsPageAdds";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { FaEye, FaPhoneAlt } from "react-icons/fa";
import { fb, insta, linkedin, twitter, whatsapp, yt } from "@/assets";
import { PiShareFatLight } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { MdOutlineEdit } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircularProgress, Tag } from "@chakra-ui/react";
import ProductAndServices from "@/_public/components/store-details-page/ProductAndServices";
import TabComponent from "@/_public/components/store-details-page/tabs/tab-cmponent/TabComponent";
import ReviewTopSlider from "../components/ReviewTopSlider";

const ReviewPage = () => {
  const { currentUserData } = useData();
  const [selectedStore, setSelectedStore] = useState<StoreObj | null>(null);
  const [haveLatestUpdate, setHaveLatestUpdate] = useState(false);

  const params = useParams();
  const storeId = params.storeId;
  const [detailsPageAdds, setDetailsPageAdds] = useState<Array<{
    imageUrl: string;
    id: string;
    link: string;
  }> | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const checkDocument = async () => {
      if (storeId) {
        try {
          const documentRef = doc(db, "latestStore", storeId);
          const documentSnapshot = await getDoc(documentRef);

          // Check if the document exists
          const documentExists = documentSnapshot.exists();

          console.log(documentExists);

          // Update state based on document existence
          setHaveLatestUpdate(documentExists);
        } catch (error) {
          console.error("Error checking document existence:", error);
          setHaveLatestUpdate(false);
        }
      }
    };

    checkDocument();
  }, [storeId]);

  useEffect(() => {
    const collectionRef = collection(db, "detailsPageAdds");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const searchResultAdds = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<{ imageUrl: string; id: string; link: string }>;

      // console.log(searchResultAdds);
      setDetailsPageAdds(searchResultAdds);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (storeId) {
        try {
          const documentRef = doc(db, "latestStore", storeId);
          const documentSnapshot = await getDoc(documentRef);

          // Check if the document exists
          const documentExists = documentSnapshot.exists();

          console.log(documentExists);

          if (documentExists) {
            const documentRef = doc(db, "latestStore", storeId);
            const storeData = await getDoc(documentRef);

            // const storeData = await fetchStoreById(storeId);
            setSelectedStore({ ...storeData.data(), id: storeId } as StoreObj);
          } else {
            const documentRef = doc(db, "store", storeId);
            const storeData = await getDoc(documentRef);

            // const storeData = await fetchStoreById(storeId);
            setSelectedStore({ ...storeData.data(), id: storeId } as StoreObj);
          }
        } catch (error) {
          console.error("Error checking document existence:", error);
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId, haveLatestUpdate]);

  //   const fetchStoreById = async (storeId: string) => {

  //       const documentRef = doc(db, "latestStore", storeId);
  //       try {
  //         const storeData = await getDoc(documentRef);
  //         return storeData?.data() as StoreObj;
  //       } catch (error) {
  //         console.log(error);
  //       }

  //   };

  // if (!selectedStore) return <div>Loading...</div>;
  return (
    <div className="w-full">
      <div className="mt-44 725:mt-20 w-full ">
        {!selectedStore ? (
          <div className="w-full h-screen flex items-center justify-center">
            <CircularProgress size="60px" isIndeterminate color="green.300" />
          </div>
        ) : (
          <>
            {/* <Gallery /> */}
            <ReviewTopSlider storeId={selectedStore.id} />

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

                <div className="w-8/12 px-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">
                      {selectedStore?.title}
                    </h1>
                    <div className="flex items-center justify-center gap-2">
                      <FaEye className="text-2xl" />
                      {selectedStore?.visitCount || 0}views
                    </div>
                  </div>

                  <div className="flex gap-2 items-center ">
                    <p className="text-white bg-[#0d8012] rounded-md text-center py-[3px] w-[30px] text-xs">
                      {selectedStore?.rating}
                    </p>
                    <RatingComponent value={selectedStore?.rating} />
                    <div className="text-sm text-[#2a2a2a]">
                      <span id="ratingCount">{selectedStore?.reviewCount}</span>{" "}
                      Reviews
                    </div>
                    {selectedStore.verified && (
                      <img src="/icons/verified_2x.gif" className="w-11 h-5" />
                    )}
                  </div>

                  <div className="users-located-place flex items-center">
                    <IonIcon icon={locationOutline}></IonIcon>
                    <div>{selectedStore?.address}</div>
                  </div>

                  {/* <div className="flex gap-1">
                    {selectedStore?.tags.map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                  </div> */}
                  <div className="my-1">
                    {selectedStore?.tags.slice(0, 4).map((tag, index) => (
                      <Tag key={index} className="mx-[2px]">
                        {tag}
                      </Tag>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <Popover>
                        <PopoverTrigger asChild>
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
                    <h1 className="text-2xl font-semibold">
                      {selectedStore?.title}
                    </h1>
                    <div className="flex items-center justify-center gap-2">
                      <FaEye className="text-2xl" />
                      {selectedStore?.visitCount || 0}views
                    </div>
                  </div>

                  <div className="flex gap-2 items-center ">
                    <p className="text-white bg-[#0d8012] rounded-md text-center py-[3px] w-[30px] text-xs">
                      {3}
                    </p>
                    <RatingComponent value={2} />
                    <div className="text-sm text-[#2a2a2a]">
                      <span id="ratingCount">1</span> Ratings
                    </div>
                    {selectedStore.verified && (
                      <img src="/icons/verified_2x.gif" className="w-11 h-5" />
                    )}
                  </div>

                  <div className="users-located-place flex items-center">
                    <IonIcon icon={locationOutline}></IonIcon>
                    <div>{selectedStore?.address}</div>
                  </div>

                  <div className="my-1">
                    {selectedStore?.tags.slice(0, 4).map((tag, index) => (
                      <Tag key={index} className="mx-[2px]">
                        {tag}
                      </Tag>
                    ))}
                  </div>

                  <div className="flex items-start flex-col text-sm justify-start sm:flex-row sm:justify-between">
                    <div className="flex gap-2 items-center">
                      <Popover>
                        <PopoverTrigger asChild>
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
                          onClick={() => navigate("/manage-business-profile")}
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
                <TabComponent selectedStore={selectedStore} />
                {/* <div className="my-5 px-3">
                  <div className="">Information</div>
                  {selectedStore && (
                    <InfoTab
                      info1={selectedStore.info1}
                      info2={selectedStore.info2}
                    />
                  )}
                </div> */}

                <ProductAndServices
                  tags={selectedStore.tags}
                  category={selectedStore.category}
                />

                {storeId && <ReviewsAndRatings selectedStoreId={storeId} />}
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
          </>
        )}
        <DiscriptionArea />
        <Footer />
        <BottomBanner />
      </div>
    </div>
  );
};

export default ReviewPage;
