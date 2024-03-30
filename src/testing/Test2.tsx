import "./App.css";
import { useEffect, useState } from "react";
import ImageCropDialog from "@/components/image-croper/CropDialog";

const initData = {
  imageUrl: "",
  croppedImageUrl: null,
  crop: null,
  zoom: null,
  aspect: null,
};

function Test2() {
  const [imageData, setImageData] = useState(initData);
  const [isOpenCropDialog, setIsOpenCropDialog] = useState(false);

  useEffect(() => {
    console.log(imageData);
  }, [imageData]);

  const onCancel = () => {
    setImageData(initData);
  };

  const setCroppedImageFor = (crop, zoom, aspect, croppedImageUrl) => {
    setImageData((pre) => ({ ...pre, croppedImageUrl, crop, zoom, aspect }));
    setIsOpenCropDialog(false);
  };

  const resetImage = () => {
    setCroppedImageFor(null, null, null, null);
  };

  return (
    <div className="text-yellow-500">
      {isOpenCropDialog ? (
        <ImageCropDialog
          imageUrl={imageData.imageUrl}
          cropInit={imageData.crop}
          zoomInit={imageData.zoom}
          aspectInit={imageData.aspect}
          onCancel={onCancel}
          setCroppedImageFor={setCroppedImageFor}
          resetImage={resetImage}
          setImageData={setImageData}
        />
      ) : null}

      <div className="imageCard">
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              const file = e.target.files[0];
              const localUrl = URL.createObjectURL(file);
              setImageData((prevState) => {
                return {
                  ...prevState,
                  imageUrl: localUrl,
                };
              });
            }
          }}
        />

        <img
          src={imageData.croppedImageUrl ?? imageData.imageUrl}
          onClick={() => {
            console.log(imageData);
            setIsOpenCropDialog(true);
          }}
        />
      </div>
    </div>
  );
}

export default Test2;
