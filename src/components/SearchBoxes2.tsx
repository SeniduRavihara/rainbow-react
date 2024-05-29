import { useEffect, useState } from "react";
import SearchBox from "@/components/search-box";
import { RxCross2 } from "react-icons/rx";
// import { FaMicrophone } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { cn } from "@/lib/utils";
import algoliasearch from "algoliasearch/lite";
import { useData } from "@/hooks/useData";
import { StoreListType } from "@/types";
import { useNavigate } from "react-router-dom";
import AutocompleteLocationInput from "@/_public/components/auto-compleate-location-input/AutoCompleateInput";
import { CircularProgress } from "@chakra-ui/react";
import { mic } from "@/assets";

const searchClient = algoliasearch(
  "6K67WTIHLT",
  "0cb3cddf578f097566b65642564992dc"
);

const searchIndex = searchClient.initIndex("stores");

const SearchBoxes2 = () => {
  const { locationArr } = useData();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 100);
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let previousScrollPosition = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;

      if (currentScrollPosition < previousScrollPosition) {
        setScrollDirection("up");
      } else if (currentScrollPosition > previousScrollPosition) {
        setScrollDirection("down");
      }

      previousScrollPosition = currentScrollPosition;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const {
    setSearchResultStores,
    location,
    setLocation,
    searchItem,
    setSearchitem,
    setLastDocument,
  } = useData();

  const navigate = useNavigate();

  const {
    transcript,
    listening,
    // resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (listening) {
      setSearchitem(transcript);
    }
  }, [listening, searchItem, setSearchitem, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handlesearch = async (searchQuery: string) => {
    try {
      setLoadingSearch(true);
      const result = await searchIndex.search(searchQuery);

      const storeList: StoreListType = result.hits.map((hit: any) => ({
        id: hit.objectID,
        title: hit.title,
        active: hit.active,
        address: hit.address,
        email: hit.email,
        tags: hit.tags,
        createdAt: hit.createdAt,
        phoneNumber: hit.phoneNumber,
        whatsappNumber: hit.whatsappNumber,
        storeIcon: hit.storeIcon,
        storeImages: hit.storeImages,
        userId: hit.userId,
        info1: hit.info1,
        info2: hit.info2,
        published: hit.published,
        schedulArr: hit.schedulArr,
        fasebook: hit.fasebook,
        instagram: hit.instagram,
        linkedin: hit.linkedin,
        twitter: hit.twitter,
        youtube: hit.youtube,
        tiktok: hit.tiktok,
        website: hit.website,
        rating: hit.rating,
        reviewCount: hit.reviewCount,
        category: hit.category || "",
        visitCount: hit.visitCount,
        verified: hit.verified || false,
        // gallery: hit.gallery,
        location: hit.location,
        companyProfilePdfUrl: hit.companyProfilePdfUrl,
        // youtubeVideos: hit.youtubeVideos,
        showProfile: hit.showProfile,
        haveUpdate: hit.haveUpdate,
      }));
      setLastDocument(null);
      setSearchResultStores(
        storeList
          .filter((storeObj) => storeObj.active && storeObj.published)
          .filter((storeObj) =>
            location
              ? storeObj.address.toLowerCase().includes(location.toLowerCase())
              : storeObj
          )
      );
      if (storeList && storeList.length > 0) {
        console.log(storeList
          .filter((storeObj) => storeObj.active && storeObj.published)
          .filter((storeObj) =>
            location
              ? storeObj.address.toLowerCase().includes(location.toLowerCase())
              : storeObj
          ));
        
        
        navigate(`/search-results/${searchQuery || "all"}`);
      }

      setLoadingSearch(false);
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-5 justify-center">
      <div className="items-center gap-2 hidden 1150:flex w-full">
        <AutocompleteLocationInput
          locations={
            locationArr?.map((locationObj) => locationObj.location) || []
          }
          inputValue={location}
          setInputValue={setLocation}
        />

        <SearchBox styles="px-4">
          <div className="flex justify-between items-center gap-2 h-10">
            <input
              type="text"
              placeholder="Search Items"
              className="outline-none max-w-[400px] font-md"
              value={searchItem}
              onChange={(e) => setSearchitem(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlesearch(searchItem);
              }}
            />
            <div className="w-10">
              {(searchItem || listening) && (
                <RxCross2
                  onClick={() => {
                    setSearchitem("");
                    SpeechRecognition.stopListening();
                    // setLastDocument(null);
                    // setSearchResultStores(null);
                    // fetchData({
                    //   lastDocument,
                    //   setLastDocument,
                    //   setLoadingStoreFetching,
                    //   setSearchResultStores,
                    //   setIsAllFetched,
                    // });
                  }}
                  className="hover:bg-gray-100 duration-200 text-2xl rounded-md w-8 h-8 p-1"
                />
              )}
            </div>

            <div className="flex items-center justify-center gap-4">
              <img
                src={mic}
                className={cn(
                  "text-gray-500 text-xl cursor-pointer w-6 h-7",
                  listening && "hidden"
                )}
                onClick={() => SpeechRecognition.startListening()}
              />

              <div>
                {loadingSearch ? (
                  <CircularProgress
                    size="30px"
                    isIndeterminate
                    color="green.300"
                  />
                ) : (
                  <IoIosSearch
                    onClick={() => handlesearch(searchItem)}
                    className="bg-orange-500 text-white text-2xl cursor-pointer rounded-md w-8 h-8 p-1"
                  />
                )}
              </div>
            </div>
          </div>
        </SearchBox>
      </div>

      {/* --------------------Mobile Searchbox----------------------- */}
      <div className="items-center hidden 725:flex 1150:hidden bg-slate-40 w-full justify-center px-">
        <SearchBox styles="px-2 w-full sm:w-[90%] md:w-[80%]">
          <div className="flex w-full justify-between items-center gap-2 h-10">
            {loadingSearch ? (
              <CircularProgress size="30px" isIndeterminate color="green.300" />
            ) : (
              <IoIosSearch
                onClick={() => handlesearch(searchItem)}
                className="bg-orange-500 text-white text-2xl cursor-pointer rounded-md w-8 h-8 p-1"
              />
            )}
            <input
              type="text"
              placeholder="Restaurants near me"
              className="outline-none w-[70%] px-2 font-md"
              value={searchItem}
              onChange={(e) => setSearchitem(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlesearch(searchItem);
              }}
            />
            {(searchItem || listening) && (
              <RxCross2
                onClick={() => {
                  setSearchitem("");
                  SpeechRecognition.stopListening();
                  // setLastDocument(null);
                  // setSearchResultStores(null);
                  // fetchData({
                  //   lastDocument,
                  //   setLastDocument,
                  //   setLoadingStoreFetching,
                  //   setSearchResultStores,
                  //   setIsAllFetched,
                  // });
                }}
                className="hover:bg-gray-100 duration-200 text-2xl rounded-md w-8 h-8 p-1"
              />
            )}

            <img
              src={mic}
              className={cn(
                "text-gray-500 text-2xl cursor-pointer w-6 h-7",
                listening && "hidden"
              )}
              onClick={() => SpeechRecognition.startListening()}
            />
          </div>
        </SearchBox>
      </div>

      {/* ----------------------------------------------------------- */}

      <div
        className={cn(
          "items-center bg- backdrop-blur-lg 725:hidden fixed top-20 flex left-0 w-full justify-center",
          scrollDirection === "down" && "hidden",
          scrollPosition <= 30 && "backdrop-blur-none"
        )}
      >
        <SearchBox styles="px-2 w-[90%] md:w-[80%] bg-white mt-2 mb-2">
          <div className="flex w-full justify-between items-center gap-2 h-10">
            {loadingSearch ? (
              <CircularProgress size="30px" isIndeterminate color="green.300" />
            ) : (
              <IoIosSearch
                onClick={() => handlesearch(searchItem)}
                className="bg-orange-500 text-white text-2xl cursor-pointer rounded-md w-8 h-8 p-1"
              />
            )}
            <input
              type="text"
              placeholder="Restaurants near me"
              className="outline-none w-[70%] px-2 font-md"
              value={searchItem}
              onChange={(e) => setSearchitem(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlesearch(searchItem);
              }}
            />
            {(searchItem || listening) && (
              <RxCross2
                onClick={() => {
                  setSearchitem("");
                  SpeechRecognition.stopListening();
                  // setLastDocument(null);
                  // setSearchResultStores(null);
                  // fetchData({
                  //   lastDocument,
                  //   setLastDocument,
                  //   setLoadingStoreFetching,
                  //   setSearchResultStores,
                  //   setIsAllFetched,
                  // });
                }}
                className="hover:bg-gray-100 duration-200 text-2xl rounded-md w-8 h-8 p-1"
              />
            )}

            <img
              src={mic}
              className={cn(
                "text-gray-500 text-2xl cursor-pointer w-6 h-7",
                listening && "hidden"
              )}
              onClick={() => SpeechRecognition.startListening()}
            />
          </div>
        </SearchBox>
      </div>
    </div>
  );
};
export default SearchBoxes2;
