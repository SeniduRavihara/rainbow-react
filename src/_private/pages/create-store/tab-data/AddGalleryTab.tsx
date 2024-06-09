import { Button } from "@/components/ui/button";
import { db, storage } from "@/firebase/config";
import { CircularProgress } from "@chakra-ui/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 } from "uuid";

const AddGalleryTab = ({ storeId }: { storeId: string }) => {
  const [selectedFiles, setSelectedFiles] = useState<Array<File>>([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState({
    status: false,
    id: "",
    refName: "",
  });
  const [gallery, setGallery] = useState<Array<{
    imageUrl: string;
    refName: string;
    id: string;
  }> | null>(null);


  useEffect(() => {
    const collectionRef = collection(db, "latestStore", storeId, "gallery");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const sctionStaticAddsArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<{ imageUrl: string; refName: string; id: string }>;

      //  console.log(sctionStaticAddsArr);
      setGallery(sctionStaticAddsArr);
    });

    return unsubscribe;
  }, [storeId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setSelectedFiles(files);
  };

  const handleClickUpdate = async () => {
    setLoading(true);
      const documentRef = doc(db, "latestStore", storeId);
      const latestData = await getDoc(documentRef);

      await setDoc(documentRef, {
        ...latestData.data(),
        haveUpdate: [
          ...(latestData?.data()?.haveUpdate ?? []),
          latestData?.data()?.haveUpdate.includes("gallery")
            ? undefined
            : "gallery",
        ].filter((txt) => txt),
      });

    // ----------
    for (const selectedFile of selectedFiles) {
      try {
        const { photoURL, refName } = await uploadImage(selectedFile);
        if (photoURL && refName) {
          const collectionRef = collection(
            db,
            "latestStore",
            storeId,
            "gallery"
          );

          await addDoc(collectionRef, {
            imageUrl: photoURL,
            refName,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    // ----------
    setLoading(false);
  };


  const uploadImage = async (file: File) => {
    try {
      const refName = v4();

      const fileRef = ref(
        storage,
        `store_data/${storeId}/store-gallery/${refName}`
      );

      await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(fileRef);

      return { photoURL, refName };
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("An error occurred while uploading files. Please try again later.");
      return { photoURL: "", refName: "" };
    }
  };

  const handleDeleteGalleryImage = async (id: string, refName: string) => {
    try {
      // Delete the product document
      const documentRefLatest = doc(db, "latestStore", storeId, "gallery", id);
      await deleteDoc(documentRefLatest);

      const documentRef = doc(db, "store", storeId, "gallery", id);
      await deleteDoc(documentRef);

      // Delete the image from storage
      const imageRef = ref(
        storage,
        `store_data/${storeId}/store-gallery/${refName}`
      );
      await deleteObject(imageRef);
      toast.success("Image successfully deleted!");    } catch (error) {
      console.log(error);
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex items-center justify-center gap-5">
        <label
          htmlFor="image-input"
          className="btn py-2 btn-primary text-white shadow-none"
        >
          Browse Images
        </label>

        <div className="flex items-center justify-center gap-5">
          {loading ? (
            <CircularProgress size="30px" isIndeterminate color="green.300" />
          ) : (
            <Button onClick={handleClickUpdate}>Update</Button>
          )}
        </div>
      </div>

      <input
        type="file"
        id="image-input"
        hidden
        accept="image/*" // Restrict file selection to only image files
        onChange={handleFileChange}
        multiple
      />

      <h2 className="font-semibold mt-5 mb-3">Available Images</h2>
      {/* <div className="grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 gap-4">
        {selectedFiles.length > 0 &&
          Array.from(selectedFiles).map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-[200px] h-auto"
            />
          ))}
      </div> */}

      <div className="grid grid-cols-2 xsm:grid-cols-3 2xl:grid-cols-4 gap-2 max-h-[500px] overflow-y-scroll ">
        {gallery &&
          gallery.map((imgObj, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() =>
                setShowDeleteIcon({
                  status: true,
                  id: imgObj.id,
                  refName: imgObj.refName,
                })
              }
              onMouseLeave={() =>
                setShowDeleteIcon({
                  status: true,
                  id: "",
                  refName: "",
                })
              }
            >
              <img
                src={imgObj.imageUrl}
                alt={imgObj.imageUrl}
                className="w-[150px] h-[120px] object-cover"
              />
              {showDeleteIcon.id === imgObj.id && (
                <div
                  className="cursor-pointer w-full text-center hover:text-red-500 duration-200 text-2xl absolute bottom-0 backdrop-blur-xl"
                  onClick={() =>
                    handleDeleteGalleryImage(imgObj.id, imgObj.refName)
                  }
                >
                  <Button variant="link" className="text-white">
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
export default AddGalleryTab;
