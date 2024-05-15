import { INITIAL_DATA_CONTEXT } from "@/constants";
import { db } from "@/firebase/config";
import {
  CurrentUserDataType,
  DataContextType,
  StoreListType,
  StoreObj,
  messageObjType,
} from "@/types";
import { collection,  onSnapshot, orderBy, query } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext<DataContextType>(INITIAL_DATA_CONTEXT);

function DataContextProvider({ children }: { children: React.ReactNode }) {
  const [currentUserData, setCurrentUserData] =
    useState<CurrentUserDataType>(null);
  const [popularBrands, setPopularBrands] = useState<Array<{
    imageUrl: string;
    id: string;
    link: string;
  }> | null>(null);
  const [sectionAdds, setSectionAdds] = useState<Array<{
    imageUrl: string;
    id: string;
    link: string;
  }> | null>(null);
  const [sectionStaticAdds, setSectionStaticAdds] = useState<Array<{
    imageUrl: string;
    id: string;
    link: string;
  }> | null>(null);
  const [sliderAdds, setSliderAdds] = useState<Array<{
    imageUrl: string;
    id: string;
    link: string;
  }> | null>(null);
  const [searchResultSliderAdds, setSearchResultSliderAdds] = useState<Array<{
    imageUrl: string;
    id: string;
    link: string;
  }> | null>(null);
  const [detailsPageSliderAdds, setDetailsPageSliderAdds] = useState<Array<{
    imageUrl: string;
    id: string;
    link: string;
  }> | null>(null);

  const [searchResultStores, setSearchResultStores] =
    useState<StoreListType | null>(null);
  const [location, setLocation] = useState("");
  const [searchItem, setSearchitem] = useState("");
  const [loadingStoreFetching, setLoadingStoreFetching] = useState(false);
  const [lastDocument, setLastDocument] = useState<StoreObj | null>(null);
  const [isAllFetched, setIsAllFetched] = useState(false);
  const [locationArr, setLocationArr] = useState<Array<{
    location: string;
    id: string;
  }> | null>(null);

  // const [messagesToAll, setMessagesToAll] = useState<messageObjType[] | null>(null);
  const [userMessages, setUserMessages] = useState<messageObjType[] | null>(
    null
  );

  // useEffect(()=>{
  //   if(searchItem){
  //     localStorage.setItem("searchItem", searchItem);
  //   }

  //   setSearchitem(localStorage.getItem("searchItem") || "");
  // },[searchItem])

  // useEffect(() => {
  //   const collectionRef = doc(db, "store");
  //   const unsubscribe = onSnapshot(collectionRef,async (QuerySnapshot) => {
  //     const storeData = QuerySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     })) as Array<StoreObj>;

  //     console.log("UPDATE",storeData);

  //      const latestCollectionRef = doc(db, "latestStore", storeData.id);
  //      await updateDoc(latestCollectionRef, storeData)

  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    const collectionRef = collection(db, "sectionAdds");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const sctionAddsArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<{ imageUrl: string; id: string; link: string }>;

      // console.log(sctionAddsArr);
      setSectionAdds(sctionAddsArr);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "sectionStaticAdds");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const sctionStaticAddsArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<{ imageUrl: string; id: string; link: string }>;

      //  console.log(sctionStaticAddsArr);
      setSectionStaticAdds(sctionStaticAddsArr);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "sliderAdds");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const sliderAddsArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<{ imageUrl: string; id: string; link: string }>;

      // console.log(sliderAddsArr);
      setSliderAdds(sliderAddsArr);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "searchResultSliderAdds");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const sliderAddsArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<{ imageUrl: string; id: string; link: string }>;

      // console.log(sliderAddsArr);
      setSearchResultSliderAdds(sliderAddsArr);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "detailsPageSliderAdds");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const sliderAddsArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<{ imageUrl: string; id: string; link: string }>;

      // console.log(sliderAddsArr);
      setDetailsPageSliderAdds(sliderAddsArr);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "pupularBrands");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const popularBrandsArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<{ imageUrl: string; id: string; link: string }>;

      // console.log(popularBrandsArr);
      setPopularBrands(popularBrandsArr);
    });

    return unsubscribe;
  }, []);

  // -----------------------------------------------------
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (currentUserData && currentUserData.haveStore) {
  //       const collectionRef = collection(db, "messagesToAll");
  //       const q = query(collectionRef, orderBy("createdAt", "desc"));

  //       const unsubscribe = onSnapshot(q, async (QuerySnapshot) => {
  //         const messageArr = QuerySnapshot.docs.map((doc) => ({
  //           ...doc.data(),
  //           id: doc.id,
  //         })) as Array<{ message: string; id: string; createdAt: Timestamp }>;

  //         // setMessagesToAll(messageArr);
  //         // console.log(messageArr);

  //         for (let i = 0; i < messageArr.length; i++) {
  //           const messageObj = messageArr[i];
  //           const userMessagesRef = doc(
  //             db,
  //             "users",
  //             currentUserData.id,
  //             "messages",
  //             messageObj.id
  //           );

  //           await setDoc(userMessagesRef, { ...messageObj });
  //         }
  //       });

  //       return unsubscribe;
  //     }
  //   };

  //   fetchData();
  // }, [currentUserData]);

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
          })) as messageObjType[];

          setUserMessages(messageArr);
          // console.log(messageArr);
        });

        return unsubscribe;
      }
    };

    fetchData();
  }, [currentUserData]);

  // ----------------------------------------------------

  useEffect(() => {
    const collectionRef = collection(db, "locations");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const locationArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<{ location: string; id: string }>;

      // console.log("HELOOOOO",locationArr);
      setLocationArr(locationArr);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUserData,
    setCurrentUserData,
    sectionAdds,
    sectionStaticAdds,
    sliderAdds,
    searchResultSliderAdds,
    detailsPageSliderAdds,
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
    userMessages,
    locationArr,
    setLocationArr,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
export default DataContextProvider;
