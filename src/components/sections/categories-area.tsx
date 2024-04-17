import CategoryCard from "../CategoryCard";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useData } from "@/hooks/useData";
// import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { StoreListType } from "@/types";
import { fetchCatogaryData } from "@/firebase/api";
import { categories } from "@/constants";

const CategoriesArea = () => {
  const [isShowAll, setIsShowAll] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [visibleCategories, setVisibleCategories] = useState(categories);
  const [scrollPosition, setScrollPosition] = useState(0);

  const navigate = useNavigate();

  const {
    searchResultStores,
    lastDocument,
    setLastDocument,
    setLoadingStoreFetching,
    setSearchResultStores,
    setIsAllFetched,
  } = useData();

  useEffect(() => {
    console.log(searchResultStores);
  }, [searchResultStores]);

  useEffect(() => {
    setIsShowAll(false);

    if (screenWidth <= 500) {
      setVisibleCategories(categories.slice(0, 6));
    } else if (screenWidth <= 600) {
      setVisibleCategories(categories.slice(0, 8));
    } else if (screenWidth <= 768) {
      setVisibleCategories(categories.slice(0, 10));
    } else {
      setVisibleCategories(categories);
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

  useEffect(() => {
    if (isShowAll) {
      handleAllClick();
    } else {
      handleLessClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowAll]);

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
    navigate("search-results");
  };

  const handleAllClick = () => {
    const currentScrollPosition = window.scrollY;
    setScrollPosition(currentScrollPosition);
  };
  const handleLessClick = () => {
    window.scrollTo(0, scrollPosition);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <ul className=" w-full grid gap-x-20 grid-cols-3 xsm:grid-cols-4 sm:grid-cols-5  md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-9 px-14 sm:px-20 ">
        {isShowAll
          ? categories.map((categoryObj, index) => (
              <li
                key={index}
                className="cursor-pointer"
                onClick={() => handleCategaryIconClick(categoryObj.label)}
              >
                <CategoryCard
                  label={categoryObj.label}
                  icon={categoryObj.icon}
                />
              </li>
            ))
          : visibleCategories.map((categoryObj, index) => (
              <li
                key={index}
                className="cursor-pointer"
                onClick={() => handleCategaryIconClick(categoryObj.label)}
              >
                <CategoryCard
                  label={categoryObj.label}
                  icon={categoryObj.icon}
                />
              </li>
            ))}
      </ul>

      <div className="px-10 sm:px-20 mt-4 w-full md:hidden">
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
      </div>
    </div>
  );
};
export default CategoriesArea;
