import { db } from "@/firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchResultAddSection = () => {
  const [searchResultAdds, setSearchResultAdds] = useState<Array<{
    imageUrl: string;
    id: string;
    link: string;
  }> | null>(null);

  const navigate = useNavigate();

  const handleImageClick = (link: string) => {
    if (link) {
      if (link.startsWith("http") || link.startsWith("https")) {
        window.open(link, "_blank");
      } else {
        navigate(link);
      }
    }
  };

  useEffect(() => {
    const collectionRef = collection(db, "searchResultAdds");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const searchResultAdds = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<{ imageUrl: string; id: string; link: string }>;

      // console.log(searchResultAdds);
      setSearchResultAdds(searchResultAdds);
    });

    return unsubscribe;
  }, []);

  return (
    <ul className="hidden flex-col gap-4 880:flex">
      {searchResultAdds?.map((add, index) => (
        <li key={index} onClick={() => handleImageClick(add.link)}>
          <img src={add.imageUrl} alt="" className="w-[400px]" />
        </li>
      ))}
    </ul>
  );
};
export default SearchResultAddSection;
