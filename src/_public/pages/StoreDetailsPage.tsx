import { useData } from "@/hooks/useData";
import { StoreObj } from "@/types";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "../components/Navbar";
import SocialMediaArea from "@/components/sections/social-media-area";
import DiscriptionArea from "@/components/sections/discription-area";
import Footer from "@/components/footer";
import BottomBanner from "@/components/bottom-banner";
import RatingComponent from "../components/search-result-page/RatingComponent";
import { IonIcon } from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import ReviewsAndRatings from "../components/store-details-page/ReviewsAndRatings";
import OpenTimes from "../components/store-details-page/OpenTimes";
import DetailsPageAdds from "../components/store-details-page/DetailsPageAdds";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { FaEye, FaPhoneAlt } from "react-icons/fa";
import { whatsapp } from "@/assets";
import { PiShareFatLight } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { MdOutlineEdit } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircularProgress, Tag } from "@chakra-ui/react";
import { fetchStoreById, postEnquery } from "@/firebase/api";
import ProductAndServices from "../components/store-details-page/ProductAndServices";
import TabComponent from "../components/store-details-page/tabs/tab-cmponent/TabComponent";
import TopSlider from "../components/TopSlider";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  ViberIcon,
  WhatsappIcon,
  XIcon,
} from "react-share";

const StoreDetailsPage = () => {
  const [enquery, setEnquery] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const [phoneNum, setPhoneNum] = useState("");

  const { searchResultStores, currentUserData } = useData();
  const { currentUser } = useAuth();
  const [selectedStore, setSelectedStore] = useState<StoreObj | null>(null);

  const params = useParams();
  const storeId = params.storeId;
  const [detailsPageAdds, setDetailsPageAdds] = useState<Array<{
    imageUrl: string;
    id: string;
    link: string;
  }> | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Senidu", selectedStore?.showProfile);
    // if (!selectedStore?.showProfile) {
    //   navigate("/");
    // }
  }, [navigate, selectedStore?.showProfile]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const updateVisitCount = async () => {
      if (selectedStore && storeId) {
        try {
          const documentRef = doc(db, "store", storeId);
          await updateDoc(documentRef, {
            visitCount: selectedStore.visitCount + 1,
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    updateVisitCount();
  }, [selectedStore, storeId]);

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
      if (!searchResultStores && storeId) {
        const storeData = await fetchStoreById(storeId);
        setSelectedStore({ ...storeData, id: storeId } as StoreObj);
      } else {
        setSelectedStore(
          searchResultStores?.find((storeObj) => storeObj.id === storeId) ??
            null
        );
      }
    };

    fetchData();
  }, [navigate, searchResultStores, storeId]);

  const hndelCancelClick = () => {
    setOpenModel(false);
    setEnquery("");
  };

  const handleAddEnquery = async () => {
    if (enquery && selectedStore) {
      await postEnquery(
        {
          fromId: currentUserData?.id || "",
          fromName: currentUserData?.name || "",
          imageUrl: currentUser?.photoURL || "",
          message: enquery,
          email: currentUser?.email || "",
          phone: phoneNum,
        },
        selectedStore?.id.split("--")[0]
      );
    }
    setOpenModel(false);
    setEnquery("");
  };

  // if (!selectedStore) return <div>Loading...</div>;
  return (
    <div className="w-full">
      <div className="fixed top-0 left-0 z-50  p-2 md:p-5">
        <Navbar />
      </div>

      <div className="mt-44 725:mt-20 w-full ">
        {!selectedStore ? (
          <div className="w-full h-screen flex items-center justify-center">
            <CircularProgress size="60px" isIndeterminate color="green.300" />
          </div>
        ) : (
          <>
            {/* <Gallery /> */}
            <TopSlider storeId={selectedStore.id} />

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

              <div className=" flex-col gap-6 hidden md:flex items-center justify-center">
                <h2 className="text-3xl text-center text-blue-500 font-medium">
                  Share
                </h2>
                <div className="flex gap-2">
                  <FacebookShareButton
                    url={`https://srilankabusiness.lk/business-profile/${params.storeId}`}
                  >
                    <FacebookIcon className="w-7 h-7 rounded-lg" />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={`https://srilankabusiness.lk/business-profile/${params.storeId}`}
                  >
                    <XIcon className="w-7 h-7 rounded-lg" />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={`https://srilankabusiness.lk/business-profile/${params.storeId}`}
                  >
                    <LinkedinIcon className="w-7 h-7 rounded-lg" />
                  </LinkedinShareButton>
                  <WhatsappShareButton
                    url={`https://srilankabusiness.lk/business-profile/${params.storeId}`}
                  >
                    <WhatsappIcon className="w-7 h-7 rounded-lg" />
                  </WhatsappShareButton>
                  <TelegramShareButton
                    url={`https://srilankabusiness.lk/business-profile/${params.storeId}`}
                  >
                    <TelegramIcon className="w-7 h-7 rounded-lg" />
                  </TelegramShareButton>
                  <EmailShareButton
                    url={`https://srilankabusiness.lk/business-profile/${params.storeId}`}
                  >
                    <EmailIcon className="w-7 h-7 rounded-lg" />
                  </EmailShareButton>
                  <ViberShareButton
                    url={`https://srilankabusiness.lk/business-profile/${params.storeId}`}
                  >
                    <ViberIcon className="w-7 h-7 rounded-lg" />
                  </ViberShareButton>
                </div>
                {/* <button className="bg-blue-600 px-4 py-1 rounded-md text-white">
                  <h2>Enquire Now</h2>
                  <p className="text-xs">Get free details instantly via SMS</p>
                </button> */}
                <Dialog open={openModel} onOpenChange={setOpenModel}>
                  <DialogTrigger>
                    <button className="bg-blue-600 px-4 py-1 rounded-md text-white">
                      <h2>Enquire Now</h2>
                      <p className="text-xs">
                        Get free details instantly via SMS
                      </p>
                    </button>
                    {/* <Button
                      asChild
                      size="sm"
                      className=" flex px-2 py-1 gap-1 text-white items-center justify-center bg-blue-400 hover:bg-blue-400/90"
                    >
                      <h4>Send Enquery</h4>
                    </Button> */}
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add your Enquery</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-2">
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="name">Message</Label>
                          <Input
                            id="name"
                            className="col-span-3"
                            placeholder="Type your message..."
                            value={enquery}
                            onChange={(e) => setEnquery(e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            className="col-span-3"
                            placeholder="Phone number"
                            value={phoneNum}
                            onChange={(e) => setPhoneNum(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <DialogFooter className="sm:justify-start">
                      <div className="w-full flex items-center justify-center gap-2 px-10">
                        <Button type="button" onClick={hndelCancelClick}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddEnquery}>Send</Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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

            <SocialMediaArea />
          </>
        )}
        <DiscriptionArea />
        <Footer />
        <BottomBanner />
      </div>
    </div>
  );
};

export default StoreDetailsPage;
