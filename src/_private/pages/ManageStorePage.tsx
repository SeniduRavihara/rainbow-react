import ImageSwiper from "@/_admin/components/ImageSwiper";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { db, storage } from "@/firebase/config";
import { useData } from "@/hooks/useData";
import { StoreObj, TimeValue } from "@/types";
import { doc, onSnapshot } from "firebase/firestore";
import { IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tag } from "@chakra-ui/react";
import { addLocation, togglePublish, updateStore } from "@/firebase/api";
import { useAuth } from "@/hooks/useAuth";
import { IoArrowBack } from "react-icons/io5";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import { cleanAddress } from "@/lib/utils";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
import "@/styles/phone-number-input.css";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ManageStorePage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState<string | undefined>();
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const [info1, setInfo1] = useState("");
  const [info2, setInfo2] = useState("");
  const [timevalue, setTimevalue] = useState<TimeValue | null>(null);
  const [schedulArr, setSchedulArr] = useState<
    Array<{ day: string; time: TimeValue }>
  >([
    { day: "Monday", time: ["08:00", "05:00"] },
    { day: "Tuesday", time: ["08:00", "05:00"] },
    { day: "Wednesday", time: ["08:00", "05:00"] },
    { day: "Thursday", time: ["08:00", "05:00"] },
    { day: "Friday", time: ["08:00", "05:00"] },
    { day: "Saturday", time: ["08:00", "05:00"] },
    { day: "Sunday", time: ["08:00", "05:00"] },
  ]);
  const [dayIndex, setDayIndex] = useState(0);
  const [storeImages, setStoreImages] = useState<
    Array<{
      index: number;
      file?: File;
      imageUrl: null | string;
    }>
  >([
    { index: 1, imageUrl: "" },
    { index: 2, imageUrl: "" },
    { index: 3, imageUrl: "" },
    { index: 4, imageUrl: "" },
    { index: 5, imageUrl: "" },
  ]);
  const [storeIcon, setStoreIcon] = useState<File | null>(null);
  const [currentUserStore, setCurrentUserStore] = useState<StoreObj | null>(
    null
  );
  const [fasebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");
  const [website, setWebsite] = useState("");

  const { currentUserData, locationArr } = useData();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUserData) {
      const documentRef = doc(db, "store", currentUserData?.id);
      const unsubscribe = onSnapshot(documentRef, (QuerySnapshot) => {
        const userStore = QuerySnapshot.data() as StoreObj;

        setCurrentUserStore(userStore);
      });

      return unsubscribe;
    }
  }, [currentUserData]);

  useEffect(() => {
    if (currentUserStore) {
      setInfo1(currentUserStore.info1);
      setInfo2(currentUserStore.info2);
      setAddress(currentUserStore.address);
      setPhoneNumber(currentUserStore.phoneNumber);
      setWhatsappNumber(currentUserStore.whatsappNumber);
      setTitle(currentUserStore.title);
      setTags(currentUserStore.tags);
      setFacebook(currentUserStore.fasebook);
      setInstagram(currentUserStore.instagram);
      setLinkedin(currentUserStore.linkedin);
      setTwitter(currentUserStore.twitter);
      setYoutube(currentUserStore.youtube);
      setWebsite(currentUserStore.website);
      setStoreImages((pre) =>
        pre.map((imgObj, index) => {
          return { ...imgObj, imageUrl: currentUserStore.storeImages[index] };
        })
      );
    }
  }, [currentUserStore]);

  const handleAddTag = (tag: string) => {
    if (!tag || tags.includes(tag)) return;
    setTagInput("");
    setTags((pre) => [...pre, tag]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (currentUser) {
      await handleUpload();
      const storeIconUrl = await uploadStoreIcon(currentUser.uid);
      // console.log("STORE", storeIconUrl);

      // const validStoreImages = storeImages.filter((img) => img !== undefined);
      const storeImageUrls = storeImages
        .map((img) => img.imageUrl)
        .filter((img) => img !== undefined);

      await updateStore(currentUser?.uid, {
        title,
        address,
        phoneNumber,
        whatsappNumber,
        tags,
        storeImages: storeImageUrls,
        storeIcon: storeIconUrl,
        email: currentUser.email,
        info1,
        info2,
        schedulArr,
        fasebook,
        instagram,
        linkedin,
        twitter,
        youtube,
        website,
      });
      // updateProfileForHaveStore(currentUser?.uid, true);
      await addLocation(
        cleanAddress(address),
        locationArr?.map((locationObj) => locationObj.location) || []
      );
    }
    setLoading(false);
    toast.success("Store Updated Successfully");
    // navigate("/manage-store");
  };

  const uploadStoreIcon = async (id: string) => {
    if (storeIcon) {
      try {
        const fileRef = ref(storage, `store_icons/${id}`);
        await uploadBytes(fileRef, storeIcon);
        const photoURL = await getDownloadURL(fileRef);

        return photoURL;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpload = async () => {
    if (storeImages.length > 0) {
      try {
        for (let i = 0; i < storeImages.length; i++) {
          const file = storeImages[i].file;
          const fileRef = ref(
            storage,
            `store_images/${currentUser?.uid}/${storeImages[i].index}`
          );

          if (!file) return;

          await uploadBytes(fileRef, file);
          const photoURL = await getDownloadURL(fileRef);

          // Update storeImages state with the uploaded image's URL
          setStoreImages((prevImages) => {
            const updatedImages = [...prevImages];

            // Image exists, update its URL
            updatedImages[i].imageUrl = photoURL;

            return updatedImages;
          });

          // console.log("Download URL:", photoURL);
        }
        console.log("All files uploaded successfully!");
      } catch (error) {
        console.error("Error uploading files:", error);
        alert(
          "An error occurred while uploading files. Please try again later."
        );
      }
    } else {
      alert("No images to upload!");
    }
  };

  useEffect(() => {
    if (timevalue) {
      setSchedulArr((pre) => {
        const preArr = [...pre];
        preArr[dayIndex].time = timevalue;
        return preArr;
      });
      setTimevalue(null);
    }
  }, [dayIndex, timevalue]);
  const handleNextDay = () => {
    setDayIndex((pre) => pre + 1);
  };
  const handlePrevDay = () => {
    setDayIndex((pre) => pre - 1);
  };

  // if (!currentUserStore) return <div>Loading...</div>;
  return (
    <div className="w-full min-h-screen text-center relative">
      <Button variant="outline" asChild className="absolute top-0 left-5">
        <Link to="/">
          <IoArrowBack />
        </Link>
      </Button>
      <h1 className="text-3xl font-bold mb-6 mt-4">Manage Store</h1>
      {currentUserData && currentUserData.haveStore && currentUserStore ? (
        <div className="flex flex-col gap-2 md:p-5">
          {/* <h2 className="text-xl font-semibold mb-4">Your Store</h2> */}
          <div className="flex flex-col gap-10 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-6/12 w-full flex items-center justify-center">
                <ImageSwiper
                  setStoreImages={setStoreImages}
                  storeImages={storeImages}
                />
              </div>
              <div
                className="gap-3 flex items-center justify-center md:w-6/12 w-full"
                id="logo-conten"
              >
                <input
                  id={`iconInput`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setStoreIcon(e.target.files[0]);
                    }
                  }}
                  required
                  className="hidden"
                />
                <button
                  className="photo-add-butto w-20 h-20 border rounded-md"
                  id="logo-button"
                  type="button"
                >
                  {storeIcon ? (
                    <img
                      src={URL.createObjectURL(storeIcon)}
                      alt="profile"
                      className="w-full h-full rounded-md object-cover"
                    />
                  ) : (
                    <IonIcon icon={addOutline}></IonIcon>
                  )}
                </button>
                <p className="text-center">
                  Select your logo{" "}
                  <label
                    htmlFor="iconInput"
                    className="text-blue-500 cursor-pointer"
                  >
                    Brower
                  </label>
                </p>
              </div>
            </div>
            {/* ----------------------------------------------------------- */}
            <div className="w-full px-3 gap-5">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 md:grid grid-cols-1 md:grid-cols-2 w-full text-left">
                  <>
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder=" title"
                        // className="p-[1rem] text-lg m-[10px] border-2 border-[#a7a7a7] rounded-xl focus:outline-blue-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        placeholder="address"
                        // className="p-[1rem] text-lg m-[10px] border-2 border-[#a7a7a7] rounded-xl focus:outline-blue-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        type="text"
                        id="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        placeholder="Phone number"
                        // className="p-[1rem] text-lg m-[10px] border-2 border-[#a7a7a7] rounded-xl focus:outline-blue-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="whatsapp">Whatsapp Number</Label>
                      <PhoneInput
                        value={whatsappNumber}
                        onChange={setWhatsappNumber}
                        placeholder="Whatsapp number"
                        className="px-[1rem] py-1 text-lg border rounded-md focus:outline-blue-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="info1">Discription1</Label>
                      <Textarea
                        id="info1"
                        value={info1}
                        onChange={(e) => setInfo1(e.target.value)}
                        required
                        placeholder=" info1"
                        // className="p-[1rem] text-lg m-[10px] border-2 border-[#a7a7a7] rounded-xl focus:outline-blue-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="info2">Discription2</Label>
                      <Textarea
                        id="info2"
                        value={info2}
                        onChange={(e) => setInfo2(e.target.value)}
                        required
                        placeholder="info2"
                        // className="p-[1rem] text-lg m-[10px] border-2 border-[#a7a7a7] rounded-xl focus:outline-blue-400"
                      />
                    </div>
                  </>

                  {/* ------------Shedul input---------------- */}
                  <div className="hidden md:flex col-span-2 items-center justify-between w-full px-20">
                    <button
                      type="button"
                      disabled={dayIndex <= 0}
                      onClick={handlePrevDay}
                    >
                      <IoMdArrowDropleft className="text-3xl" />
                    </button>
                    <div>{schedulArr[dayIndex].day}</div>
                    <TimeRangePicker
                      onChange={setTimevalue}
                      value={schedulArr[dayIndex].time}
                    />
                    <button
                      type="button"
                      disabled={dayIndex >= 6}
                      onClick={handleNextDay}
                    >
                      <IoMdArrowDropright className="text-3xl" />
                    </button>
                  </div>
                  {/* -------------------- */}
                  <div className="flex md:hidden flex-col items-center justify-between w-full">
                    <TimeRangePicker
                      onChange={setTimevalue}
                      value={schedulArr[dayIndex].time}
                    />
                    <div className="flex items-center justify-between w-[50%]">
                      <button
                        type="button"
                        disabled={dayIndex <= 0}
                        onClick={handlePrevDay}
                      >
                        <IoMdArrowDropleft className="text-3xl" />
                      </button>

                      <div>{schedulArr[dayIndex].day}</div>

                      <button
                        type="button"
                        disabled={dayIndex >= 6}
                        onClick={handleNextDay}
                      >
                        <IoMdArrowDropright className="text-3xl" />
                      </button>
                    </div>
                  </div>
                  {/* ------------------------------- */}
                  <div className="flex px-2 items-center justify-between col-span-2 text-lg m-[10px] border rounded-md focus:outline-blue-400">
                    <div className="flex items-center">
                      <div className="">
                        {tags.map((tag, index) => (
                          <Tag key={index} className="m-1">
                            {tag}
                          </Tag>
                        ))}
                      </div>

                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Tag"
                        className="p- text-lg m-[10px] outline-none"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // Prevent form submission
                            handleAddTag(tagInput);
                          }
                        }}
                      />
                    </div>

                    <button
                      className="bg-green-500 rounded-md text-white px-2 py-1"
                      onClick={() => handleAddTag(tagInput)}
                      type="button"
                    >
                      update
                    </button>
                  </div>

                  {/* --------------------Social Links------------------------- */}
                  <>
                    <hr className="col-span-2" />
                    <h1 className="col-span-2 text-2xl mt-5 mb-3 text-blue-500 text-left">
                      Social Links
                    </h1>
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="facebook" className="text-left">
                        Facebook
                      </Label>
                      <Input
                        type="text"
                        id="facebook"
                        value={fasebook}
                        onChange={(e) => setFacebook(e.target.value)}
                        placeholder="www.facebook.com/username"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label htmlFor="insta" className="text-left">
                        Instagram
                      </Label>
                      <Input
                        type="text"
                        id="insta"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="www.instagram.com/username"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label htmlFor="linkedin" className="text-left">
                        Linkedin
                      </Label>
                      <Input
                        type="text"
                        id="linkedin"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder="www.linkedin.com/username"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label htmlFor="twitter" className="text-left">
                        Twitter
                      </Label>
                      <Input
                        type="text"
                        id="twitter"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        placeholder="www.twitter.com/username"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label htmlFor="youtube" className="text-left">
                        Youtube
                      </Label>
                      <Input
                        type="text"
                        id="youtube"
                        value={youtube}
                        onChange={(e) => setYoutube(e.target.value)}
                        placeholder="www.youtube.com/username"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label htmlFor="linkedin" className="text-left">
                        Website
                      </Label>
                      <Input
                        type="text"
                        id="linkedin"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="www.yourWebsite.com"
                      />
                    </div>
                  </>

                  <div className="w-full col-span-2 flex items-center justify-center">
                    <Button
                      type="submit"
                      disabled={
                        !title ||
                        !address ||
                        !phoneNumber ||
                        !whatsappNumber ||
                        !tags ||
                        loading
                      }
                      className=" text-xl md:w-[200px] m-[10px] rounded-xl flex items-center justify-center p-3 text-white "
                    >
                      {loading ? (
                        <>
                          <Loader /> Loading...
                        </>
                      ) : (
                        "Update"
                      )}
                    </Button>

                    <Button
                    variant="destructive"
                      type="button"
                      onClick={() =>
                        togglePublish(
                          currentUserData.id,
                          currentUserStore.published
                        )
                      }
                      className=" text-xl md:w-[200px] m-[10px] rounded-xl flex items-center justify-center p-3 text-white"
                    >
                      {currentUserStore.published ? "Unpublish" : "Publish"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* <Button
            onClick={() =>
              togglePublish(currentUserData.id, currentUserStore.published)
            }
            className="w-32"
          >
            {currentUserStore.published ? "Unpublish" : "Publish"}
          </Button> */}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Create Your Store</h2>
          <p className="mb-4">
            It seems like you haven't created a store yet. Create one now to
            start selling!
          </p>
          <Link to="/create-store" className="text-blue-500 hover:underline">
            Create Store
          </Link>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Benefits of Having a Store
            </h2>
            <ul className=" pl-6">
              <li>Reach a wider audience</li>
              <li>Manage your products and inventory</li>
              <li>Accept payments online</li>
              <li>Track sales and analytics</li>
              {/* Add more benefits as needed */}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStorePage;
