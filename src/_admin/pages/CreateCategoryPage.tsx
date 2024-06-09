import CategoryCard from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCategory } from "@/firebase/api";
import { db, storage } from "@/firebase/config";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

const CreateCategoryPage = () => {
  const [label, setLabel] = useState("");
  const [imageFile, setImagefile] = useState<File | null>(null);
  const [categories, setCategories] = useState<
    {
      label: string;
      icon: string;
      id: string;
    }[]
  >([]);

  useEffect(() => {
    const collectionRef = collection(db, "categories");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const categoriesArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as {
        label: string;
        icon: string;
        id: string;
      }[];

      // console.log(categoriesArr);
      setCategories(categoriesArr);
    });

    return unsubscribe;
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const photoUrl = await uploadStoreIcon();
      if (photoUrl) {
        await createCategory({ label, icon: photoUrl });
        toast.success("Category created successfully");
        setLabel("");
        setImagefile(null);
      }
    } catch (error) {
      // Handle the error appropriately
      console.error("An error occurred:", error);
      // You can also show a toast or notification to the user
      toast.error(
        "An error occurred while submitting the form. Please try again."
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImagefile(file);
  };

  const uploadStoreIcon = async () => {
    if (imageFile) {
      try {
        const fileRef = ref(storage, `categories/${label}`);
        await uploadBytes(fileRef, imageFile);
        const photoURL = await getDownloadURL(fileRef);

        return photoURL;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      // Find the product by id
      const product = categories.find((category) => category.id === id);
      if (!product) {
        console.error("Category not found");
        return;
      }

      // Delete the product document
      const documentRef = doc(db, "categories", id);
      await deleteDoc(documentRef);
      toast.success("Product successfully deleted!");

      // Delete the image from storage
      const imageRef = ref(
        storage,
        `categories/${id}`
      );
      await deleteObject(imageRef);
      toast.success("Image successfully deleted!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product and image");
    }
  };


  return (
    <div className="pb-5 pt-3 px-20">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div>
          <Label>Category name</Label>
          <Input value={label} onChange={(e) => setLabel(e.target.value)} />
        </div>

        <div className="">
          <input type="file" id="icon" hidden onChange={handleChange} />
          <label
            htmlFor="icon"
            className="btn btn-primary text-white shadow-none"
          >
            Browser
          </label>
        </div>

        <Button type="submit">Create</Button>
      </form>

      <ul className="w-full grid gap-x-20 grid-cols-3 xsm:grid-cols-4 sm:grid-cols-5  md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-9 ">
        {categories.map((categoryObj, index) => (
          <li key={index} className="flex flex-col items-center justify-center">
            <CategoryCard label={categoryObj.label} icon={categoryObj.icon} />
            <RxCross2
              className="cursor-pointer hover:text-red-500 duration-200 text-2xl mt-1"
              onClick={() => handleDeleteCategory(categoryObj.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CreateCategoryPage;
