import React, { useEffect, useState } from "react";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { uploadAdd } from "@/firebase/api";
import { db } from "@/firebase/config";
import ImageCropDialog from "../image-croper/CropDialog";
import { Input } from "../ui/input";
import toast from "react-hot-toast";

interface ImageData {
  imageUrl: string;
  croppedImageUrl: string | null;
  crop: { x: number; y: number } | null;
  zoom: number | null;
  aspect: number;
  id: string;
}

interface SectionAdd {
  imageUrl: string;
  id: string;
  imageFile?: File;
  localUrl?: string;
  cropedImageBlob?: Blob;
  croppedImageUrl: string;
  link: string;
}

const initData: ImageData = {
  imageUrl: "",
  croppedImageUrl: null,
  crop: null,
  zoom: null,
  aspect: 16 / 5,
  id: "",
};

const initData2: ImageData = {
  imageUrl: "",
  croppedImageUrl: null,
  crop: null,
  zoom: null,
  aspect: 15 / 20,
  id: "",
};


const SectionAddsManage: React.FC = () => {
  const [isOpenCropDialog, setIsOpenCropDialog] = useState(false);
  const [isOpenCropDialog2, setIsOpenCropDialog2] = useState(false);
  const [imageData, setImageData] = useState<ImageData>(initData);
  const [imageData2, setImageData2] = useState<ImageData>(initData2);
  const [sectionAdds, setSectionAdds] = useState<SectionAdd[] | null>(null);
  const [sectionStaticAdds, setSectionStaticAdds] = useState<
    SectionAdd[] | null
  >(null);

  // useEffect(() => {
  //   console.log(sectionStaticAdds);
  // }, [sectionStaticAdds]);

  useEffect(() => {
    const collectionRef = collection(db, "sectionAdds");
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const adds = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as SectionAdd[];
      setSectionAdds(adds);
    });
    return unsubscribe;
  }, []);
   useEffect(() => {
     const collectionRef = collection(db, "sectionStaticAdds");
     const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
       const adds = querySnapshot.docs.map((doc) => ({
         ...doc.data(),
         id: doc.id,
       })) as SectionAdd[];
       setSectionStaticAdds(adds);
     });
     return unsubscribe;
   }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const localUrl = URL.createObjectURL(file);

    setImageData((prevState) => ({
      ...prevState,
      id,
      imageUrl: localUrl,
      imageFile: file,
    }));

    setSectionAdds((prevState) =>
      prevState
        ? prevState.map((add) =>
            add.id === id ? { ...add, imageFile: file, localUrl } : add
          )
        : prevState
    );
    setIsOpenCropDialog(true);
  };
    const handleChange2 = (
      e: React.ChangeEvent<HTMLInputElement>,
      id: string
    ) => {
      if (!e.target.files) return;
      const file = e.target.files[0];
      const localUrl = URL.createObjectURL(file);

      setImageData2((prevState) => ({
        ...prevState,
        id,
        imageUrl: localUrl,
        imageFile: file,
      }));

      setSectionStaticAdds((prevState) =>
        prevState
          ? prevState.map((add) =>
              add.id === id ? { ...add, imageFile: file, localUrl } : add
            )
          : prevState
      );
      setIsOpenCropDialog2(true);
    };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setSectionAdds((prevState) =>
      prevState
        ? prevState.map((add) =>
            add.id === id ? { ...add, link: e.target.value } : add
          )
        : prevState
    );
  };
   const handleChangeInput2 = (
     e: React.ChangeEvent<HTMLInputElement>,
     id: string
   ) => {
     setSectionStaticAdds((prevState) =>
       prevState
         ? prevState.map((add) =>
             add.id === id ? { ...add, link: e.target.value } : add
           )
         : prevState
     );
   };

  const handleClickUpdate = async (idToUpdate: string) => {
    if (!sectionAdds) return;
    const addToUpdate = sectionAdds.find((add) => add.id === idToUpdate);

    if (!addToUpdate?.cropedImageBlob) {
      // console.error("Add not found or image file missing");
      try {
        const documentRef = doc(db, "sectionAdds", idToUpdate);
        await updateDoc(documentRef, {
          imageUrl: addToUpdate?.imageUrl,
          link: addToUpdate?.link,
        });
        toast.success("Link Uploaded successfully");
      } catch (error) {
        console.log(error);
      }
      return;
    }

    try {
      const imageUrl = await uploadAdd(
        addToUpdate.cropedImageBlob,
        "section_adds",
        idToUpdate
      );
      if (imageUrl) toast.success("Banner Uploaded successfully");
      const documentRef = doc(db, "sectionAdds", idToUpdate);
      await updateDoc(documentRef, { imageUrl, link: addToUpdate?.link });
    } catch (error) {
      console.error("Error uploading or updating add:", error);
    }
  };
   const handleClickUpdate2 = async (idToUpdate: string) => {
     if (!sectionStaticAdds) return;
     const addToUpdate = sectionStaticAdds.find((add) => add.id === idToUpdate);

     if (!addToUpdate?.cropedImageBlob) {
       // console.error("Add not found or image file missing");
       try {
         const documentRef = doc(db, "sectionStaticAdds", idToUpdate);
         await updateDoc(documentRef, {
           imageUrl: addToUpdate?.imageUrl,
           link: addToUpdate?.link,
         });
         toast.success("Link Uploaded successfully");
       } catch (error) {
         console.log(error);
       }
       return;
     }

     try {
       const imageUrl = await uploadAdd(
         addToUpdate.cropedImageBlob,
         "section_static_adds",
         idToUpdate
       );
       if (imageUrl) toast.success("Banner Uploaded successfully");
       const documentRef = doc(db, "sectionStaticAdds", idToUpdate);
       await updateDoc(documentRef, { imageUrl, link: addToUpdate?.link });
     } catch (error) {
       console.error("Error uploading or updating add:", error);
     }
   };

  const onCancel = () => {
    setImageData(initData);
    setIsOpenCropDialog(false);
  };
   const onCancel2 = () => {
     setImageData2(initData2);
     setIsOpenCropDialog2(false);
   };

  const setCroppedImageFor = (
    crop: { x: number; y: number },
    zoom: number,
    aspect: number,
    croppedImageUrl: string,
    cropedImageBlob: Blob
  ) => {
    setImageData((prevState) => ({
      ...prevState,
      croppedImageUrl,
      crop,
      zoom,
      aspect,
    }));

    setSectionAdds((prevState) =>
      prevState
        ? prevState.map((add) =>
            add.id === imageData.id
              ? { ...add, cropedImageBlob, croppedImageUrl }
              : add
          )
        : prevState
    );

    setIsOpenCropDialog(false);
  };
    const setCroppedImageFor2 = (
      crop: { x: number; y: number },
      zoom: number,
      aspect: number,
      croppedImageUrl: string,
      cropedImageBlob: Blob
    ) => {
      setImageData2((prevState) => ({
        ...prevState,
        croppedImageUrl,
        crop,
        zoom,
        aspect,
      }));

      setSectionStaticAdds((prevState) =>
        prevState
          ? prevState.map((add) =>
              add.id === imageData2.id
                ? { ...add, cropedImageBlob, croppedImageUrl }
                : add
            )
          : prevState
      );

      setIsOpenCropDialog2(false);
    };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex items-center justify-center">
        {isOpenCropDialog && (
          <div className="w-screen h-screen absolute z-10">
            <ImageCropDialog
              imageUrl={imageData.imageUrl}
              cropInit={imageData.crop}
              zoomInit={imageData.zoom}
              aspectInit={imageData.aspect}
              onCancel={onCancel}
              setCroppedImageFor={setCroppedImageFor}
            />
          </div>
        )}
        <div className="w-full">
          <h2 className="text-primary font-bold mb-10 text-center">
            Section Adds (16:5 ~ 1000px:312px )
          </h2>
          <div className="flex flex-col w-full gap-5">
            {sectionAdds &&
              sectionAdds.map((add) => (
                <div key={add.id} className="w-full">
                  <input
                    type="file"
                    id={add.id}
                    hidden
                    onChange={(e) => handleChange(e, add.id)}
                  />
                  <input type="text" hidden />
                  <div className="card">
                    <div>
                      <img
                        className="card-img-top"
                        src={add?.croppedImageUrl ?? add.imageUrl}
                        alt="Card image cap"
                      />
                    </div>

                    <div className="mt-4 px-3 flex justify-center items-center">
                      <Input
                        type="text"
                        value={
                          sectionAdds.find((addObj) => addObj.id === add.id)
                            ?.link
                        }
                        onChange={(e) => handleChangeInput(e, add.id)}
                      />
                    </div>

                    <div className="card-body">
                      <div className="flex items-center justify-center gap-10">
                        <label
                          htmlFor={add.id}
                          className="btn btn-primary text-white shadow-none"
                        >
                          Browse
                        </label>
                        <button
                          onClick={() => handleClickUpdate(add.id)}
                          className="index1img1update btn btn-warning text-white shadow-none"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------- */}
      <hr className="mt-5" />
      <hr />

      <div className="w-full h-full flex items-center justify-center">
        {isOpenCropDialog2 && (
          <div className="w-screen h-screen absolute z-10">
            <ImageCropDialog
              imageUrl={imageData2.imageUrl}
              cropInit={imageData2.crop}
              zoomInit={imageData2.zoom}
              aspectInit={imageData2.aspect}
              onCancel={onCancel2}
              setCroppedImageFor={setCroppedImageFor2}
            />
          </div>
        )}
        <div className="w-full">
          <h2 className="text-primary font-bold mb-10 text-center">
            Section Adds (15:20 ~ 1000px:1333px )
          </h2>
          <div className="flex flex-col w-full gap-5">
            {sectionStaticAdds &&
              sectionStaticAdds.map((add) => (
                <div key={add.id} className="w-full">
                  <input
                    type="file"
                    id={add.id}
                    hidden
                    onChange={(e) => handleChange2(e, add.id)}
                  />
                  <input type="text" hidden />
                  <div className="card">
                    <div>
                      <img
                        className="card-img-top"
                        src={add?.croppedImageUrl ?? add.imageUrl}
                        alt="Card image cap"
                      />
                    </div>

                    <div className="mt-4 px-3 flex justify-center items-center">
                      <Input
                        type="text"
                        value={
                          sectionStaticAdds.find(
                            (addObj) => addObj.id === add.id
                          )?.link
                        }
                        onChange={(e) => handleChangeInput2(e, add.id)}
                      />
                    </div>

                    <div className="card-body">
                      <div className="flex items-center justify-center gap-10">
                        <label
                          htmlFor={add.id}
                          className="btn btn-primary text-white shadow-none"
                        >
                          Browse
                        </label>
                        <button
                          onClick={() => handleClickUpdate2(add.id)}
                          className="index1img1update btn btn-warning text-white shadow-none"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionAddsManage;
