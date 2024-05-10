import { useData } from "@/hooks/useData";
import StoreCard from "./StoreCard";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchCatogaryData } from "@/firebase/api";
import { StoreListType } from "@/types";
import { SkeletonCard } from "@/components/SkeletonCard";

const ResultList = ({ category }: { category:string }) => {
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
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleStores, setVisibleStores] = useState<StoreListType | null>();
  const [allPageCount, setAllPageCount] = useState(0);

  // const params = useParams();
  // const category = params.category;

  console.log(visibleStores);
  


  useEffect(() => {
    if (isAllFetched) setAllPageCount(currentPage);
  }, [currentPage, isAllFetched]);

  // useEffect(() => {
  //   if (!searchResultStores) {
  //     fetchData({
  //       lastDocument,
  //       setLastDocument,
  //       setLoadingStoreFetching,
  //       setSearchResultStores,
  //       setIsAllFetched,
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * 8;
    const endIndex = startIndex + 8;

    // console.log(startIndex, endIndex);
    setVisibleStores(
      searchResultStores ? searchResultStores.slice(startIndex, endIndex) : []
    );
  }, [currentPage, searchResultStores]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optionally, you can use smooth scrolling
    });
  };

  const handleNextClick = () => {
    scrollToTop();
    if (allPageCount <= currentPage) setCurrentPage((pre) => pre + 1);

    if (searchResultStores && searchResultStores?.length / 8 === currentPage) {
      fetchCatogaryData(
        {
          lastDocument,
          setLastDocument,
          setLoadingStoreFetching,
          setSearchResultStores,
          setIsAllFetched,
        },
        category
      );
    }
  };

  const handlePrevClick = () => {
    scrollToTop();
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // const handleStoreClick = (id: string)=>{
  //   navigate(`/store-details/${id}`);
  // }

  if (loadingStoreFetching) {
    return (
      <div className="flex flex-col gap-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-between items-center">
      <ul className="flex flex-col gap-3">
        {visibleStores &&
          visibleStores.map((data, index) => (
            <li key={index}>
              <StoreCard
                id={data.id}
                address={data.address}
                title={data.title}
                storeImages={data.storeImages}
                tags={data.tags}
                whatsappnumber={data.whatsappNumber}
                reviewCount={data.reviewCount}
                rating={data.rating}
                verified={data.verified}
                showProfile={data.showProfile}
              />
            </li>
          ))}
      </ul>

      <div className="flex gap-2 mt-5 mb-2 items-end justify-center">
        <Button variant="outline" onClick={handlePrevClick}>
          Prev
        </Button>
        <Button variant="outline" onClick={handleNextClick}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ResultList;
