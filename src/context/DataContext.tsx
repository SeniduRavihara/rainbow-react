import { INITIAL_DATA_CONTEXT } from "@/constants";
import { db } from "@/firebase/config";
import { CurrentUserDataType, DataContextType } from "@/types";
import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext<DataContextType>(INITIAL_DATA_CONTEXT);

function DataContextProvider({ children }: { children: React.ReactNode }) {
  const [currentUserData, setCurrentUserData] =
    useState<CurrentUserDataType>(null);
  const [sectionAdds, setSectionAdds] = useState<Array<{
    imageUrl: string;
    id: string;
  }> | null>(null);
  const [sliderAdds, setSliderAdds] = useState<Array<{
    imageUrl: string;
    id: string;
  }> | null>(null);

  useEffect(() => {
    const collectionRef = collection(db, "sectionAdds");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const sctionAddsArr = QuerySnapshot.docs.map((doc) => {
        const sctionAdd = doc.data() as { imageUrl: string }
        return {
          ...sctionAdd,
          id: doc.id,
        };
      });
      console.log(sctionAddsArr);
      setSectionAdds(sctionAddsArr);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "sliderAdds");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const sliderAddsArr = QuerySnapshot.docs.map((doc) => {
        const sliderAdd = doc.data() as {imageUrl: string}
        return {
          ...sliderAdd,
          id: doc.id,
        };
      });
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
