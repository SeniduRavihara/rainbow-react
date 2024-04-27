import { db } from "@/firebase/config";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
// import { Tag } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";
import { StoreListType, StoreObj } from "@/types";
import Loader from "../../components/Loader";
import { cn } from "@/lib/utils";
import { CircularProgress } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { IoIosSearch } from "react-icons/io";
import algoliasearch from "algoliasearch/lite";
import { RxCross2 } from "react-icons/rx";
import { Input } from "@/components/ui/input";

const searchClient = algoliasearch(
  "6K67WTIHLT",
  "0cb3cddf578f097566b65642564992dc"
);

const searchIndex = searchClient.initIndex("stores");

const StorePage = () => {
  const [storeList, setStoreList] = useState<StoreListType | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingActive, setLoadingActive] = useState({ id: "", state: false });
  const [loadingVerify, setLoadingVerify] = useState({ id: "", state: false });
  const [lastDocument, setLastDocument] = useState<StoreObj | null>(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchQuiery, setSearchQuiery] = useState("");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    setLoading(true);

    const collectionRef = collection(db, "store");
    const q = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      startAfter(lastDocument?.createdAt ?? ""),
      limit(6)
    );

    const queryStoresSnapshot = await getDocs(q);

    const storeListArr = queryStoresSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as StoreListType;

    setLastDocument(storeListArr[storeListArr.length - 1]);
    // console.log(storeListArr);

    if (storeListArr.length > 0) {
      setStoreList((prev) => {
        if (prev && prev[0].id === storeListArr[0].id) return prev;
        return [...(prev || []), ...storeListArr];
      });
    } else {
      console.log("All Store are Fetched!");
    }

    setLoading(false);
  };

  const toggleActive = async (id: string, active: boolean) => {
    setLoadingActive((pre) => ({ ...pre, state: true, id }));
    const documentRef = doc(db, "store", id);
    try {
      await updateDoc(documentRef, {
        active: !active,
      });

      setStoreList((prev) => {
        if (!prev) return prev;

        const updatedList = prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              active: !active,
            };
          }
          return item;
        });

        setLoadingActive((pre) => ({ ...pre, state: false, id }));
        return updatedList;
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const toggleVerify = async (id: string, verified: boolean) => {
    setLoadingVerify((pre) => ({ ...pre, state: true, id }));
    const documentRef = doc(db, "store", id);
    try {
      await updateDoc(documentRef, {
        verified: !verified,
      });

      setStoreList((prev) => {
        if (!prev) return prev;

        const updatedList = prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              verified: !verified,
            };
          }
          return item;
        });

        setLoadingVerify((pre) => ({ ...pre, state: false, id }));
        return updatedList;
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handlesearch = async (searchQuery: string) => {
    try {
      setLoadingSearch(true);
      const result = await searchIndex.search(searchQuery);
      console.log(result);

      const storeList: StoreListType = result.hits.map((hit: any) => ({
        id: hit.objectID,
        title: hit.title,
        active: hit.active,
        address: hit.address,
        email: hit.email,
        tags: hit.tags,
        createdAt: hit.createdAt,
        phoneNumber: hit.phoneNumber,
        whatsappNumber: hit.whatsappNumber,
        storeIcon: hit.storeIcon,
        storeImages: hit.storeImages,
        userId: hit.userId,
        info1: hit.info1,
        info2: hit.info2,
        published: hit.published,
        schedulArr: hit.schedulArr,
        fasebook: hit.fasebook,
        instagram: hit.instagram,
        linkedin: hit.linkedin,
        twitter: hit.twitter,
        youtube: hit.youtube,
        tiktok: hit.tiktok,
        website: hit.website,
        rating: hit.rating,
        reviewCount: hit.reviewCount,
        category: hit.category || "",
        visitCount: hit.visitCount,
        verified: hit.verified || false,
      }));
      setLastDocument(null);
      setStoreList(storeList);

      setLoadingSearch(false);
    } catch (error) {
      toast.error("Network Problem");
      console.log("Error");
    }
  };

  return (
    <div className="pb-10 flex flex-col items-center justify-center">
      <div className="flex w-full items-center gap-2 h-10 mb-10">
        <Input
          type="text"
          placeholder="Restaurants near me"
          className="outline-none w-[70%] px-2 font-md bg-green-50"
          value={searchQuiery}
          onChange={(e) => setSearchQuiery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handlesearch(searchQuiery);
          }}
        />

        {searchQuiery && (
          <RxCross2
            onClick={() => {
              setSearchQuiery("");
            }}
            className="hover:bg-gray-100 duration-200 text-2xl rounded-md w-8 h-8 p-1"
          />
        )}
        {loadingSearch ? (
          <CircularProgress size="30px" isIndeterminate color="green.300" />
        ) : (
          <IoIosSearch
            onClick={() => handlesearch(searchQuiery)}
            className="bg-orange-500 text-white text-2xl cursor-pointer rounded-md w-9 h-9 p-1"
          />
        )}
      </div>

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
            <th>VERIFY</th>
          </tr>
        </thead>
        <tbody>
          {storeList &&
            storeList.map((storeObj, index) => (
              <tr key={index}>
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
                {/* above block have some problem ToDo to fix it */}

                <td className="text-right">
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
                    onClick={() => toggleVerify(storeObj.id, storeObj.verified)}
                  >
                    {loadingVerify.id === storeObj.id &&
                      loadingVerify.state && <Loader />}
                    {storeObj.verified ? "Remove" : "Verify"}
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <div className="w-full flex items-center justify-center">
        <Button
          className="flex items-center justify-center"
          onClick={fetchData}
          disabled={loading && !storeList}
        >
          {loading ? <Loader /> : "Load More"}
        </Button>
      </div>
    </div>
  );
};
export default StorePage;
