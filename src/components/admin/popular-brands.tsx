import { db } from "@/firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const PopularBrands = () => {
  const [popularBrands, setPopularBrands] = useState(null);

  useEffect(() => {
    const collectionRef = collection(db, "pupularBrands");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const popularBrandsArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(popularBrandsArr);
      setPopularBrands(popularBrandsArr);
    });

    return unsubscribe;
  }, []);

  if (!popularBrands) return <div>Loading...</div>;

  return (
    <div className="w-full p-10  flex">
      {popularBrands &&
        popularBrands.map((addObj, index) => (
          <img key={index} className="w-80" src={addObj.imageUrl} alt="ADD" />
        ))}
    </div>
  );
};
export default PopularBrands;
