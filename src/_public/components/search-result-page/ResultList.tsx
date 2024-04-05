import { useData } from "@/hooks/useData";
import StoreCard from "./StoreCard";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/firebase/api";

const ResultList = () => {
  const {
    searchResultStores,
    setSearchResultStores,
    setLoadingStoreFetching,
    setLastDocument,
    lastDocument,
  } = useData();
  // const [loading, setLoading] = useState(false);
  // const [lastDocument, setLastDocument] = useState<StoreObj | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!searchResultStores) {
      fetchData({
        lastDocument,
        setLastDocument,
        setLoadingStoreFetching,
        setSearchResultStores,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(()=>{
  //   if (searchResultStores && searchResultStores?.length / 3 === currentPage) {
  //     setSearchResultStores(searchResultStores.slice())
  //   }
  // },[currentPage, searchResultStores, setSearchResultStores])

  // const fetchData = async () => {
  //   setLoading(true);

  //   const collectionRef = collection(db, "store");
  //   const q = query(
  //     collectionRef,
  //     orderBy("createdAt", "desc"),
  //     startAfter(lastDocument?.createdAt ?? ""),
  //     limit(3)
  //   );

  //   const queryStoresSnapshot = await getDocs(q);

  //   const storeListArr = queryStoresSnapshot.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  //   })) as StoreListType;

  //   setLastDocument(storeListArr[storeListArr.length - 1]);
  //   console.log(storeListArr);

  //   if (storeListArr.length > 0) {
  //     setSearchResultStores((prev) => {
  //       if (prev && prev[0].id === storeListArr[0].id) return prev;
  //       return [...(prev || []), ...storeListArr];
  //     });
  //   } else {
  //     console.log("All Store are Fetched!");
  //   }

  //   setLoading(false);
  // };

  const handleNextClick = () => {
    setCurrentPage((pre) => pre + 1);

    if (searchResultStores && searchResultStores?.length / 3 === currentPage) {
      fetchData({
        lastDocument,
        setLastDocument,
        setLoadingStoreFetching,
        setSearchResultStores,
      });
    }
  };

  const handlePrevClick = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="">
      <ul className="flex flex-col gap-3">
        {searchResultStores &&
          searchResultStores.slice(currentPage, currentPage+3).map((data, index) => (
            <li key={index}>
              <StoreCard
                address={data.address}
                rating={2}
                title={data.title}
                storeImages={data.storeImages}
                tags={data.tags[0]}
                whatsappnumber={data.whatssappNumber}
              />
            </li>
          ))}
      </ul>

      <div className="flex gap-10 my-10">
        <Button variant="ghost" onClick={handlePrevClick}>
          Prev
        </Button>
        <Button variant="ghost" onClick={handleNextClick}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ResultList;
