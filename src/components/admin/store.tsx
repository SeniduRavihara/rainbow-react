import { db } from "@/firebase/config";
import {
  collection,
  doc,
  onSnapshot,
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { StoreListDocType, StoreListType } from "@/types";
 

const Store = () => {
  const [storeList, setStoreList] = useState<StoreListType | null>(null);
  // const [loading, setLoading] = useState(false);

  // const fetchStoreData = async () => {
  //   setLoading(true);

  //   const collectionRef = collection(db, "store");
  //   const q = query(
  //     collectionRef,
  //     // orderBy("publishedTime", "desc"),
  //     startAfter(lastFetchedNews.publishedTime ?? ""),
  //     limit(8)
  //   );

  //   const queryNewsSnapshot = await getDocs(q);

  // };

  useEffect(() => {
    const collectionRef = collection(db, "store");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const storeListArr = QuerySnapshot.docs.map((doc) => {
        const storeList = doc.data() as StoreListDocType
        return {
          ...storeList,
          id: doc.id,
        };
      });
      console.log(storeListArr);
      setStoreList(storeListArr);
    });

    return unsubscribe;
  }, []);

  const toggleActive = async (id: string,active: boolean) => {
    const documentRef = doc(
      db,
      "store",
      id
    );
    try {
      await updateDoc(documentRef, {
        active: !active,
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
          { storeList && storeList.map((storeObj, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{storeObj.email}</TableCell>
              <TableCell className="font-medium">{storeObj.email}</TableCell>
              <TableCell>{storeObj.title}</TableCell>
              <TableCell>{storeObj.address}</TableCell>
              <TableCell className="text-right">
                {storeObj.tags.map((tag) => (
                  <Tag className="m-2">{tag}</Tag>
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
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default Store;
