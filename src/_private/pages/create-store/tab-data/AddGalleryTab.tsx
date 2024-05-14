import { Button } from "@/components/ui/button";
import { db, storage } from "@/firebase/config";
import { CircularProgress } from "@chakra-ui/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import toast from "react-hot-toast";

const AddGalleryTab = ({ storeId }: { storeId: string }) => {
  const [selectedFiles, setSelectedFiles] = useState<Array<File>>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setSelectedFiles(files);
  };

  const handleClickUpdate = async () => {
    setLoading(true);
    try {
      const downloadUrls = await handleUpload();

      const documentRef = doc(db, "latestStore", storeId);
      const latestData = await getDoc(documentRef);

      await setDoc(documentRef, {
        ...latestData.data(),
        gallery: downloadUrls,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleUpload = async () => {
    if (selectedFiles.length > 0) {
      // Check if any files are selected
      try {
        const downloadUrls: string[] = [];

        for (let index = 0; index < selectedFiles.length; index++) {
          const file = selectedFiles[index];
          const fileRef = ref(
            storage,
            `store_data/${storeId}/latest/store-gallery/${index}`
          );

          if (!file) continue; // Skip if file is null

          await uploadBytes(fileRef, file);
          const photoURL = await getDownloadURL(fileRef);

          downloadUrls.push(photoURL);
        }

        toast.success("All files uploaded successfully!");
        return downloadUrls;
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

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-xl font-semibold mb-4">
        Need a Admin Aprove for update the gallery, Please send a admin Request
      </h1>
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

      <h2 className="font-semibold mt-5">Selected Files</h2>
      <div className="grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 gap-4">
        {selectedFiles.length > 0 &&
          Array.from(selectedFiles).map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-[200px] h-auto"
            />
          ))}
      </div>
    </div>
  );
};
export default AddGalleryTab;
