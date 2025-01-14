import { uploadAdd } from "@/firebase/api";
import { db } from "@/firebase/config";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import ImageCropDialog from "../image-croper/CropDialog";
import { Input } from "../ui/input";
import { CircularProgress } from "@chakra-ui/react";
import toast from "react-hot-toast";

interface ImageData {
  imageUrl: string;
  croppedImageUrl: string | null;
  crop: { x: number; y: number } | null;
  zoom: number | null;
  aspect: number;
  id: string;
}

interface PopularBrands {
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
  aspect: 4 / 3,
  id: "",
};

const PopularBrandsManage = () => {
  const [isOpenCropDialog, setIsOpenCropDialog] = useState(false);
  const [imageData, setImageData] = useState<ImageData>(initData);
  const [popularBrands, setPopularBrands] = useState<PopularBrands[] | null>(
    null
  );

  useEffect(() => {
    const collectionRef = collection(db, "pupularBrands");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const popularBrandsArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as PopularBrands[];
      // console.log(popularBrandsArr);
      setPopularBrands(popularBrandsArr);
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

    setPopularBrands((prevState) =>
      prevState
        ? prevState.map((add) =>
            add.id === id ? { ...add, imageFile: file, localUrl } : add
          )
        : prevState
    );

    setIsOpenCropDialog(true);
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setPopularBrands((prevState) =>
      prevState
        ? prevState.map((add) =>
            add.id === id ? { ...add, link: e.target.value } : add
          )
        : prevState
    );
  };

  const handleClickUpdate = async (idToUpdate: string) => {
    if (!popularBrands) return;
    const addToUpdate = popularBrands.find(({ id }) => id === idToUpdate);

    if (!addToUpdate?.cropedImageBlob) {
      // console.error("Add not found or image file missing");
      try {
        const documentRef = doc(db, "pupularBrands", idToUpdate);
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
        "popular_brands",
        idToUpdate
      );
      if (imageUrl) toast.success("Banner Uploaded successfully");
      try {
        const documentRef = doc(db, "pupularBrands", idToUpdate);
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

    setPopularBrands((prevState) =>
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

  if (!popularBrands)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <CircularProgress size="60px" isIndeterminate color="green.300" />
      </div>
    );

  return (
    <div className="w-full h-full pb-5 pt-3 px-10">
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
        <h2 className="text-primary font-bold mb-10 text-center">
          Popular Brands (4:3 ~ 400px:312px )
        </h2>
        <div className="grid grid-cols-2 w-full gap-5">
          {popularBrands &&
            popularBrands.map((brand) => (
              <div key={brand.id} className="w-full">
                <input
                  type="file"
                  id={brand.id}
                  hidden
                  onChange={(e) => handleChange(e, brand.id)}
                />
                <input type="text" hidden />
                <div className="card">
                  <div>
                    <img
                      className="card-img-top"
                      src={brand?.croppedImageUrl ?? brand.imageUrl}
                      alt="Card image cap"
                    />
                  </div>

                  <div className="mt-4 px-3 flex justify-center items-center">
                    <Input
                      type="text"
                      value={
                        popularBrands.find((addObj) => addObj.id === brand.id)
                          ?.link
                      }
                      onChange={(e) => handleChangeInput(e, brand.id)}
                    />
                  </div>

                  <div className="card-body">
                    <div className="flex items-center justify-center gap-10">
                      <label
                        htmlFor={brand.id}
                        className="btn btn-primary text-white shadow-none"
                      >
                        Brower
                      </label>
                      <button
                        onClick={() => handleClickUpdate(brand.id)}
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
export default PopularBrandsManage;
