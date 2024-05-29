// import CategoryCard from "@/components/CategoryCard";
// import { categories } from "@/constants";
import { fetchCatogaryData } from "@/firebase/api";
import { useData } from "@/hooks/useData";
import { useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import "./AllCategoryPage.css"

import algoliasearch from "algoliasearch/lite";
const searchClient = algoliasearch(
  "6K67WTIHLT",
  "0cb3cddf578f097566b65642564992dc"
);

// const searchIndex = searchClient.initIndex("categories");

const AllCategoryPage = () => {
  // const { categories } = useData();
  // const [visibleCategories, setVisibleCategories] = useState<Array<{
  //   icon: string;
  //   label: string;
  //   id: string;
  // }> | null>(categories);

  const navigate = useNavigate();
  const {
    lastDocument,
    setLastDocument,
    setLoadingStoreFetching,
    setSearchResultStores,
    setIsAllFetched,
  } = useData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   const collectionRef = collection(db, "categories");
  //   const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
  //     const categoryArr = QuerySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //     })) as Array<{
  //       icon: string;
  //       label: string;
  //       id: string;
  //     }>;

  //     // console.log(categoryArr);
  //     setVisibleCategories(categoryArr);
  //   });

  //   return unsubscribe;
  // }, []);

  const handleCategaryIconClick = async (label: string) => {
    await fetchCatogaryData(
      {
        lastDocument,
        setLastDocument,
        setLoadingStoreFetching,
        setSearchResultStores,
        setIsAllFetched,
      },
      label
    );
    navigate(`/search-results/category-${label}`);
  };

  const handleClickCancel = () => {
    navigate("/");
  };

  function Hit({ hit }: {hit: any}) {
    return (
      <div
        className="cursor-pointer flex items-center gap-3 flex-col justify-center text-center"
        onClick={() => handleCategaryIconClick(hit.label)}
      >
        <img src={hit.icon} alt="" className="w-10 h-10" />
        <div>{hit.label}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex items-center px-10 gap-3 mt-10">
        <RxCross1
          className="text-xl hover:border duration-200 p-2 w-10 h-10 rounded-md"
          onClick={handleClickCancel}
        />
        <h1 className="text-2xl font-bold ">Popular Categories</h1>
      </div>

      <InstantSearch searchClient={searchClient} indexName="categories">
        <div className="flex items-center justify-center">
          <SearchBox
            placeholder="Search for a category"
            className="w-[90%] sm:w-[50%]"
          />
        </div>

        <div className="flex items-center justify-center p-2">
          <Hits hitComponent={Hit} className="w-full" />
        </div>
      </InstantSearch>

      {/* <ul className="">
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 gap-10 px-1">
          {visibleCategories.map((categoryObj, index) => (
            <li
              key={index}
              className="cursor-pointer flex items-center gap-3"
              onClick={() => handleCategaryIconClick(categoryObj.label)}
            >
              <img src={categoryObj.icon} alt="" className="w-10 h-10" />
              <div>{categoryObj.label}</div>
            </li>
          ))}
        </div>
      </ul> */}
    </div>
  );
};
export default AllCategoryPage;
