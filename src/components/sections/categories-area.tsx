import CategoryCard from "../CategoryCard";
import { useEffect, useState } from "react";
import { useData } from "@/hooks/useData";
import { useNavigate } from "react-router-dom";
import { fetchCatogaryData } from "@/firebase/api";
import { categories } from "@/constants";
import { allCategories } from "@/assets";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";

const CategoriesArea = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [visibleCategories, setVisibleCategories] = useState(categories);

  const navigate = useNavigate();

  const {
    lastDocument,
    setLastDocument,
    setLoadingStoreFetching,
    setSearchResultStores,
    setIsAllFetched,
  } = useData();

  // useEffect(() => {
  //   console.log(searchResultStores);
  // }, [searchResultStores]);

  useEffect(() => {
    const collectionRef = collection(db, "categories");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const categoryArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
      })) as Array<{ icon: string; label: string }>;

      // console.log(categoryArr);
      setVisibleCategories(pre=> [...pre, ...categoryArr]);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // setIsShowAll(false);

    if (screenWidth <= 500) {
      setVisibleCategories(categories.slice(0, 5));
    } else if (screenWidth <= 600) {
      setVisibleCategories(categories.slice(0, 7));
    } else if (screenWidth <= 768) {
      setVisibleCategories(categories.slice(0, 9));
    } else {
      setVisibleCategories(categories.slice(0, 17));
    }
  }, [screenWidth]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener to update screenWidth when window is resized
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   if (isShowAll) {
  //     handleAllClick();
  //   } else {
  //     handleLessClick();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isShowAll]);

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

  const handleAllClick = () => {
    // const currentScrollPosition = window.scrollY;
    // setScrollPosition(currentScrollPosition);
    navigate("/all-catogaries");
  };
  // const handleLessClick = () => {
  //   window.scrollTo(0, scrollPosition);
  // };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <ul className="">
        <div className="w-full grid gap-x-20 grid-cols-3 xsm:grid-cols-4 sm:grid-cols-5  md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-9 px-14 sm:px-20 ">
          {visibleCategories.map((categoryObj, index) => (
            <li
              key={index}
              className="cursor-pointer"
              onClick={() => handleCategaryIconClick(categoryObj.label)}
            >
              <CategoryCard label={categoryObj.label} icon={categoryObj.icon} />
            </li>
          ))}

          <div onClick={handleAllClick} className="cursor-pointer">
            {/* <div className="p-1 w-[100px] h-[100px] text-center flex-col bg-blue-400 text-white flex items-center justify-center rounded-lg">
                <div className="w-[30px] xsm:w-[40px] flex items-center justify-center">
                  All Catogaries
                </div>
                
              </div> */}
            <CategoryCard label=" All Catogaries" icon={allCategories} />
          </div>
        </div>
      </ul>

      {/* <div className="px-10 sm:px-20 mt-4 w-full md:hidden">
        <Button
          onClick={() => {
            setIsShowAll(!isShowAll);
          }}
          className="bg-[#0066FF] flex items-center justify-center gap-4 hover:bg-[#0066ff9a] h-[50px]  w-full"
        >
          {!isShowAll ? (
            <>
              <div onClick={handleAllClick}>View All categorys</div>{" "}
              <FaArrowRight />
            </>
          ) : (
            <>
              <div onClick={handleLessClick}>View less categorys</div>{" "}
              <FaArrowLeft />
            </>
          )}
        </Button>
      </div> */}
    </div>
  );
};
export default CategoriesArea;
