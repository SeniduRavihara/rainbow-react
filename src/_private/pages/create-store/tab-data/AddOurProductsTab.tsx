import ImageCropDialog from "@/components/image-croper/CropDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db, storage } from "@/firebase/config";
import { CircularProgress } from "@chakra-ui/react";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

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

const AddOurProductsTab = ({ storeId }: { storeId: string }) => {
  const [open, setOpen] = useState(false);
  const [productImage, setProductImage] = useState<{
    cropedImageBlob: Blob;
    croppedImageUrl: string;
  }>();
  const [isOpenCropDialog, setIsOpenCropDialog] = useState(false);
  const [imageData, setImageData] = useState<ImageData>(initData);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDiscription, setProductDiscription] = useState("");

  const [productList, setProductList] = useState<
    Array<{ imageUrl: string; id: string; name: string; discription:string }>
  >([]);

  useEffect(() => {
    const collectionRef = collection(db, "store", storeId, "products");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const productListArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<{
        imageUrl: string;
        id: string;
        name: string;
        discription: string;
      }>;

      // console.log(productListArr);
      setProductList(productListArr);
    });

    return unsubscribe;
  }, [storeId]);

  const handleClickCreate = async () => {
    if (!productName || !productImage)
      return toast.error("Please fill all fields");
    setLoading(true);

    try {
      const collectionRef = collection(db, "store", storeId, "products");

      const imageUrl = await uploadProductImage();

      await addDoc(collectionRef, {
        name: productName,
        discription: productDiscription,
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
    setLoading(false);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const documentRef = doc(db, "store", storeId, "products", id);
      await deleteDoc(documentRef);
      toast.success("Document successfully deleted!");
    } catch (error) {
      console.log(error);
    }

  };

  const uploadProductImage = async () => {
    try {
      if (!productImage) {
        throw new Error("No product image provided");
      }

      const fileRef = ref(
        storage,
        `store_data/${storeId}/products/${productName}`
      );

      await uploadBytes(fileRef, productImage.cropedImageBlob);
      const photoURL = await getDownloadURL(fileRef);
      toast.success("Product Image uploaded successfully!");

      return photoURL;
    } catch (error) {
      console.error("Error uploading product image:", error);
      throw new Error("Failed to upload product image");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const localUrl = URL.createObjectURL(file);

    setImageData({
      imageUrl: localUrl,
      croppedImageUrl: null,
      crop: null,
      zoom: null,
      aspect: 4 / 3,
      id: "",
    });

    // setProductImage(file);

    setIsOpenCropDialog(true);
    setOpen(false);
  };

  const onCancel = () => {
    setImageData(initData);
    setIsOpenCropDialog(false);
    setOpen(true);
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

    setProductImage({ cropedImageBlob, croppedImageUrl });

    setIsOpenCropDialog(false);
    setOpen(true);
  };

  return (
    <div className="lg:px-10 flex flex-col items-center justify-center">
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

      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setOpen(true)}>
            Create Product
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Your Product</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <img src={productImage?.croppedImageUrl} alt="" />
              <label
                htmlFor="image-input1"
                className="btn btn-primary text-white shadow-none"
              >
                Browse Product Image
              </label>
              <input
                type="file"
                id="image-input1"
                hidden
                required
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="w-full md:px-10">
              <Label htmlFor="">Product Name</Label>
              <Input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              ></Input>
            </div>

            <div className="w-full md:px-10">
              <Label htmlFor="">Product Discription</Label>
              <Input
                type="text"
                value={productDiscription}
                onChange={(e) => setProductDiscription(e.target.value)}
              ></Input>
            </div>
          </div>

          <DialogFooter>
            <div className="flex items-center justify-center gap-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </DialogClose>

              {loading ? (
                <CircularProgress
                  size="30px"
                  isIndeterminate
                  color="green.300"
                />
              ) : (
                <Button type="button" onClick={handleClickCreate}>
                  Create
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ul className="w-full mt-3 flex flex-wrap gap-4 items-center justify-center">
        {productList.map((productObj, index) => (
          <li
            key={index}
            className="flex flex-col items-center justify-items-center border rounded-lg py-4 pb-2 gap-2"
          >
            <img src={productObj.imageUrl} className="w-[180px]" alt="" />
            <h3 className="font-semibold">{productObj.name}</h3>
            <RxCross2 className="cursor-pointer hover:text-red-500 duration-200 text-2xl" onClick={() => handleDeleteProduct(productObj.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AddOurProductsTab;
