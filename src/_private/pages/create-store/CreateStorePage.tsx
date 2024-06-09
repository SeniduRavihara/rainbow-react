import ImageSwiper from "../../components/ImageSwiper";
import React, {  useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
// import { IoArrowBack } from "react-icons/io5";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebase/config";
import { useAuth } from "@/hooks/useAuth";
import {
  addLocation,
  checkIsStoreNameAvailable,
  createStore,
  syncLatestStoreWithStore,
  updateProfileForHaveStore,
  updateStore2,
} from "@/firebase/api";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { Kbd, Select, Tag } from "@chakra-ui/react";
import {
  IoIosArrowBack,
  IoIosClose,
  IoMdArrowDropleft,
  IoMdArrowDropright,
} from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import { TimeValue } from "@/types";
import { cleanAddress } from "@/lib/utils";
import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
import "@/styles/phone-number-input.css";
import { useData } from "@/hooks/useData";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { addDoc, collection } from "firebase/firestore";
import { logo } from "@/assets";
// import { categories } from "@/constants";
// import { collection, onSnapshot } from "firebase/firestore";
// import CustomTag from "@/components/CustomTag";
// import { RxCross2 } from "react-icons/rx";

const CreateStorePage = () => {
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
  const { currentUser } = useAuth();
  const { locationArr, currentUserData, categories } = useData();
  const navigate = useNavigate();

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
  // const [storeIcon, setStoreIcon] = useState<File | null>(null);

  const [fasebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [website, setWebsite] = useState("");

  const [openModel, setOpenModel] = useState(false);
  const [userCategory, setUserCategory] = useState(""); //Requsested category
  const [category, setCategory] = useState("");
  // const [visibleCategories, setVisibleCategories] =
  //   useState<Array<{ icon: string; label: string }>>(categories);

  // useEffect(() => {
  //   const collectionRef = collection(db, "categories");
  //   const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
  //     const categoryArr = QuerySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //     })) as Array<{ icon: string; label: string }>;

  //     // console.log(categoryArr);
  //     setVisibleCategories((pre) => [...pre, ...categoryArr]);
  //   });

  //   return unsubscribe;
  // }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (currentUser) {
      // await handleUpload();

      const payLoad = {
        storeImages: [],
        storeIcon: "",
        title,
        address,
        phoneNumber,
        whatsappNumber,
        info1,
        info2,
        schedulArr,
        tags,
        fasebook,
        instagram,
        linkedin,
        twitter,
        youtube,
        tiktok,
        website,
        category,
        email: currentUser.email,
      };

      const isStoreNameAvailable = await checkIsStoreNameAvailable(title);

      if (!isStoreNameAvailable) {
        toast.error("Business name already exists. Try a different name.");
        setLoading(false);
        return;
      }
      const storeId = await createStore(currentUser?.uid, payLoad);

      if (storeId) {
        // console.log("HAVE STOREID", storeId);

        const storeImageUrlList = await handleUpload(storeId);
        // console.log("STORE IMAGES", storeImages);
        // const storeIconUrl = await uploadStoreIcon(storeId);

        await updateStore2(storeId, {
          // storeIcon: storeIconUrl,
          storeImages: storeImageUrlList?.filter((url) => url),
        });

        await syncLatestStoreWithStore(storeId);
      }

      updateProfileForHaveStore(currentUser?.uid, true);
      await addLocation(
        cleanAddress(address),
        locationArr?.map((locationObj) => locationObj.location) || []
      );
      setLoading(false);
      toast.success("Store created successfully");

      if (currentUserData?.roles.includes("admin")) {
        navigate(`/manage-business-profile/${storeId}`);
        return;
      }

      navigate("/manage-business-profile/userStore");
    }
  };

  const handleUpload = async (storeId: string) => {
    if (storeImages.length > 0) {
      const storeImageUrlList = [];
      try {
        for (let i = 0; i < storeImages.length; i++) {
          const file = storeImages[i].file;
          const fileRef = ref(
            storage,
            `store_data/${storeId}/store-images/${storeImages[i].index}`
          );

          if (!file) {
            storeImageUrlList.push(storeImages[i].imageUrl);
            continue;
          }

          await uploadBytes(fileRef, file);
          const photoURL = await getDownloadURL(fileRef);

          storeImageUrlList.push(photoURL);

          // Update storeImages state with the uploaded image's URL
          // setStoreImages((prevImages) => {
          //   const updatedImages = [...prevImages];

          //   // Image exists, update its URL
          //   updatedImages[i].imageUrl = photoURL;

          //   return updatedImages;
          // });
        }
        console.log("All files uploaded successfully!");
        return storeImageUrlList;
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

  // const uploadStoreIcon = async (storeId: string) => {
  //   if (storeIcon) {
  //     try {
  //       const fileRef = ref(
  //         storage,
  //         `store_data/${storeId}/store_icons/${storeId}`
  //       );
  //       await uploadBytes(fileRef, storeIcon);
  //       const photoURL = await getDownloadURL(fileRef);

  //       return photoURL;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

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

  // --------------------------

  // const handleRemoveCatogary = (label: string) => {
  //   setCategoriesArr((pre) => [...pre.filter((preObj) => preObj !== label)]);
  // };

  // ------------------Categories----------------------------
  const handleCancelClick = () => {
    setOpenModel(false);
    setUserCategory("");
  };

  const handleAddUserCategory = async () => {
    if (userCategory && currentUser) {
      toast.success("Request Send to Admin");
      const adminMessagesCollectionRef = collection(db, "adminMessages");
      await addDoc(adminMessagesCollectionRef, {
        message: `I would like to add ${userCategory} as a new category`,
        createdAt: new Date(),
        imageUrl: "",
        fromName: "",
        fromId: currentUser.uid,
        toName: "admin",
        toId: "",
        seen: false,
      });
    }
    setOpenModel(false);
    setUserCategory("");
  };

  // ------------------Tag--------------------------

  const handleAddTag = (tag: string) => {
    if (!tag || tags.includes(tag)) return;
    setTagInput("");
    setTags((pre) => [...pre, tag]);
  };

  const handleDelete = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-10 items-center justify-center relative">
      <>
        <div className="md:absolute md:-top-2 md:left-5 flex text-4xl font-extralight items-center mt-4 justify-center">
          <Link
            className="relative -left-3"
            to="/manage-business-profiles"

            // className="absolute top-0 left-5 w-10 h-10 text-4xl font-extralight"
          >
            <Button variant="outline">
              <IoIosArrowBack />
            </Button>
          </Link>

          <Link to="/" className="flex items-center justify-center">
            <img src={logo} alt="logo" className="h-12 w-36" />
          </Link>
        </div>

        <h1 className="text-xl font-bold md:mt-6">
          Register Your Business Profile
        </h1>
      </>

      <div className="flex flex-col gap-10 items-center justify-between">
        <div className="md:w-6/12 w-full flex items-center justify-center">
          <ImageSwiper
            setStoreImages={setStoreImages}
            storeImages={storeImages}
          />
        </div>

        {/* ----------------------- */}
        <div className="w-full px-3 gap-5">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 md:grid grid-cols-1 md:grid-cols-2 w-full">
              <>
                <div>
                  <Label htmlFor="title">Business name</Label>
                  <Input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="Business name"
                    className="focus-visible:ring-blue-500"
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
                    className="focus-visible:ring-blue-500"
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
                    className="focus-visible:ring-blue-500"
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
                    className="h-[200px] focus-visible:ring-blue-500 focus-visible:ring-1"
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
                    className="h-[200px] focus-visible:ring-blue-500 focus-visible:ring-1"
                  />
                </div>
              </>

              {/* ------------Shedul input---------------- */}
              <>
                <div className="hidden md:flex col-span-2 items-center justify-between w-full px-20 bg-gray-200 rounded-md">
                  <button
                    type="button"
                    disabled={dayIndex <= 0}
                    onClick={handlePrevDay}
                  >
                    <IoMdArrowDropleft className="text-5xl text-orange-500" />
                  </button>
                  <div>{schedulArr[dayIndex].day}</div>
                  <TimeRangePicker
                    onChange={setTimevalue}
                    value={schedulArr[dayIndex].time}
                    className="border rounded-md outline-none px-4 py-2"
                  />
                  <button
                    type="button"
                    disabled={dayIndex >= 6}
                    onClick={handleNextDay}
                  >
                    <IoMdArrowDropright className="text-5xl text-orange-500" />
                  </button>
                </div>
                {/* -------------------- */}
                <div className="flex md:hidden flex-col items-center justify-between w-full bg-gray-200 rounded-md">
                  <TimeRangePicker
                    onChange={setTimevalue}
                    value={schedulArr[dayIndex].time}
                    className="border rounded-md outline-none px-4 py-2"
                  />
                  <div className="flex items-center justify-between w-[50%]">
                    <button
                      type="button"
                      disabled={dayIndex <= 0}
                      onClick={handlePrevDay}
                    >
                      <IoMdArrowDropleft className="text-5xl text-orange-500" />
                    </button>

                    <div>{schedulArr[dayIndex].day}</div>

                    <button
                      type="button"
                      disabled={dayIndex >= 6}
                      onClick={handleNextDay}
                    >
                      <IoMdArrowDropright className="text-5xl text-orange-500" />
                    </button>
                  </div>
                </div>
              </>

              {/* -----------------Tag input---------------------------- */}
              <div className="col-span-2 flex flex-col">
                <div className="tag-input-component">
                  <ul className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <li>
                        <Tag className="flex items-center gap-2 justify-between px-2 py-2">
                          {tag}
                          <IoIosClose
                            onClick={() => handleDelete(tag)}
                            className="text-2xl"
                          />
                        </Tag>
                      </li>
                    ))}
                  </ul>

                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag"
                    className="focus-visible:ring-blue-500 mt-3"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Prevent form submission
                        handleAddTag(tagInput);
                      }
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => handleAddTag(tagInput)}
                >
                  Update
                </button>

                <Label className="text-xs text-gray-400 text-center mt-3">
                  Press <Kbd className="text-gray-500">Enter</Kbd> after every
                  tag
                </Label>
              </div>

              {/* --------------------Social Links------------------------- */}
              <>
                <hr className="col-span-2" />
                <h1 className="col-span-2 text-xl text-blue-500">
                  Social Links
                </h1>
                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    type="text"
                    id="facebook"
                    value={fasebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    placeholder="www.facebook.com/username"
                    className="focus-visible:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="insta">Instagram</Label>
                  <Input
                    type="text"
                    id="insta"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="www.instagram.com/username"
                    className="focus-visible:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="linkedin">Linkedin</Label>
                  <Input
                    type="text"
                    id="linkedin"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="www.linkedin.com/username"
                    className="focus-visible:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    type="text"
                    id="twitter"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="www.twitter.com/username"
                    className="focus-visible:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="youtube">Youtube</Label>
                  <Input
                    type="text"
                    id="youtube"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    placeholder="www.youtube.com/username"
                    className="focus-visible:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="tiktok">TikTok</Label>
                  <Input
                    type="text"
                    id="tiktok"
                    value={tiktok}
                    onChange={(e) => setTiktok(e.target.value)}
                    placeholder="www.tiktok.com/username"
                    className="focus-visible:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="linkedin">Website</Label>
                  <Input
                    type="text"
                    id="linkedin"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="www.yourWebsite.com"
                    className="focus-visible:ring-blue-500"
                  />
                </div>
              </>

              {/* ------------------------ Cotegories --------------------------------- */}
              <div className="col-span-2">
                <hr className="col-span-2" />
                <h1 className="col-span-2 text-xl mt-5 mb-3 text-blue-500 text-left">
                  Business Cotegories
                </h1>

                <div className="flex items-center justify-between flex-col md:flex-row w-full gap-4">
                  <Select
                    value={category}
                    onChange={(
                      event: React.ChangeEvent<HTMLSelectElement> | undefined
                    ) => {
                      if (event && event.target) {
                        setCategory(event.target.value);
                      }
                    }}
                  >
                    <option value="">select a category</option>
                    {categories &&
                      categories.map((catogaryObj, index) => (
                        <option value={catogaryObj.label} key={index}>
                          {catogaryObj.label}
                        </option>
                      ))}
                  </Select>

                  <div className="w-full flex items-center justify-center">
                    <Dialog open={openModel} onOpenChange={setOpenModel}>
                      <DialogTrigger asChild>
                        <Button className="bg-[#277aa0] hover:bg-[#277aa0]/90">
                          Request For Add New Category
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Suggest your Category</DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-2">
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="name">Category</Label>
                              <Input
                                id="name"
                                className="col-span-3"
                                placeholder="Type your Category..."
                                value={userCategory}
                                onChange={(e) =>
                                  setUserCategory(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <DialogFooter className="sm:justify-start">
                          <div className="w-full flex items-center justify-center gap-2 px-10">
                            <Button type="button" onClick={handleCancelClick}>
                              Cancel
                            </Button>
                            <Button onClick={handleAddUserCategory}>
                              Send
                            </Button>
                          </div>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

              {/* --------------------------------------------------------- */}
              {/* <>
                <hr className="col-span-2" />
                <h1 className="col-span-2 text-2xl mt-5 mb-3 text-blue-500 text-left">
                  List Your Cotogary
                </h1>

                <div className="col-span-2 flex flex-row-reverse gap-5 items-center justify-center">
                  {category && (
                    <div className="bg-blue-500 text-white px-3 py-2 rounded-md">

                      {category}
                    </div>
                  )}

                  <Dropdown>
                    <Dropdown.Toggle
                      as={CustomToggle}
                      id="dropdown-custom-components"
                    >
                      Categories
                    </Dropdown.Toggle>

                    <Dropdown.Menu as={CustomMenu}>
                      <div className="h-[200px] overflow-y-scroll">
                        {categories &&
                          categories.map((catogaryObj, index) => (
                            <Dropdown.Item
                              eventKey={index + 1}
                              onClick={() =>
                                handleCatogaryClick(catogaryObj.label)
                              }
                              key={index}
                            >
                              {catogaryObj.label}
                            </Dropdown.Item>
                          ))}
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </> */}

              {/* <div>
                <Checkbox
                  onChange={() => setDisplayProfile(!displayProfile)}
                  isChecked={displayProfile}
                >
                  Display your profile
                </Checkbox>
              </div> */}

              {/* ---------------------------Buttons---------------------------------- */}

              <>
                <hr className="col-span-2" style={{ borderWidth: "5px" }} />

                <div className="w-full col-span-2 flex items-center justify-center mb-10">
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
                    className=" text-xl m-[10px] w-[200px] md:w-[450px] col-span-2 rounded-sm flex items-center justify-center p-3 text-white "
                  >
                    {loading ? (
                      <>
                        <Loader /> Creating...
                      </>
                    ) : (
                      "Create"
                    )}
                  </Button>
                </div>
              </>
            </div>
          </form>
        </div>
      </div>

      {/* <div className="mb-10">
        <Link to="/setup-gallery">
          <Button>Next</Button>
        </Link>
      </div> */}
    </div>
  );
};
export default CreateStorePage;
