import ImageSwiper from "@/_admin/components/ImageSwiper";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { db, storage } from "@/firebase/config";
import { useData } from "@/hooks/useData";
import { StoreListType, StoreObj, TimeValue } from "@/types";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import {
  IoIosArrowBack,
  IoMdArrowDropleft,
  IoMdArrowDropright,
} from "react-icons/io";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, {  useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addLocation, togglePublish, updateStore3 } from "@/firebase/api";
import { useAuth } from "@/hooks/useAuth";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
// import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "@/styles/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import { cleanAddress, cn } from "@/lib/utils";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-number-input";
import "@/styles/phone-number-input.css";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdArrowForwardIos } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select } from "@chakra-ui/react";
import { WithContext as ReactTags } from "react-tag-input";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import "./tagInput-styles.css";

// const suggestions = [
  // { id: "1", text: "Apple" },
  // { id: "2", text: "Banana" },
  // { id: "3", text: "Cherry" },
  // Add more suggestions as needed
// ];

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const ManageStorePage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState<string | undefined>();
  // const [tagInput, setTagInput] = useState("");
  // const [tags, setTags] = useState<Array<string>>([]);
  const [tags2, setTags2] = useState<Array<{ id: string; text: string }>>([]);
  const [loading, setLoading] = useState(false);
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
  const [storeIcon, setStoreIcon] = useState<{
    file: File | null;
    imageUrl: string;
  } | null>(null);
  const [currentUserStore, setCurrentUserStore] = useState<StoreObj | null>(
    null
  );
  const [fasebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [website, setWebsite] = useState("");

  // const [categoriesArr, setCategoriesArr] = useState<Array<string>>([]);
  // const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { currentUserData, locationArr, categories } = useData();
  const [visibleCategories, setVisibleCategories] = useState<Array<{
    icon: string;
    label: string;
  }> | null>(categories);
  const [userCategory, setUserCategory] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const [requestPhone, setRequestPhone] = useState("");
  const [openRequestModel, setOpenRequestModel] = useState(false);

  const { currentUser } = useAuth();

  const params = useParams();

  console.log(selectedCategory);

  useEffect(() => {
    const collectionRef = collection(db, "categories");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const categoryArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
      })) as Array<{ icon: string; label: string }>;

      // console.log(categoryArr);
      setVisibleCategories([...categoryArr]);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (currentUserData && params.storeId) {
        // const documentReflatest = doc(db, "latestStore", params.storeId);
        // const snapshot = await getDoc(documentReflatest);
        // const latestStoreData = snapshot.data() as StoreObj;
        // const exists = snapshot.exists();

        if (params.storeId === "userStore") {
          // if (exiss) {
          console.log("RUNNING");

          const collectionRef = collection(db, "latestStore");
          const q = query(
            collectionRef,
            where("userId", "==", currentUserData.id)
          );

          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const storeListArr = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })) as StoreListType;

            // console.log(storeListArr);
            setCurrentUserStore(storeListArr[0]);
          });

          return unsubscribe;

          // const documentRef = doc(db, "latestStore", params.storeId);
          // const unsubscribe = onSnapshot(documentRef, (snapshot) => {
          //   if (snapshot.exists()) {
          //     setCurrentUserStore({
          //       ...snapshot.data(),
          //       id: snapshot.id,
          //     } as StoreObj);
          //   } else {
          //     setCurrentUserStore(null);
          //   }
          // });

          // // Return the unsubscribe function to stop listening for updates when the component unmounts
          // return () => unsubscribe();
          // }
        } else {
          // if (exists) {            console.log("RUNNING");
          console.log("RUNNING2");

          const documentRef = doc(db, "latestStore", params.storeId);
          const unsubscribe = onSnapshot(documentRef, (snapshot) => {
            if (snapshot.exists()) {
              setCurrentUserStore({
                ...snapshot.data(),
                id: snapshot.id,
              } as StoreObj);

              // console.log(snapshot.data());
            } else {
              setCurrentUserStore(null);
            }
          });

          // Return the unsubscribe function to stop listening for updates when the component unmounts
          return () => unsubscribe();
          // }
        }
      }
    }

    fetchData(); // Call the async function immediately
  }, [currentUserData, params]);

  useEffect(() => {
    if (currentUserStore) {
      // setInfo1(currentUserStore.info1);
      // setInfo2(currentUserStore.info2);
      setAddress(currentUserStore.address);
      setPhoneNumber(currentUserStore.phoneNumber);
      setWhatsappNumber(currentUserStore.whatsappNumber);
      setTitle(currentUserStore.title);
      // setTags(currentUserStore.tags);
      setTags2(currentUserStore.tags.map((tag) => ({ id: tag, text: tag })));
      setFacebook(currentUserStore.fasebook);
      setInstagram(currentUserStore.instagram);
      setLinkedin(currentUserStore.linkedin);
      setTwitter(currentUserStore.twitter);
      setYoutube(currentUserStore.youtube);
      setTiktok(currentUserStore.tiktok);
      setWebsite(currentUserStore.website);
      // setCategory(currentUserStore.category || "");
      setSelectedCategory(currentUserStore.category || "");
      setSchedulArr(currentUserStore.schedulArr);
      setStoreImages((pre) =>
        pre.map((imgObj, index) => {
          return { ...imgObj, imageUrl: currentUserStore.storeImages[index] };
        })
      );
      setStoreIcon((pre) =>
        pre
          ? { ...pre, imageUrl: currentUserStore.storeIcon }
          : { file: null, imageUrl: currentUserStore.storeIcon }
      );
    }
  }, [currentUserStore]);

  // const handleAddTag = (tag: string) => {
  //   if (!tag || tags.includes(tag)) return;
  //   setTagInput("");
  //   setTags((pre) => [...pre, tag]);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (currentUser && currentUserStore) {
      toast.success("Request Send to Admin");
      const adminMessagesCollectionRef = collection(db, "adminMessages");
      await addDoc(adminMessagesCollectionRef, {
        message: `I want To Update My Busness Profile: ${currentUserStore.title}`,
        createdAt: new Date(),
        imageUrl: "",
        fromName: "",
        fromId: currentUser.uid,
        toName: "admin",
        toId: "",
        seen: false,
      });

      await handleUpload(currentUserStore?.id);
      const storeIconUrl =
        (await uploadStoreIcon(currentUserStore.id)) ||
        (storeIcon?.imageUrl ?? "");
      // console.log("STORE", storeIconUrl);

      // const validStoreImages = storeImages.filter((img) => img !== undefined);
      const storeImageUrls = storeImages
        .map((img) => img.imageUrl)
        .filter((img): img is string => img !== undefined);

      await updateStore3(currentUserStore?.id, {
        title: title.replace(/-/g, " "),
        address,
        phoneNumber,
        whatsappNumber,
        // tags,
        tags: tags2.map((tag) => tag.text),
        storeImages: storeImageUrls,
        storeIcon: storeIconUrl,
        email: currentUser.email,
        // info1,
        // info2,
        schedulArr,
        fasebook,
        instagram,
        linkedin,
        twitter,
        youtube,
        tiktok,
        website,
        category: selectedCategory,
        haveUpdate: [
          ...(currentUserStore?.haveUpdate ?? []),
          currentUserStore?.haveUpdate.includes("normal")
            ? undefined
            : "normal",
          ...(storeIcon?.file ? ["storeIcon"] : []),
          ...(storeImages.filter((obj) => obj.file).length >= 1
            ? ["storeImages"]
            : []),
        ].filter((txt) => txt),
      });
      // updateProfileForHaveStore(currentUser?.uid, true);
      await addLocation(
        cleanAddress(address),
        locationArr?.map((locationObj) => locationObj.location) || []
      );
    }
    setLoading(false);
    toast.success("Store Updated Successfully");
  };

  const uploadStoreIcon = async (storeId: string) => {
    if (storeIcon?.file) {
      try {
        const fileRef = ref(
          storage,
          `store_data/${storeId}/latest/store_icons/${storeId}`
        );
        await uploadBytes(fileRef, storeIcon.file);
        const photoURL = await getDownloadURL(fileRef);

        return photoURL;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpload = async (storeId: string) => {
    if (storeImages.length > 0) {
      try {
        for (let i = 0; i < storeImages.length; i++) {
          const file = storeImages[i].file;
          const fileRef = ref(
            storage,
            `store_data/${storeId}/latest/store-images/${storeImages[i].index}`
          );
          console.log("Working");

          if (!file) continue;

          console.log("Working");

          await uploadBytes(fileRef, file);
          const photoURL = await getDownloadURL(fileRef);
          console.log("URL", photoURL);

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

  // const handleCatogaryClick = (label: string) => {
  //   // if (!label || categoriesArr.includes(label)) return;
  //   // setCategoriesArr((pre) => (pre ? [...pre, label] : [label]));
  //   setCategory(label);
  // };

  const handleClickRequest = async () => {
    if (currentUserStore) {
      const adminMessagesCollectionRef = collection(db, "adminMessages");
      await addDoc(adminMessagesCollectionRef, {
        message: `I want To Show My Busness Profile: ${title} my Phone No is:`,
        createdAt: new Date(),
        imageUrl: "",
        fromName: "",
        fromId: currentUserStore.userId,
        toName: "admin",
        toId: "",
        seen: false,
      });

      toast.success("Request Send to Admin");
    }
    // if (requestPhone) {
    //   window.open(
    //     `https://wa.me/715335640?text=I%20need%20to%20show%20my%20business%20profile.%20My%20phone%20number%20is%3A%20${requestPhone}`
    //   );
    // }
  };

  // const handleRemoveCatogary = (label: string) => {
  //   setCategoriesArr((pre) => [...pre.filter((preObj) => preObj !== label)]);
  // };

  // CustomToggle component
  // const CustomToggle = forwardRef<
  //   HTMLAnchorElement,
  //   {
  //     children: React.ReactNode;
  //     onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  //   }
  // >(({ children, onClick }, ref) => (
  //   <a
  //     href=""
  //     ref={ref}
  //     onClick={(e) => {
  //       e.preventDefault();
  //       onClick(e);
  //     }}
  //   >
  //     {children}
  //     &#x25bc;
  //   </a>
  // ));

  // CustomMenu component
  // const CustomMenu = forwardRef<
  //   HTMLDivElement,
  //   {
  //     children: React.ReactNode;
  //     style?: React.CSSProperties;
  //     className?: string;
  //     "aria-labelledby": string;
  //   }
  // >(({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
  //   const [value, setValue] = useState<string>("");

  //   return (
  //     <div
  //       ref={ref}
  //       style={style}
  //       className={className}
  //       aria-labelledby={labeledBy}
  //     >
  //       <Form.Control
  //         autoFocus
  //         className="mx-3 my-2 w-auto"
  //         placeholder="Type to filter..."
  //         onChange={(e) => setValue(e.target.value)}
  //         value={value}
  //       />
  //       <ul className="list-unstyled">
  //         {React.Children.toArray(children).filter(
  //           (child) =>
  //             !value ||
  //             (typeof child === "string" &&
  //               child.toLowerCase().startsWith(value))
  //         )}
  //       </ul>
  //     </div>
  //   );
  // });

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

  // ----------------TAG-----------------------

  const handleDelete = (index: number) => {
    setTags2(tags2.filter((_, i) => i !== index));
  };

  const handleAddition = (tag: { id: string; text: string }) => {
    setTags2([...tags2, tag]);
  };

  const handleDrag = (
    tag: {
      id: string;
      text: string;
    },
    currPos: number,
    newPos: number
  ) => {
    const newTags = tags2.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags2(newTags);
  };

  // ------------------------------------------

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
      for (let i = 0; i < 4; i++) {
        const file = storeImages[i]?.file;
        const imgUrl = storeImages[i].imageUrl;

        const imageUrl = file
          ? URL.createObjectURL(file)
          : imgUrl ?? "imageGalery";

        slides.push(
          <div
            key={i}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            <div>
              <img
                src={imageUrl}
                className={cn(
                  "object-covr rounded-l-md",
                  imageUrl === "imageGalery" && "w-32 h-32"
                )}
                alt=""
              />
            </div>

            <div>
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
                <label htmlFor={`fileInput${i}`} className="text-blue-500">
                  Browse
                </label>
              </p>
            </div>
          </div>
        );
      }
      return slides;
    };

  // if (!currentUserStore) return <div>Loading...</div>;
  return (
    <div className="w-full min-h-screen text-center relative">
      <Link
        to={params.storeId === "userStore" ? "/" : "/manage-business-profiles"}
        className="absolute top-0 left-5 w-10 h-10 text-4xl font-extralight"
      >
        <IoIosArrowBack />
      </Link>

      <h1 className="text-3xl font-bold mb-6 mt-4">Business Profile</h1>
      {currentUserData && currentUserStore ? (
        <div className="flex flex-col gap-2 md:p-5">
          {/* <h2 className="text-xl font-semibold mb-4">Your Store</h2> */}
          <div className="flex flex-col gap-10 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4">
              {/* <div className="md:w-6/12 w-full flex items-center justify-center">
                <ImageSwiper
                  setStoreImages={setStoreImages}
                  storeImages={storeImages}
                />
              </div> */}
              {/* <div
                className="gap-3 flex items-center justify-center md:w-6/12 w-full"
                id="logo-conten"
              >
                <input
                  id={`iconInput`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setStoreIcon((pre) =>
                        pre
                          ? {
                              ...pre,
                              file: e.target.files![0],
                              imageUrl: URL.createObjectURL(e.target.files![0]),
                            }
                          : {
                              file: e.target.files![0],
                              imageUrl: URL.createObjectURL(e.target.files![0]),
                            }
                      );
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
                      src={
                        (storeIcon.file &&
                          URL.createObjectURL(storeIcon.file)) ??
                        storeIcon.imageUrl
                      }
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
              </div> */}
            </div>
            {/* <ul className="flex gap-3">
              {storeImages.map((imgObj, index) => (
                <li key={index}>
                  <img
                    src={imgObj.imageUrl || ""}
                    className="w-44 h-36 object-cover"
                  />
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
                    <label htmlFor={`fileInput${i}`} className="text-blue-500">
                      Browse
                    </label>
                  </p>
                </li>
              ))}
            </ul> */}
            {renderSlides()}
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
                        className="px-[1rem] py-1 text-lg border rounded-md focus:outline-blue-400 "
                      />
                    </div>

                    {/* <div>
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
                    </div> */}
                  </>

                  {/* ------------Shedul input---------------- */}
                  <>
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
                  </>

                  {/* -----------------Tag input---------------------------- */}

                  <div className="col-span-2 flex flex-col">
                    <DndProvider backend={HTML5Backend}>
                      <div className="tag-input-component">
                        <ReactTags
                          tags={tags2}
                          // suggestions={suggestions}
                          delimiters={delimiters}
                          handleDelete={handleDelete}
                          handleAddition={handleAddition}
                          handleDrag={handleDrag}
                          inputFieldPosition="bottom"
                          classNames={{
                            // tagInput: "custom-tag-input",
                            tagInputField:
                              "flex px-2 items-center justify-between col-span-2 text-lg w-full focus:outline-none",
                            suggestions: "custom-suggestions",
                            activeSuggestion: "custom-active-suggestion",
                          }}
                          autocomplete
                          // editable
                          // clearAll
                        />
                      </div>
                      {/* <Label className="text-xs mt-3 text-gray-400 text-center">
                        Press <Kbd className="text-gray-500">Enter</Kbd> after
                        every tag
                      </Label> */}
                    </DndProvider>
                  </div>

                  {/* <div className="col-span-2 flex flex-col">
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
                    <Label className="text-xs text-gray-400 text-center">
                      Press <Kbd className="text-gray-500">Enter</Kbd> after
                      every tag
                    </Label>
                  </div> */}

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
                        className="focus-visible:ring-blue-500"
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
                        className="focus-visible:ring-blue-500"
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
                        className="focus-visible:ring-blue-500"
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
                        className="focus-visible:ring-blue-500"
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
                        className="focus-visible:ring-blue-500"
                      />
                    </div>
                  </>

                  {/* ------------------------ Cotegories --------------------------------- */}
                  <div className="col-span-2">
                    <hr className="col-span-2" />
                    <h1 className="col-span-2 text-2xl mt-5 mb-3 text-blue-500 text-left">
                      Business Cotegories
                    </h1>

                    <div className="flex items-center justify-between w-full gap-4">
                      <div className="col-span-2 flex flex-row-reverse gap-5 items-center justify-center">
                        <Select
                          value={selectedCategory}
                          onChange={(
                            event:
                              | React.ChangeEvent<HTMLSelectElement>
                              | undefined
                          ) => {
                            if (event && event.target) {
                              setSelectedCategory(event.target.value);
                            }
                          }}
                        >
                          {visibleCategories &&
                            visibleCategories.map((catogaryObj, index) => (
                              <option value={catogaryObj.label} key={index}>
                                {catogaryObj.label}
                              </option>
                            ))}
                        </Select>
                      </div>

                      {/* <Dropdown>
                        <Dropdown.Toggle
                          as={CustomToggle}
                          id="dropdown-custom-components"
                        >
                          Categories
                        </Dropdown.Toggle>

                        <Dropdown.Menu as={CustomMenu}>
                          <div className="h-[200px] overflow-y-scroll">
                            {visibleCategories &&
                              visibleCategories.map((catogaryObj, index) => (
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
                      </Dropdown> */}

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
                                <Button
                                  type="button"
                                  onClick={handleCancelClick}
                                >
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

                  {currentUserStore && (
                    <Button
                      variant="destructive"
                      type="button"
                      onClick={() =>
                        togglePublish(
                          currentUserStore.id,
                          currentUserStore.published
                        )
                      }
                      className="m-full col-span-2 flex items-center justify-center p-3 text-white bg-[#41a1ce] hover:bg-[#41a1ce]/90"
                    >
                      {currentUserStore.published ? "Unpublish" : "Publish"}
                    </Button>
                  )}

                  <hr className="col-span-2" style={{ borderWidth: "5px" }} />

                  <div className="w-full col-span-2 flex items-center justify-center mb-10">
                    <Button
                      type="submit"
                      disabled={
                        !title ||
                        !address ||
                        !phoneNumber ||
                        !whatsappNumber ||
                        !tags2 ||
                        loading
                      }
                      className=" md:w-[200px] m-[10px] rounded-xl flex items-center justify-center p-3 text-white "
                    >
                      {loading ? (
                        <>
                          <Loader /> <span className="ml-3">Loading...</span>
                        </>
                      ) : (
                        "Request For Update"
                      )}
                    </Button>

                    {currentUserStore.showProfile ? (
                      <div>
                        <Link to={`/setup-tabs-data/${currentUserStore?.id}`}>
                          <Button className=" md:w-[200px] m-[10px] rounded-xl flex items-center justify-center p-3 text-white ">
                            Next{" "}
                            <MdArrowForwardIos className="ml-2 text-xl mt-[1px]" />
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <Dialog
                        open={openRequestModel}
                        onOpenChange={setOpenRequestModel}
                      >
                        <DialogTrigger>
                          <Button
                            asChild
                            size="sm"
                            className=" md:w-[200px] m-[10px] rounded-xl flex items-center justify-center p-3 text-white"
                          >
                            <h4>
                              Request For
                              <span className="text-yellow-300 ml-1">
                                Pro Profile
                              </span>
                            </h4>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] flex items-center justify-center flex-col">
                          <DialogHeader>
                            <DialogTitle>Send Your Request</DialogTitle>
                          </DialogHeader>

                          <div className="grid gap-4 py-2 w-full">
                            <div className="">
                              <Label>Phone No</Label>
                              <Input
                                id="name"
                                className=""
                                placeholder="Your Phone Number"
                                value={requestPhone}
                                onChange={(e) =>
                                  setRequestPhone(e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <DialogFooter className="sm:justify-start">
                            <div className="w-full flex items-center justify-center gap-2 px-10">
                              <Button
                                type="button"
                                onClick={() => {
                                  setOpenRequestModel(false);
                                  setRequestPhone("");
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                type="button"
                                onClick={handleClickRequest}
                                className=" md:w-[200px] m-[10px] flex items-center justify-center p-3 text-white "
                              >
                                Request For Pro Profile
                              </Button>
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
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
          <Link
            to="/create-business-profile"
            className="text-blue-500 hover:underline"
          >
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
