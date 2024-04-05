import { db } from "@/firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const SearchResultAddSection = () => {
  const [searchResultAdds, setSearchResultAdds] = useState<Array<{
    imageUrl: string;
    id: string;
  }> | null>(null);

  useEffect(() => {
    const collectionRef = collection(db, "searchResultAdds");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const searchResultAdds = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<{ imageUrl: string; id: string }>;

      // console.log(searchResultAdds);
      setSearchResultAdds(searchResultAdds);
    });

    return unsubscribe;
  }, []);

  return (
    <ul className="flex flex-col gap-4">
      {searchResultAdds?.map((add, index) => (
        <li key={index}>
          <img src={add.imageUrl} alt="" className="w-[400px]" />
        </li>
      ))}
    </ul>
  );
};
export default SearchResultAddSection;
