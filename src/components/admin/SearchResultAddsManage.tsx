import { uploadAdd } from "@/firebase/api";
import { db } from "@/firebase/config";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
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

interface SearchResultAdd {
  imageUrl: string;
  id: string;
  imageFile?: File;
  localUrl?: string;
  cropedImageBlob?: Blob;
  croppedImageUrl: string;
  link: string
}

const initData: ImageData = {
  imageUrl: "",
  croppedImageUrl: null,
  crop: null,
  zoom: null,
  aspect: 16 / 9,
  id: "",
};

const SearchResultAddsManage = () => {
  const [isOpenCropDialog, setIsOpenCropDialog] = useState(false);
  const [imageData, setImageData] = useState<ImageData>(initData);
  const [searchResultAdds, setSearchResultAdds] = useState<
    SearchResultAdd[] | null
  >(null);

  useEffect(() => {
    const collectionRef = collection(db, "searchResultAdds");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const searchResultAddsArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as SearchResultAdd[];
      // console.log searchResultAddsArr);
      setSearchResultAdds(searchResultAddsArr);
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

    setSearchResultAdds((prevState) =>
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
      setSearchResultAdds((prevState) =>
        prevState
          ? prevState.map((add) =>
              add.id === id ? { ...add, link: e.target.value } : add
            )
          : prevState
      );
    };

  const handleClickUpdate = async (idToUpdate: string) => {
    if (!searchResultAdds) return;
    const addToUpdate = searchResultAdds.find(({ id }) => id === idToUpdate);
    
    if (!addToUpdate?.cropedImageBlob) {
      // console.error("Add not found or image file missing");
      try {
        const documentRef = doc(db, "searchResultAdds", idToUpdate);
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
        "search-result-adds",
        idToUpdate
      );
      if (imageUrl) toast.success("Banner Uploaded successfully");
      try {
        const documentRef = doc(db, "searchResultAdds", idToUpdate);
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

    setSearchResultAdds((prevState) =>
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
        <h2 className="text-primary font-bold mb-10 text-center">
          Search Result Adds (16:9 ~ 1000px:562px )
        </h2>

        <div className="grid grid-cols-2 w-full gap-5">
          {searchResultAdds &&
            searchResultAdds.map((add) => (
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
                        searchResultAdds.find((addObj) => addObj.id === add.id)?.link
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
export default SearchResultAddsManage;
