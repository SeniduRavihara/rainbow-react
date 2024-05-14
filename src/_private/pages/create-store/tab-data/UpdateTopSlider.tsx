import { db, storage } from "@/firebase/config";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import ImageCropDialog from "@/components/image-croper/CropDialog";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface ImageData {
  imageUrl: string;
  croppedImageUrl: string | null;
  crop: { x: number; y: number } | null;
  zoom: number | null;
  aspect: number;
  id: string;
}

interface SliderAdd {
  imageUrl: string;
  id: string;
  imageFile?: File;
  localUrl?: string;
  cropedImageBlob?: Blob;
  croppedImageUrl?: string;
}

const initData: ImageData = {
  imageUrl: "",
  croppedImageUrl: null,
  crop: null,
  zoom: null,
  aspect: 16 / 5,
  id: "",
};

const UpdateTopSlider = ({ storeId }: { storeId: string }) => {
  const [isOpenCropDialog, setIsOpenCropDialog] = useState(false);
  const [imageData, setImageData] = useState<ImageData>(initData);
  const [sliderAdds, setSliderAdds] = useState<SliderAdd[] | null>(null);
  const [haveLatestUpdate, setHaveLatestUpdate] = useState(false);

  // useEffect(() => {
  //   console.log(sliderAdds);
  // }, [sliderAdds]);

  // useEffect(() => {
  //   const checkDocument = async () => {
  //     if (storeId) {
  //       try {
  //         const documentRef = doc(db, "latestStore", storeId);
  //         const documentSnapshot = await getDoc(documentRef);

  //         // Check if the document exists
  //         const documentExists = documentSnapshot.exists();

  //         console.log(documentExists);

  //         // Update state based on document existence
  //         setHaveLatestUpdate(documentExists);
  //       } catch (error) {
  //         console.error("Error checking document existence:", error);
  //         setHaveLatestUpdate(false);
  //       }
  //     }
  //   };

  //   checkDocument();
  // }, [storeId]);

  useEffect(() => {
    const checkDocument = async () => {
      if (storeId) {
        try {
          const collectionRef = collection(db, "latestStore", storeId, "top-slider");
          const collectionSnapshot = await getDocs(collectionRef);

          // Check if the colletion exists
          const collectionExists = !collectionSnapshot.empty;

          // console.log(collectionExists);

          // Update state based on document existence
          setHaveLatestUpdate(collectionExists);

          if (!collectionExists) {
            const collectionRef = collection(
              db,
              "store",
              storeId,
              "top-slider"
            );
            const unsubscribe = onSnapshot(
              collectionRef,
              async (QuerySnapshot) => {
                const sliderAddsArr = QuerySnapshot.docs.map((doc) => ({
                  ...doc.data(),
                  id: doc.id,
                })) as Array<{ imageUrl: string; id: string }>;

                // console.log(sliderAddsArr);
                setSliderAdds(sliderAddsArr);

                for (const sliderObj of sliderAddsArr) {
                  try {
                    const latestDocumentRef = doc(
                      db,
                      "latestStore",
                      storeId,
                      "top-slider",
                      sliderObj.id
                    );

                    await setDoc(latestDocumentRef, { ...sliderObj });
                  } catch (error) {
                    console.error("Error setting document:", error);
                    // Handle the error here, such as logging or throwing it
                  }
                }
              }
            );

            return unsubscribe;
          } else {
            const collectionRef = collection(
              db,
              "latestStore",
              storeId,
              "top-slider"
            );
            const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
              const sliderAddsArr = QuerySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              })) as Array<{ imageUrl: string; id: string }>;

              // console.log(sliderAddsArr);
              setSliderAdds(sliderAddsArr);
            });

            return unsubscribe;
          }
        } catch (error) {
          console.error("Error checking document existence:", error);
          setHaveLatestUpdate(false);
        }
      }
    };

    checkDocument();

    
  }, [haveLatestUpdate, storeId]);

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

    setSliderAdds((prevState) =>
      prevState
        ? prevState.map((add) =>
            add.id === id ? { ...add, imageFile: file, localUrl } : add
          )
        : prevState
    );

    setIsOpenCropDialog(true);
  };

  const handleClickUpdate = async (idToUpdate: string) => {
    if (!sliderAdds) return;
    const addToUpdate = sliderAdds.find(({ id }) => id === idToUpdate);

    if (!addToUpdate?.cropedImageBlob) {
      // console.error("Add not found or image file missing");
      try {
        const documentRef = doc(
          db,
          "latestStore",
          storeId,
          "top-slider",
          idToUpdate
        );
        await updateDoc(documentRef, {
          imageUrl: addToUpdate?.imageUrl,
        });
        toast.success("Banner Uploaded successfully");
      } catch (error) {
        console.log(error);
      }
      return;
    }

    try {
      const imageUrl = await uploadAdd( 
        addToUpdate.cropedImageBlob,
        storeId,
        idToUpdate
      );
      if (imageUrl) toast.success("Banner Uploaded successfully");
      try {
        const documentRef = doc(
          db,
          "latestStore",
          storeId,
          "top-slider",
          idToUpdate
        );
        await updateDoc(documentRef, {
          imageUrl,
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Error uploading add:", error);
    }
  };

  const uploadAdd = async (
    file: File | Blob,
    storeIdPath: string,
    id: string
  ) => {
    try {
      const fileRef = ref(
        storage,
        `store_data/${storeIdPath}/latest/top-slider/${id}`
      );
      await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);
      console.log("Add Image uploaded successfully!");

      return photoURL;
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      throw new Error("Failed to upload profile picture");
    }
  };

  const onCancel = () => {
    setImageData(initData);
    setIsOpenCropDialog(false);
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

    setSliderAdds((prevState) =>
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

  return (
    <div className="w-full h-full">
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
      <div className="">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Need a Admin Aprove for update the Top Slider, Please send a admin
          Request
        </h1>

        <h2 className="text-primary font-bold mb-10 text-center">
          Top Slider (16:3 ~ 1000px:312px )
        </h2>

        <div className="flex flex-col w-full gap-5">
          {sliderAdds &&
            sliderAdds.map((add) => (
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

                  <div className="card-body">
                    <div className="flex items-center justify-center gap-10">
                      <label
                        htmlFor={add.id}
                        className="btn btn-primary text-white shadow-none"
                      >
                        Brower
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
  );
};
export default UpdateTopSlider;
