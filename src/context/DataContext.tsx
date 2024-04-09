import { INITIAL_DATA_CONTEXT } from "@/constants";
import { db } from "@/firebase/config";
import {
  CurrentUserDataType,
  DataContextType,
  StoreListType,
  StoreObj,
} from "@/types";
import {
  Timestamp,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext<DataContextType>(INITIAL_DATA_CONTEXT);

function DataContextProvider({ children }: { children: React.ReactNode }) {
  const [currentUserData, setCurrentUserData] =
    useState<CurrentUserDataType>(null);
  const [popularBrands, setPopularBrands] = useState<Array<{
    imageUrl: string;
    id: string;
  }> | null>(null);
  const [sectionAdds, setSectionAdds] = useState<Array<{
    imageUrl: string;
    id: string;
  }> | null>(null);
  const [sliderAdds, setSliderAdds] = useState<Array<{
    imageUrl: string;
    id: string;
  }> | null>(null);

  const [searchResultStores, setSearchResultStores] =
    useState<StoreListType | null>(null);
  const [location, setLocation] = useState("");
  const [searchItem, setSearchitem] = useState("");
  const [loadingStoreFetching, setLoadingStoreFetching] = useState(false);
  const [lastDocument, setLastDocument] = useState<StoreObj | null>(null);
  const [isAllFetched, setIsAllFetched] = useState(false);

  const [messagesToAll, setMessagesToAll] = useState<Array<{
    message: string;
    createdAt: Timestamp;
    id: string;
  }> | null>(null);

  useEffect(() => {
    const collectionRef = collection(db, "sectionAdds");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const sctionAddsArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<{ imageUrl: string; id: string }>;

      // console.log(sctionAddsArr);
      setSectionAdds(sctionAddsArr);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "sliderAdds");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const sliderAddsArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<{ imageUrl: string; id: string }>;

      // console.log(sliderAddsArr);
      setSliderAdds(sliderAddsArr);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "pupularBrands");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const popularBrandsArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<{ imageUrl: string; id: string }>;

      // console.log(popularBrandsArr);
      setPopularBrands(popularBrandsArr);
    });

    return unsubscribe;
  }, []);

  // -----------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      if (currentUserData && currentUserData.haveStore) {
        const collectionRef = collection(db, "messagesToAll");
        const q = query(collectionRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, async (QuerySnapshot) => {
          const messageArr = QuerySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as Array<{ message: string; id: string; createdAt: Timestamp }>;

          // setMessagesToAll(messageArr);
          // console.log(messageArr);

          for (let i = 0; i < messageArr.length; i++) {
            const messageObj = messageArr[i];
            const userMessagesRef = doc(
              db,
              "users",
              currentUserData.id,
              "messages",
              messageObj.id
            );

            await setDoc(userMessagesRef, { ...messageObj });
          }
        });

        return unsubscribe;
      }
    };

    fetchData();
  }, [currentUserData]);

  // ---------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      if (currentUserData) {
        const collectionRef = collection(
          db,
          "users",
          currentUserData.id,
          "messages"
        );
        const q = query(collectionRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, async (QuerySnapshot) => {
          const messageArr = QuerySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as Array<{ message: string; id: string; createdAt: Timestamp }>;

          setMessagesToAll(messageArr);
          console.log(messageArr);
        });

        return unsubscribe;
      }
    };

    fetchData();
  }, [currentUserData]);

  const value = {
    currentUserData,
    setCurrentUserData,
    sectionAdds,
    sliderAdds,
    popularBrands,
    searchResultStores,
    setSearchResultStores,
    searchItem,
    setSearchitem,
    location,
    setLocation,
    loadingStoreFetching,
    setLoadingStoreFetching,
    lastDocument,
    setLastDocument,
    isAllFetched,
    setIsAllFetched,
    messagesToAll,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
export default DataContextProvider;
