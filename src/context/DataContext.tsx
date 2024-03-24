import { db } from "@/firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
// import {
//   collection,
//   getDocs,
//   limit,
//   orderBy,
//   query,
//   startAfter,
// } from "firebase/firestore";
// import { db } from "@/firebase/config";

export const DataContext = createContext({});

function DataContextProvider({ children }: { children: React.ReactNode }) {
  const [currentUserData, setCurrentUserData] = useState(null);
  const [sectionAdds, setSectionAdds] = useState(null);
  const [sliderAdds, setSliderAdds] = useState(null);

  useEffect(() => {
    const collectionRef = collection(db, "sectionAdds");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const sctionAddsArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(sctionAddsArr);
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
      }));
      console.log(sliderAddsArr);
      setSliderAdds(sliderAddsArr);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUserData,
    setCurrentUserData,
    sectionAdds,
    sliderAdds,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
export default DataContextProvider;
