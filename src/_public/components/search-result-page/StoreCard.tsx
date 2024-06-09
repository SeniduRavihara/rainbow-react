import { Carousel } from "react-responsive-carousel";
import { FcLike } from "react-icons/fc";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RatingComponent from "./RatingComponent";
import { IonIcon } from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import { Tag } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaPhoneAlt } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { postEnquery } from "@/firebase/api";
import { useData } from "@/hooks/useData";
import { useAuth } from "@/hooks/useAuth";
import { whatsapp } from "@/assets";
// import { MdVerified } from "react-icons/md";
import { Label } from "@/components/ui/label";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

type StoreCardProps = {
  title: string;
  whatsappnumber: string;
  tags: string[];
  address: string;
  storeImages: string[];
  id: string;
  reviewCount: number;
  rating: number;
  verified: boolean;
  showProfile: boolean;
  storeName: string;
  visitCount: number;
};

const StoreCard = ({
  title,
  tags,
  whatsappnumber,
  rating = 0,
  address,
  storeImages,
  id,
  reviewCount = 0,
  verified = false,
  showProfile = false,
  storeName,
  visitCount,
}: StoreCardProps) => {
  const [enquery, setEnquery] = useState("");
  const [openModel, setOpenModel] = useState(false);

  const [phoneNum, setPhoneNum] = useState("");

  const { currentUserData } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleStoreClick = async (storeId: string) => {
    console.log("sdhfd", storeId);

    if (showProfile) {
      updateVisitCount(storeId);
      const formattedStoreName = storeName.replace(/\s+/g, "-");
      navigate(`/business-profile/${formattedStoreName}`);
    }
  };

  const hndelCancelClick = () => {
    setOpenModel(false);
    setEnquery("");
  };

  const handleAddEnquery = async () => {
    if (enquery) {
      await postEnquery(
        {
          fromId: currentUserData?.id || "",
          fromName: currentUserData?.name || "",
          imageUrl: currentUser?.photoURL || "",
          message: enquery,
          email: currentUser?.email || "",
          phone: phoneNum,
        },
        id.split("--")[0]
      );
    }
    setOpenModel(false);
    setEnquery("");
  };

  const updateVisitCount = async (storeId: string) => {
    if (storeId) {
      try {
        const documentRef = doc(db, "store", storeId);
        await updateDoc(documentRef, {
          visitCount: visitCount + 1,
        });

        await updateDoc(doc(db, "latestStore", storeId), {
          visitCount: visitCount + 1,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="hidden md:flex rounded-md max-w-[750px] items-center min-h-44 border-2 cursor-pointer ">
        <div className="w-4/12 flex items-center justify-center h-full ">
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
                className="w-full h-44 flex items-center justify-center "
              >
                <img
                  src={image}
                  className="w-full h-full object-cover rounded-l-md "
                />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="w-8/12 px-3 py-2 flex flex-col justify-between">
          <div
            className="w-full flex flex-col justify-between"
            onClick={() => handleStoreClick(id)}
          >
            <div className="flex items-center justify-between mb-2">
              <h1 className="font-semibold text-[23px]">{title}</h1>
              <FcLike className="text-2xl" />
            </div>

            <div className="flex gap-2 items-center ">
              <p className="text-white bg-[#0d8012] rounded-md text-center py-[3px] w-[30px] text-xs">
                {rating}
              </p>
              <RatingComponent value={rating} />
              <div className="text-sm text-[#2a2a2a]">
                <span id="ratingCount">{reviewCount}</span> Reviews
              </div>
              {verified && (
                <img src="/icons/verified_2x.gif" className="w-11 h-5" />
              )}
            </div>

            <div className="users-located-place flex items-center">
              <IonIcon icon={locationOutline}></IonIcon>
              <div>{address}</div>
            </div>

            <div className="my-1">
              {tags.filter((tag) => tag.length < 15).length < 4
                ? tags.slice(0, 2).map((tag, index) => (
                    <Tag key={index} className="mx-[2px]">
                      {tag}
                    </Tag>
                  ))
                : tags.slice(0, 4).map((tag, index) => (
                    <Tag key={index} className="mx-[2px]">
                      {tag}
                    </Tag>
                  ))}

              {/* {tags.slice(0, 4).map((tag, index) => (
                <Tag key={index} className="mx-[2px]">
                  {tag}
                </Tag>
              ))} */}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <Button
                size="sm"
                className="flex gap-1 items-center px-2 py-1 rounded-md justify-center bg-green-600 hover:bg-green-600/90 text-white"
              >
                <FaPhoneAlt className="text-xs" />
                <h4>
                  <a className="text-white" href={`tel:${whatsappnumber}`}>
                    {whatsappnumber}
                  </a>
                </h4>
              </Button>
              <Dialog open={openModel} onOpenChange={setOpenModel}>
                <DialogTrigger>
                  <Button
                    asChild
                    size="sm"
                    className=" flex px-2 py-1 gap-1 text-white items-center justify-center bg-blue-400 hover:bg-blue-400/90"
                  >
                    <h4>Send Enquery</h4>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Send your Enquery</DialogTitle>
                  </DialogHeader>

                  <div className="grid gap-4 py-2">
                    <div className="">
                      <Input
                        id="name"
                        className="col-span-3"
                        placeholder="Your Message"
                        value={enquery}
                        onChange={(e) => setEnquery(e.target.value)}
                      />
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
              <Link
                to={`https://wa.me/${whatsappnumber
                  .replace("+", "")
                  .replace(" ", "")}`}
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
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------Mobile View---------------------------- */}
      <div className="flex  flex-col md:hidden rounded-md border-2 cursor-pointer">
        <div className="w-full flex items-center justify-center">
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

        <div className="w-full p-3 flex flex-col justify-between gap-1">
          <div
            className="w-full  flex flex-col justify-between gap-1"
            onClick={() => handleStoreClick(id)}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-[23px] font-semibold">{title}</h1>
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
              {verified && (
                <img src="/icons/verified_2x.gif" className="w-11 h-5" />
              )}
            </div>

            <div className="users-located-place flex items-center">
              <IonIcon icon={locationOutline}></IonIcon>
              <div>{address}</div>
            </div>

            <div>
              {tags
                .filter((tag) => tag.length < 35)
                .slice(0, 4)
                .map((tag, index) => (
                  <Tag key={index} className="mx-[2px]">
                    {tag}
                  </Tag>
                ))}

              {/* {tags.slice(0, 4).map((tag, index) => (
                <Tag key={index} className="mx-[2px]">
                  {tag}
                </Tag>
              ))} */}
            </div>
          </div>

          <div className="flex items-start flex-col text-sm justify-start sm:flex-row sm:justify-between">
            <div className="flex gap-2 items-center">
              <Button
                size="sm"
                className="flex gap-1 items-center px-2 py-1 rounded-md justify-center bg-green-600 hover:bg-green-600/90 text-white"
              >
                <FaPhoneAlt className="text-xs" />
                <h4>
                  <a className="text-white" href={`tel:${whatsappnumber}`}>
                    {whatsappnumber}
                  </a>
                </h4>
              </Button>
              <Dialog open={openModel} onOpenChange={setOpenModel}>
                <DialogTrigger>
                  <Button
                    asChild
                    size="sm"
                    className=" flex px-2 py-1 gap-1 text-white items-center justify-center bg-blue-400 hover:bg-blue-400/90"
                  >
                    <h4>Send Enquery</h4>
                  </Button>
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

              <Link
                to={`https://wa.me/${whatsappnumber
                  .replace("+", "")
                  .replace(" ", "")}`}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
