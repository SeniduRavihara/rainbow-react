import { useData } from "@/hooks/useData";
import StoreCard from "./StoreCard";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchData } from "@/firebase/api";
import { StoreListType } from "@/types";

const ResultList = () => {
  const {
    searchResultStores,
    setSearchResultStores,
    setLoadingStoreFetching,
    setLastDocument,
    lastDocument,
    isAllFetched,
    setIsAllFetched,
    loadingStoreFetching,
  } = useData();
  // const [loading, setLoading] = useState(false);
  // const [lastDocument, setLastDocument] = useState<StoreObj | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleStores, setVisibleStores] = useState<StoreListType | null>();
  const [allPageCount, setAllPageCount] = useState(0);

  useEffect(() => {
    if (isAllFetched) setAllPageCount(currentPage);
  }, [currentPage, isAllFetched]);

  useEffect(() => {
    if (!searchResultStores) {
      fetchData({
        lastDocument,
        setLastDocument,
        setLoadingStoreFetching,
        setSearchResultStores,
        setIsAllFetched,
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

    // const collectionRef = collection(db, "store");
    // const q = query(
    //   collectionRef,
    //   orderBy("createdAt", "desc"),
    //   startAfter(lastDocument?.createdAt ?? ""),
    //   limit(3)
    // );

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

  useEffect(() => {
    const startIndex = (currentPage - 1) * 3;
    const endIndex = startIndex + 3;

    console.log(startIndex, endIndex);
    setVisibleStores(
      searchResultStores ? searchResultStores.slice(startIndex, endIndex) : []
    );
  }, [currentPage, searchResultStores]);

  const handleNextClick = () => {
    if (allPageCount <= currentPage) setCurrentPage((pre) => pre + 1);

    if (searchResultStores && searchResultStores?.length / 3 === currentPage) {
      fetchData({
        lastDocument,
        setLastDocument,
        setLoadingStoreFetching,
        setSearchResultStores,
        setIsAllFetched,
      });
    }
  };

  const handlePrevClick = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  if (loadingStoreFetching) {
    return <div>Loading ... </div>;
  }
  return (
    <div className="flex flex-col justify-between items-center">
      <ul className="flex flex-col gap-3">
        {visibleStores &&
          visibleStores.map((data, index) => (
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

      <div className="flex gap-10 mb-2 items-end justify-center">
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
