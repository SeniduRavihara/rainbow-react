import { uploadAdd } from "@/firebase/api";
import { db } from "@/firebase/config";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import ImageCropDialog from "../image-croper/CropDialog";

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
  croppedImageUrl: string;
}

const initData: ImageData = {
  imageUrl: "",
  croppedImageUrl: null,
  crop: null,
  zoom: null,
  aspect: 16 / 5,
  id: "",
};

const SliderAddsManage = () => {
  const [isOpenCropDialog, setIsOpenCropDialog] = useState(false);
  const [imageData, setImageData] = useState<ImageData>(initData);
  const [sliderAdds, setSliderAdds] = useState<SliderAdd[] | null>(null);

  useEffect(() => {
    console.log(sliderAdds);
  }, [sliderAdds]);

  useEffect(() => {
    const collectionRef = collection(db, "sliderAdds");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const sliderAddsArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as SliderAdd[];
      // console.log(sliderAddsArr);
      setSliderAdds(sliderAddsArr);
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
      console.error("Add not found or image file missing");
      return;
    }

    try {
      const imageUrl = await uploadAdd(
        addToUpdate.cropedImageBlob,
        "slider_adds"
      );
      try {
        const documentRef = doc(db, "sliderAdds", idToUpdate);
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
        <h2 className="text-primary fw-bold">Index 1</h2>
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
export default SliderAddsManage;
