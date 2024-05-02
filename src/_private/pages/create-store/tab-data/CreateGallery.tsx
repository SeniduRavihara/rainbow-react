import { db, storage } from "@/firebase/config";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import ImageCropDialog from "@/components/image-croper/CropDialog";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface ImageData {
  imageUrl: string;
  croppedImageUrl: string | null;
  crop: { x: number; y: number } | null;
  zoom: number | null;
  aspect: number;
  id: string;
}

const initData: ImageData = {
  imageUrl: "",
  croppedImageUrl: null,
  crop: null,
  zoom: null,
  aspect: 4 / 3,
  id: "",
};

const CreateGallery = ({storeId}: {storeId: string}) => {
  const [isOpenCropDialog, setIsOpenCropDialog] = useState(false);
  const [imageData, setImageData] = useState<ImageData>(initData);
  const [imageList, setImageList] =
    useState<Array<{ cropedImageBlob?: Blob; croppedImageUrl: string }>>();
  const [imageArr, setImageArr] = useState<Array<string>>([""]);
  const [visibleImageArr, setVisibleImageArr] = useState<Array<string>>([""]);

 
  console.log(imageArr);

  useEffect(() => {
    if (imageList) {
      setVisibleImageArr(imageList.map((imageObj) => imageObj.croppedImageUrl));
    }
  }, [imageList]);

  useEffect(() => {
    if (storeId) {
      const documentRef = doc(db, "store", storeId);
      const unsubscribe = onSnapshot(documentRef, (QuerySnapshot) => {
        if (QuerySnapshot) {
          const data = QuerySnapshot.data();
          if (data) {
            setImageArr(data.gallery as Array<string>);
            setVisibleImageArr((pre) => [...pre, ...(data.gallery || [])]);
          }
        }
      });

      return unsubscribe;
    }
  }, [storeId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const localUrl = URL.createObjectURL(file);

    setImageData((prevState) => ({
      ...prevState,
      imageUrl: localUrl,
      imageFile: file,
    }));

    setIsOpenCropDialog(true);
  };

  const handleClickUpdate = async () => {
    if (!imageList) return;

    try {
      if (storeId) {
        const downloadImgUrlArr = await handleUpload();

        const documentRef = doc(db, "store", storeId);
        await updateDoc(documentRef, {
          gallery: downloadImgUrlArr,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    if (imageList && imageList.length > 0) {
      try {
        const tempImgArr: string[] = [];

        for (let i = 0; i < imageList.length; i++) {
          const file = imageList[i].cropedImageBlob;
          const fileRef = ref(storage, `store_gallery/${storeId}/${i}`);

          if (!file) return;

          await uploadBytes(fileRef, file);
          const photoURL = await getDownloadURL(fileRef);

          tempImgArr.push(photoURL);
        }
        console.log("All files uploaded successfully!");
        return tempImgArr;
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

    setImageList((pre) => [
      ...(pre || []),
      { cropedImageBlob, croppedImageUrl },
    ]);

    setIsOpenCropDialog(false);
  };

  return (
    <div className="w-full p-10">
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

      <ul className="grid grid-cols-3">
        {visibleImageArr?.map((imgObj) => (
          <li>
            <img className="w-[200px]" src={imgObj} alt="" />
          </li>
        ))}
      </ul>

      <div className="w-full">
        <input
          type="file"
          id="image-input"
          hidden
          onChange={(e) => handleChange(e)}
        />
        <input type="text" hidden />
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-center gap-10">
              <label
                htmlFor="image-input"
                className="btn btn-primary text-white shadow-none"
              >
                Brower
              </label>
              <button
                onClick={() => handleClickUpdate()}
                className="index1img1update btn btn-warning text-white shadow-none"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mb-10">
        <Link to={`/add-location/${storeId}`}>
          <Button>Next</Button>
        </Link>
      </div> */}
      
    </div>
  );
};
export default CreateGallery;
