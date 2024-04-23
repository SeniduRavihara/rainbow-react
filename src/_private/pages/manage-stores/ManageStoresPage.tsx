import { db } from "@/firebase/config";
import { useData } from "@/hooks/useData";
import { StoreListType } from "@/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

const ManageStoresPage = () => {
  const [loading, setLoading] = useState(false);
  const [currentUserStores, setCurrentUserStores] =
    useState<StoreListType | null>(null);

  const { currentUserData } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUserData) return;

      setLoading(true);

      const collectionRef = collection(db, "store");
      const q = query(
        collectionRef,
        where("userId", "==", currentUserData?.id)
      );

      const queryStoresSnapshot = await getDocs(q);
      const currentUserStoresArr = queryStoresSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as StoreListType;

      setCurrentUserStores(currentUserStoresArr);
      console.log("Senidu", currentUserStoresArr);

      setLoading(false);
    };

    fetchData();
  }, [currentUserData, currentUserData?.id]);

  const handleStoreClick = (storeId: string) => {
    navigate(`/manage-store/${storeId}`);
  };

  if (loading) return <>Loading...</>;

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <div>
        <h2 className="text-xl font-semibold mb-4">Create Your Store</h2>
        <p className="mb-4">
          It seems like you haven't created a store yet. Create one now to start
          selling!
        </p>
        <Link to="/create-store" className="text-blue-500 hover:underline">
          Create Store
        </Link>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Business Name</th>
              <th>Business Category</th>
              <th>Address</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>Registered/Requested Date</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentUserStores &&
              currentUserStores.map((storeObj, index) => (
                <tr
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleStoreClick(storeObj.id)}
                >
                  <td className="font-medium">{index + 1}</td>
                  <td>{storeObj.title}</td>
                  <td>{storeObj.category}</td>
                  <td>{storeObj.address}</td>
                  <td className="font-medium">{storeObj.email}</td>
                  {/* <td className="text-right">
                  {storeObj.tags.slice(0, 4).map((tag, index) => (
                    <Tag key={index} className="m-2">
                      {tag}
                    </Tag>
                  ))}
                </td> */}
                  <td className="font-medium">{storeObj.phoneNumber}</td>
                  <td className="font-medium">
                    {storeObj.createdAt.toDate().toDateString()}
                  </td>

                  {/* <td className="text-right">
                    <Button
                      className={cn(
                        ` flex items-center justify-center gap-2`,
                        storeObj.active ? "bg-blue-500" : "bg-red-500"
                      )}
                      disabled={
                        loadingActive.id === storeObj.id && loadingActive.state
                      }
                      onClick={() => toggleActive(storeObj.id, storeObj.active)}
                    >
                      {loadingActive.id === storeObj.id &&
                        loadingActive.state && <Loader />}
                      {storeObj.active ? "Dective" : "Active"}
                    </Button>
                  </td>

                  <td className="text-right">
                    <Button
                      className={cn(
                        ` flex items-center justify-center gap-2`,
                        storeObj.verified ? "bg-blue-500" : "bg-red-500"
                      )}
                      disabled={
                        loadingVerify.id === storeObj.id && loadingVerify.state
                      }
                      onClick={() =>
                        toggleVerify(storeObj.id, storeObj.verified)
                      }
                    >
                      {loadingVerify.id === storeObj.id &&
                        loadingVerify.state && <Loader />}
                      {storeObj.verified ? "Remove" : "Verify"}
                    </Button>
                  </td> */}
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default ManageStoresPage;
