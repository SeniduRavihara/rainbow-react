import ImageSwiper from "../components/ImageSwiper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import "./register.css";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/config";
import { v4 } from "uuid";
import { useAuth } from "@/hooks/useAuth";
import { createStore } from "@/firebase/api";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { Tag } from "@chakra-ui/react";

const CreateStorePage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const [storeImages, setStoreImages] = useState<
    Array<{
      index: number;
      file: File;
      imageUrl: null | string;
    }>
  >([]);
  const [storeIcon, setStoreIcon] = useState<File | null>(null);

  useEffect(() => {
    console.log(storeImages);
  }, [storeImages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (currentUser) {
      await handleUpload();
      const storeIconUrl = await uploadStoreIcon();

      await createStore(currentUser?.uid, {
        title,
        address,
        phoneNumber,
        whatsappNumber,
        tags,
        storeImages: storeImages.map((img) => img.imageUrl),
        storeIcon: storeIconUrl,
        email: currentUser.email,
      });
    }
    setLoading(false);
    toast.success("Store created successfully");
    navigate("/store-profile");
  };

  const handleUpload = async () => {
    if (storeImages.length > 0) {
      try {
        for (let i = 0; i < storeImages.length; i++) {
          const file = storeImages[i].file;
          const fileRef = ref(storage, `store_images/${v4()}`);
          await uploadBytes(fileRef, file);
          const photoURL = await getDownloadURL(fileRef);

          // Update storeImages state with the uploaded image's URL
          setStoreImages((prevImages) => {
            const updatedImages = [...prevImages];

            // Image exists, update its URL
            updatedImages[i].imageUrl = photoURL;

            return updatedImages;
          });

          console.log("Download URL:", photoURL);
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

  const uploadStoreIcon = async () => {
    if (storeIcon) {
      try {
        const fileRef = ref(storage, `store_icons/${v4()}`);
        await uploadBytes(fileRef, storeIcon);
        const photoURL = await getDownloadURL(fileRef);

        return photoURL;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAddTag = (tag: string) => {
    if(!tag || tags.includes(tag)) return
    setTagInput("");
    setTags((pre) => [...pre, tag]);
  };

  return (
    <div className="create-store w-full min-h-screen flex items-center justify-center bg-[#aec5e8]">
      <Card className="w-[80%] h-[85%] p-10 flex flex-col gap-10">
        <CardHeader>
          <CardTitle className="-mt-10 text-center text-4xl font-bold text-[#005eff]">
            Create Store
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" asChild className="absolute top-5 left-5">
            <Link to="/">
              <IoArrowBack />
            </Link>
          </Button>

          <div className="flex -mt-10 gap-20">
            <div className="-mt-10">
              <ImageSwiper
                setStoreImages={setStoreImages}
                storeImages={storeImages}
              />
            </div>

            <div className="form-conten flex flex-col">
              <div
                className="logo"
                id="logo-content"
                style={{ display: "flex" }}
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
                  className="photo-add-button"
                  id="logo-button"
                  type="button"
                >
                  {storeIcon ? (
                    <img
                      src={URL.createObjectURL(storeIcon)}
                      alt="profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <IonIcon icon={addOutline}></IonIcon>
                  )}
                </button>
                <div id="previewImagelogo"></div>
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

              <form onSubmit={handleSubmit}>
                <div className="input-form grid grid-cols-2">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder=" title"
                    className="p-[1rem] text-lg m-[10px] border-2 border-[#a7a7a7] rounded-xl focus:outline-blue-400"
                  />

                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="address"
                    className="p-[1rem] text-lg m-[10px] border-2 border-[#a7a7a7] rounded-xl focus:outline-blue-400"
                  />

                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    placeholder="Phone number"
                    className="p-[1rem] text-lg m-[10px] border-2 border-[#a7a7a7] rounded-xl focus:outline-blue-400"
                  />

                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    required
                    placeholder="Whatsapp number"
                    className="p-[1rem] text-lg m-[10px] border-2 border-[#a7a7a7] rounded-xl focus:outline-blue-400"
                  />

                  <div className="flex px-2 items-center justify-between col-span-2 text-lg m-[10px] border-2 border-[#a7a7a7] rounded-xl focus:outline-blue-400">
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
                      />
                    </div>

                    <button
                      className="bg-green-500 rounded-md text-white px-2 py-1"
                      onClick={() => handleAddTag(tagInput)}
                    >
                      update
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={
                      !title ||
                      !address ||
                      !phoneNumber ||
                      !whatsappNumber ||
                      !tags ||
                      loading
                    }
                    className=" text-xl m-[10px] rounded-xl flex items-center justify-center p-3 text-white bg-[#0c86ac]"
                  >
                    {loading ? (
                      <>
                        <Loader /> Loading...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

};
export default CreateStorePage;
