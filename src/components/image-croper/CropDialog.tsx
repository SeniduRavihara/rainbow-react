import { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/lib/cropImage";
import "./cropDialog.css";

type ImageCropDialogProps = {
  imageUrl: string;
  cropInit?: { x: number; y: number } | null;
  zoomInit?: number | null;
  aspectInit: number;
  onCancel: () => void;
  setCroppedImageFor: (
    crop: { x: number; y: number },
    zoom: number,
    aspect: number,
    croppedImageUrl: string,
    cropedImageBlob: Blob
  ) => void;
};

// const aspectRatios = [
//   { value: 4 / 3, text: "4/3" },
//   { value: 20 / 5, text: "20/9" },
//   { value: 1 / 2, text: "1/2" },
// ];

const ImageCropDialog = ({
  imageUrl,
  cropInit,
  zoomInit,
  aspectInit,
  onCancel,
  setCroppedImageFor,
}: ImageCropDialogProps) => {
  if (zoomInit == null) {
    zoomInit = 1;
  }
  if (cropInit == null) {
    cropInit = { x: 0, y: 0 };
  }

  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  // const [aspect, setAspect] = useState(aspectInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>(null);

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  // const onAspectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = Number(e.target.value);
  //   const ratio = aspectRatios.find((ratio) => ratio.value === value);
  //   if (ratio) {
  //     setAspect(ratio);
  //   }
  // };

  const onCropComplete = (
    _croppedArea: { width: number; height: number; x: number; y: number },
    croppedAreaPixels: { width: number; height: number; x: number; y: number }
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    if (!croppedAreaPixels) return;
    const cropedImageBlob = (await getCroppedImg(
      imageUrl,
      croppedAreaPixels
    )) as Blob;
    const croppedImageUrl: string = URL.createObjectURL(cropedImageBlob);
    // console.log(croppedImageUrl);

    setCroppedImageFor(
      crop,
      zoom,
      aspectInit,
      croppedImageUrl,
      cropedImageBlob
    );
  };

  return (
    <div>
      <div className="backdrop"></div>
      <div className="crop-container">
        <Cropper
          image={imageUrl}
          zoom={zoom}
          crop={crop}
          aspect={aspectInit}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="controls">
        <div className="controls-upper-area">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => {
              onZoomChange(parseFloat(e.target.value));
            }}
            className="slider"
          />

          {/* <select onChange={onAspectChange}>
            {aspectRatios.map((ratio) => (
              <option
                key={ratio.text}
                value={ratio.value}
                selected={ratio.value === aspect.value}
              >
                {ratio.text}
              </option>
            ))}
          </select> */}
        </div>
        <div className="button-area flex items-center justify-center gap-5">
          <button
            className="bg-red-300 rounded-md px-2 py-1 flex items-center justify-center text-white"
            onClick={onCancel}
          >
            Cancel
          </button>
          {/* <button
            className="bg-red-300 rounded-md px-2 py-1 flex items-center justify-center text-white"
            onClick={onResetImage}
          >
            Reset
          </button> */}
          <button
            className="bg-blue-300 rounded-md px-2 py-1 flex items-center justify-center text-white"
            onClick={onCrop}
          >
            Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropDialog;
