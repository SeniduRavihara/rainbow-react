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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tag } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { StoreListDocType, StoreListType, StoreObj } from "@/types";
import Loader from "../Loader";

const Store = () => {
  const [storeList, setStoreList] = useState<StoreListType | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastDocument, setLastDocument] = useState<StoreObj | null>(null);

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
      limit(2)
    );

    const queryStoresSnapshot = await getDocs(q);

    const storeListArr = queryStoresSnapshot.docs.map((doc) => {
      const storeList = doc.data() as StoreListDocType;
      return {
        ...storeList,
        id: doc.id,
      };
    });

    setLastDocument(storeListArr[storeListArr.length - 1]);
    console.log(storeListArr);

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

        return updatedList;
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>EMAIL</TableHead>
            <TableHead>TITLE</TableHead>
            <TableHead className="text-right">ADDRESS</TableHead>
            <TableHead className="text-right">TAG</TableHead>
            <TableHead className="text-right">ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {storeList &&
            storeList.map((storeObj, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{storeObj.email}</TableCell>
                <TableCell className="font-medium">{storeObj.email}</TableCell>
                <TableCell>{storeObj.title}</TableCell>
                <TableCell>{storeObj.address}</TableCell>
                <TableCell className="text-right">
                  {storeObj.tags.map((tag, index) => (
                    <Tag key={index} className="m-2">
                      {tag}
                    </Tag>
                  ))}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    className={`${
                      storeObj.active ? "bg-blue-500" : "bg-red-500"
                    }`}
                    onClick={() => toggleActive(storeObj.id, storeObj.active)}
                  >
                    {storeObj.active ? "Dective" : "Active"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Button
        className="flex items-center justify-center"
        onClick={fetchData}
        disabled={loading}
      >
        {loading ? <Loader /> : "Load More"}
      </Button>
    </div>
  );
};
export default Store;
