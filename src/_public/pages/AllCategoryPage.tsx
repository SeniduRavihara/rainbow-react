// import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/constants";
import { fetchCatogaryData } from "@/firebase/api";
import { db } from "@/firebase/config";
import { useData } from "@/hooks/useData";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const AllCategoryPage = () => {
  const [visibleCategories, setVisibleCategories] = useState(categories);

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

  useEffect(() => {
    const collectionRef = collection(db, "categories");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const categoryArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
      })) as Array<{ icon: string; label: string }>;

      // console.log(categoryArr);
      setVisibleCategories((pre) => [...pre, ...categoryArr]);
    });

    return unsubscribe;
  }, []);

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

  return (
    <div className="flex flex-col gap-10 w-full p-10">
      <div className="flex items-center px-10 gap-3">
        <RxCross1
          className="text-xl hover:border duration-200 p-2 w-10 h-10 rounded-md"
          onClick={handleClickCancel}
        />
        <h1 className="text-2xl font-bold ">Popular Categories</h1>
      </div>

      <ul className="">
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
      </ul>
    </div>
  );
};
export default AllCategoryPage;
