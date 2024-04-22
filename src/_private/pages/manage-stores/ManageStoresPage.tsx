import { db } from "@/firebase/config";
import { useData } from "@/hooks/useData";
import { StoreListType } from "@/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const ManageStoresPage = () => {
  const [loading, setLoading] = useState(false);
  const [currentUserStores, setCurrentUserStores] =
    useState<StoreListType | null>(null);

  const { currentUserData } = useData();

  console.log(currentUserStores);
  

  useEffect(() => {
    const fetchData = async () => {
      // if (!currentUserData) return;

      setLoading(true);

      const collectionRef = collection(db, "store");
      const q = query(collectionRef, where("uid", "==", currentUserData?.id));

      const queryStoresSnapshot = await getDocs(q);
      const currentUserStoresArr = queryStoresSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as StoreListType;

      setCurrentUserStores(currentUserStoresArr);
      setLoading(false);
    };

    fetchData();
  }, [currentUserData?.id]);

  if (loading) return <>Loading...</>;

  return <div>ManageStoresPage</div>;
};
export default ManageStoresPage;
