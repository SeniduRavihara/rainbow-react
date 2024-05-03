import { db } from "@/firebase/config";
import { CircularProgress } from "@chakra-ui/react";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const OurProductsTab = ({ storeId }: { storeId: string }) => {
  const [productList, setProductList] = useState<
    Array<{ imageUrl: string; id: string; name: string; discription: string }>
  >([]);

  useEffect(() => {
    if (storeId) {
      const collectionRef = collection(db, "store", storeId, "products");
      const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
        const productListArr = QuerySnapshot.docs.map((doc) => ({
          ...doc.data(), // Potential source of error
          id: doc.id,
        })) as Array<{
          imageUrl: string;
          id: string;
          name: string;
          discription: string; // Potential source of error (typo in 'description')
        }>;

        console.log(productListArr);
        setProductList(productListArr);
      });

      return unsubscribe;
    }
  }, [storeId]);

  const handleProductClick = ()=>{

  };

  if (!productList) return <CircularProgress size="30px" isIndeterminate color="green.300" />;
    return (
      <div>
        <ul className="w-full mt-5 flex flex-wrap gap-5">
          {productList.map((productObj, index) => (
            <li
              key={index}
              className="flex flex-col items-center justify-items-center border p-3"
              onClick={handleProductClick}
            >
              <img src={productObj.imageUrl} className="w-[100px]" alt="" />
              <h3>{productObj.name}</h3>
              
            </li>
          ))}
        </ul>
      </div>
    );
};
export default OurProductsTab;
