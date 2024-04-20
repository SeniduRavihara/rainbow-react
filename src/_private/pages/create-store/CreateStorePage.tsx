import ImageSwiper from "../../components/ImageSwiper";
import { IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import React, { forwardRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
// import { IoArrowBack } from "react-icons/io5";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/config";
import { useAuth } from "@/hooks/useAuth";
import {
  addLocation,
  createStore,
  updateProfileForHaveStore,
} from "@/firebase/api";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { Checkbox, Kbd, Tag } from "@chakra-ui/react";
import {
  IoIosArrowBack,
  IoMdArrowDropleft,
  IoMdArrowDropright,
} from "react-icons/io";
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
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { categories } from "@/constants";
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
  const { locationArr } = useData();
  const navigate = useNavigate();

  const [storeImages, setStoreImages] = useState<
    Array<{
      index: number;
      file: File;
      imageUrl: null | string;
    }>
  >([]);
  const [storeIcon, setStoreIcon] = useState<File | null>(null);

  const [fasebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [website, setWebsite] = useState("");

  // const [categoriesArr, setCategoriesArr] = useState<Array<string>>([]);
  const [category, setCategory] = useState("");
  const [displayProfile, setDisplayProfile] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (currentUser) {
      await handleUpload();
      const storeIconUrl = await uploadStoreIcon(currentUser.uid);

      await createStore(currentUser?.uid, {
        title,
        address,
        phoneNumber,
        whatsappNumber,
        tags,
        storeImages: storeImages.map((img) => img.imageUrl),
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
        tiktok,
        category,
      });
      updateProfileForHaveStore(currentUser?.uid, true);
      await addLocation(
        cleanAddress(address),
        locationArr?.map((locationObj) => locationObj.location) || []
      );
    }
    setLoading(false);
    toast.success("Store created successfully");
    navigate("/manage-store");
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

  const handleAddTag = (tag: string) => {
    if (!tag || tags.includes(tag)) return;
    setTagInput("");
    setTags((pre) => [...pre, tag]);
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

  // --------------------------
  const handleCatogaryClick = (label: string) => {
    // if (!label || categoriesArr.includes(label)) return;
    // setCategoriesArr((pre) => (pre ? [...pre, label] : [label]));
    setCategory(label);
  };

  // const handleRemoveCatogary = (label: string) => {
  //   setCategoriesArr((pre) => [...pre.filter((preObj) => preObj !== label)]);
  // };

  // CustomToggle component
  const CustomToggle = forwardRef<
    HTMLAnchorElement,
    {
      children: React.ReactNode;
      onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    }
  >(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));

  // CustomMenu component
  const CustomMenu = forwardRef<
    HTMLDivElement,
    {
      children: React.ReactNode;
      style?: React.CSSProperties;
      className?: string;
      "aria-labelledby": string;
    }
  >(({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState<string>("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value ||
              (typeof child === "string" &&
                child.toLowerCase().startsWith(value))
          )}
        </ul>
      </div>
    );
  });

  return (
    <div className=" w-full min-h-screen flex flex-col gap-10 items-center justify-center">
      <h1 className=" text-center text-4xl font-bold text-[#005eff] mt-20">
        Create Store
      </h1>

      <Link
        to="/"
        className="absolute top-5 left-5 w-10 h-10 text-4xl font-extralight"
      >
        <IoIosArrowBack />
      </Link>

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
        {/* ----------------------- */}
        <div className="w-full px-3 gap-5">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 md:grid grid-cols-1 md:grid-cols-2 w-full">
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
              <div className="hidden md:flex col-span-2 items-center justify-between w-full px-20">
                <button
                  type="button"
                  disabled={dayIndex <= 0}
                  onClick={handlePrevDay}
                >
                  <IoMdArrowDropleft className="text-5xl text-blue-500" />
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
                  <IoMdArrowDropright className="text-5xl text-blue-500" />
                </button>
              </div>
              {/* -------------------- */}
              <div className="flex md:hidden flex-col items-center justify-between w-full">
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
                    <IoMdArrowDropleft className="text-5xl text-blue-500" />
                  </button>

                  <div>{schedulArr[dayIndex].day}</div>

                  <button
                    type="button"
                    disabled={dayIndex >= 6}
                    onClick={handleNextDay}
                  >
                    <IoMdArrowDropright className="text-5xl text-blue-500" />
                  </button>
                </div>
              </div>
              {/* ------------------------------- */}

              <div className="col-span-2 flex flex-col">
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
                    className="bg-green-500 rounded-md text-white px-2 py-1 hidden md:block"
                    onClick={() => handleAddTag(tagInput)}
                    type="button"
                  >
                    update
                  </button>
                </div>
                <Label className="text-xs text-gray-400 text-center md:hidden">
                  Press <Kbd className="text-gray-500">Enter</Kbd> after every
                  tag
                </Label>
              </div>

              {/* --------------------Social Links------------------------- */}
              <>
                <hr className="col-span-2" />
                <h1 className="col-span-2 text-2xl text-blue-500">
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

              {/* --------------------------------------------------------- */}
              <>
                <hr className="col-span-2" />
                <h1 className="col-span-2 text-2xl mt-5 mb-3 text-blue-500 text-left">
                  List Your Cotogary
                </h1>

                <div className="col-span-2 flex flex-row-reverse gap-5 items-center justify-center">
                  {category && (
                    <div className="bg-blue-500 text-white px-3 py-2 rounded-md">
                      {/* {categoriesArr.map((catogary, index) => (
                      <CustomTag key={index} styles="m-1">
                        <div>{catogary}</div>
                        <RxCross2
                          className="mt-1"
                          onClick={() => handleRemoveCatogary(catogary)}
                        />
                      </CustomTag>
                    ))} */}
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
                        {categories.map((catogaryObj, index) => (
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
              </>

              <div>
                <Checkbox
                  onChange={() => setDisplayProfile(!displayProfile)}
                  isChecked={displayProfile}
                >
                  Display your profile
                </Checkbox>
              </div>

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
                  className=" text-xl m-[10px] w-[200px] md:w-[450px] col-span-2 rounded-xl flex items-center justify-center p-3 text-white "
                >
                  {loading ? (
                    <>
                      <Loader /> Loading...
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateStorePage;
