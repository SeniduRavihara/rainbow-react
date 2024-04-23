import { db } from "@/firebase/config";
import { useData } from "@/hooks/useData";
import { StoreListType } from "@/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Create Your Store</h2>
        <p className="mb-4">
          It seems like you haven't created a store yet. Create one now to start
          selling!
        </p>
        <Link to="/create-store" className="text-blue-500 hover:underline">
          Create Store
        </Link>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Benefits of Having a Store
          </h2>
          <ul className=" pl-6">
            <li>Reach a wider audience</li>
            <li>Manage your products and inventory</li>
            <li>Accept payments online</li>
            <li>Track sales and analytics</li>
            {/* Add more benefits as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ManageStoresPage;
