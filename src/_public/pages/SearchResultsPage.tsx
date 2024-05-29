import Navbar from "../components/Navbar";
import ResultList from "../components/search-result-page/ResultList";
import SearchResultAddSection from "../components/search-result-page/SearchResultAddSection";
import SocialMediaArea from "@/components/sections/social-media-area";
import DiscriptionArea from "@/components/sections/discription-area";
import Footer from "@/components/footer";
import BottomBanner from "@/components/bottom-banner";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useData } from "@/hooks/useData";
import SearchResultCarosel from "../components/SearchResultCarosel";
import { fetchCatogaryData } from "@/firebase/api";

const SearchResultsPage = () => {
  const { searchResultStores } = useData();
  const {
    lastDocument,
    setLastDocument,
    setLoadingStoreFetching,
    setSearchResultStores,
    setIsAllFetched,
  } = useData();
  const navigate = useNavigate();

  const params = useParams();
  const category = params?.category ?? "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

   useEffect(() => {
     const fetchData = async () => {
       if (category) {
         try {
           setLoadingStoreFetching(true);
           await fetchCatogaryData(
             {
               lastDocument,
               setLastDocument,
               setLoadingStoreFetching,
               setSearchResultStores,
               setIsAllFetched,
             },
             category?.split("-")[1] || ""
           );
           
         } catch (error) {
           console.error("Error fetching category data:", error);
         }
       }
     };

     fetchData();
   }, [category, lastDocument, navigate, setIsAllFetched, setLastDocument, setLoadingStoreFetching, setSearchResultStores]);

  // useEffect(() => {
  //   if (category) {
  //     if (category !== searchItem) {
  //       const fetchAddsByCategory = async () => {
  //         try {
  //           const categoryString = category?.split("-")[1] || "";

  //           const collectionRef = collection(db, "store");
  //           const q = query(
  //             collectionRef,
  //             where("category", "==", categoryString)
  //           );

  //           const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //             const searchResultStoresArr = querySnapshot.docs.map((doc) => ({
  //               ...doc.data(),
  //               id: doc.id,
  //             })) as StoreListType;

  //             console.log(searchResultStoresArr);

  //             setSearchResultStores(searchResultStoresArr);
  //           });

  //           return unsubscribe;
  //         } catch (error) {
  //           console.error("Error fetching adds by category:", error);
  //         }
  //       };

  //       fetchAddsByCategory();
  //     }
  //   }
  // }, [category, searchItem, setSearchResultStores]);

  // useEffect(() => {
  //   if (category) {
  //     if (category === searchItem) {
  //       if (searchResultStores) {
  //         localStorage.setItem("storeData", JSON.stringify(searchResultStores));
  //       }
  //     }
  //   }
  // }, [category, searchItem, searchResultStores, setSearchResultStores]);

  // useEffect(() => {
  //   if (category) {
  //     if (category === searchItem) {
  //       setSearchResultStores(
  //         JSON.parse(localStorage.getItem("storeData") || "[]")
  //       );
  //     }
  //   }
  // }, [category, searchItem, setSearchResultStores]);

  return (
    <div className="w-full min-h-screen">
      <div className="fixed top-0 left-0 z-50">
        <Navbar />
      </div>
      <div className="mt-48 725:mt-20 w-full">
        {/* <CarouselAdds /> */}
        <SearchResultCarosel />

        <div className="px-3 relative top-4 text-xl sm:text-2xl md:text-3xl font-bold font-">
          {category?.split("-")[0] === "category" && (
            <div>
              {!searchResultStores && "No any "}Search result for '
              {category?.split("-")[1]}'
            </div>
          )}
        </div>

        <div className="flex items-center justify-center">
          <div className="flex justify-between mt-10 gap-5 px-2 md:px-10 xl:w-[80%]">
            <ResultList category={category?.split("-")[1]} />
            <SearchResultAddSection />
          </div>
        </div>
        <SocialMediaArea />
        <DiscriptionArea />
        <Footer />
        <BottomBanner />
      </div>
    </div>
  );
};

export default SearchResultsPage;
