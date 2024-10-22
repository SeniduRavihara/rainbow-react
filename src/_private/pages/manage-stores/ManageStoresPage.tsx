import { db } from "@/firebase/config";
import { useData } from "@/hooks/useData";
import { StoreListType } from "@/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { CircularProgress } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { LucidePlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      // console.log("Senidu", currentUserStoresArr);

      setLoading(false);
    };

    fetchData();
  }, [currentUserData, currentUserData?.id]);

  const handleStoreClick = (storeId: string) => {
    navigate(`/manage-business-profile/${storeId}`);
  };

  if (loading) return (
    <div className="w-full h-screen flex items-center justify-center">
      <CircularProgress size="60px" isIndeterminate color="green.300" />
    </div>
  );

  return (
    <div className="w-full flex flex-col">
      {/* <Link
        to="/"
        className="absolute top-5 left-5 w-10 h-10 text-4xl font-extralight"
      >
        <IoIosArrowBack />
      </Link> */}
      <Link
        to="/"

        className="absolute top-0 left-5 w-10 h-10 text-4xl font-extralight"
      >
        <Button variant="outline">
          <IoIosArrowBack className="" />
        </Button>
      </Link>

      {/* <>
        <div className="md:absolute md:-top-2 md:left-5 flex text-4xl font-extralight items-center mt-4 justify-center">
          <Link
            className="relative -left-3"
            to="/manage-business-profiles"

            // className="absolute top-0 left-5 w-10 h-10 text-4xl font-extralight"
          >
            <Button variant="outline">
              <IoIosArrowBack />
            </Button>
          </Link>

          <Link to="/" className="flex items-center justify-center">
            <img src={logo} alt="logo" className="h-12 w-36" />
          </Link>
        </div>

        <h1 className="text-xl font-bold md:mt-6">
          Register Your Business Profile
        </h1>
      </> */}

      <div className="mt-20 sm:mt-5">
        <div className="flex flex-col items-center">
          <h2 className="text-xl sm:text-2xl font-bold px-2 text-blue-500 mb-5">
            Manage Your Business Profiles
          </h2>
          {/* <p className="mb-4 px-2">
            It seems like you haven't created a store yet. Create one now to
            start selling!
          </p> */}
          <Link
            to="/create-business-profile"
            className="text-blue-500 text-xl hover:underline flex font-semibold items-center gap-3"
          >
            <LucidePlusCircle />
            Create Business Profile
          </Link>
        </div>

        <div className="flex items-center justify-center px-10">
          <Table striped bordered hover className="mt-10 ">
            <thead>
              <tr>
                <th>#</th>
                <th>Business Name</th>
                <th>Business Category</th>
                {/* <th>Address</th>
              <th>Email</th> */}
                {/* <th>Telephone</th> */}
                <th>Registered Date</th>
                {/* <th>ACTION</th> */}
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
                    {/* <td>{storeObj.address}</td> */}
                    {/* <td className="font-medium">{storeObj.email}</td> */}
                    {/* <td className="text-right">
                  {storeObj.tags.slice(0, 4).map((tag, index) => (
                    <Tag key={index} className="m-2">
                      {tag}
                    </Tag>
                  ))}
                </td> */}
                    {/* <td className="font-medium">{storeObj.phoneNumber}</td> */}
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
    </div>
  );
};
export default ManageStoresPage;
