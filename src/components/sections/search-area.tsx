import { useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-recognition";
import SearchBoxes from "../SearchBoxes";
import { TypeAnimation } from "react-type-animation";

// const searchClient = algoliasearch(
//   "6K67WTIHLT",
//   "0cb3cddf578f097566b65642564992dc"
// );

// const searchIndex = searchClient.initIndex("stores");

const SearchArea = () => {
  // const [location, setLocation] = useState("");
  const [searchItem, setSearchitem] = useState("");
  // const { setSearchResultStores } = useData();

  // const navigate = useNavigate();

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
  }, [listening, searchItem, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // const handlesearch = async (searchQuery: string) => {
  //   try {
  //     const result = await searchIndex.search(searchQuery);
  //     const storeList: StoreListType = result.hits.map((hit: any) => ({
  //       id: hit.objectID,
  //       title: hit.title,
  //       active: hit.active,
  //       address: hit.address,
  //       email: hit.email,
  //       tags: hit.tags,
  //       createdAt: new Date(hit.createdAt),
  //       phoneNumber: hit.phoneNumber,
  //       whatssappNumber: hit.whatsappNumber,
  //       storeIcon: hit.storeIcon,
  //       storeImages: hit.storeImages,
  //       userId: hit.userId,
  //     }));
  //     setSearchResultStores(storeList);
  //     if (storeList && storeList.length > 0) navigate("/search-results");
  //   } catch (error) {
  //     console.log("Error");
  //   }
  // };

  return (
    <div className="flex w-full flex-col items-center gap-4 justify-center lg:mb-5 mb-[30px] ">
      <h2 className="font-bold text-3xl hidden lg:flex">
        Search across &apos; thousands &apos;
        <span className="font-extrabold">+</span>
        <span className="text-blue-600 ml-1">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Businesses",
              3000, // wait 1s before replacing "Mice" with "Hamsters"
              " Product and Services",
              3000,
            ]}
            wrapper="span"
            speed={1}
            cursor={false}
            deletionSpeed={40}
            // style={{display: "inline-block" }}
            repeat={Infinity}
          />
        </span>
      </h2>

      {/* <div className="items-center gap-6 hidden lg:flex">
        <SearchBox styles="px-4">
          <div className="flex justify-between items-center gap-2 h-10">
            <IoLocationOutline className="text-xl text-gray-500" />
            <input
              type="text"
              placeholder="Location"
              className="outline-none font-md"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {location && (
              <RxCross2
                onClick={() => setLocation("")}
                className="hover:bg-gray-100 duration-200 text-2xl rounded-md w-8 h-8 p-1"
              />
            )}
          </div>
        </SearchBox>

        <SearchBox styles="px-4">
          <div className="flex justify-between items-center gap-2 h-10">
            <input
              type="text"
              placeholder="Search Items"
              className="outline-none w-[400px] font-md"
              value={searchItem}
              onChange={(e) => setSearchitem(e.target.value)}
            />
            {(searchItem || listening) && (
              <RxCross2
                onClick={() => {
                  setSearchitem("");
                  SpeechRecognition.stopListening();
                }}
                className="hover:bg-gray-100 duration-200 text-2xl rounded-md w-8 h-8 p-1"
              />
            )}

            <FaMicrophone
              className={cn(
                "text-gray-500 text-xl cursor-pointer",
                listening && "hidden"
              )}
              onClick={() => SpeechRecognition.startListening()}
            />

            <IoIosSearch className="bg-red-400 text-white text-2xl cursor-pointer rounded-md w-8 h-8 p-1" />
          </div>
        </SearchBox>
      </div> */}

      {/* --------------------Mobile Searchbox----------------------- */}
      {/* <div className="items-center flex lg:hidden bg-slate-40 w-full justify-center px-">
        <SearchBox styles="px-2 w-[90%] sm:w-[85%] md:w-[80%]">
          <div className="flex w-full justify-between items-center gap-2 h-10">
            <IoIosSearch
              onClick={() => handlesearch(searchItem)}
              className="bg-red-400 text-white text-2xl cursor-pointer rounded-md w-8 h-8 p-1"
            />
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
                }}
                className="hover:bg-gray-100 duration-200 text-2xl rounded-md w-8 h-8 p-1"
              />
            )}

            <FaMicrophone
              className={cn(
                "text-gray-500 text-2xl cursor-pointer",
                listening && "hidden"
              )}
              onClick={() => SpeechRecognition.startListening()}
            />
          </div>
        </SearchBox>
      </div> */}
      <div className="w-[97%] lg:w-[80%]">
        <SearchBoxes />
      </div>
    </div>
  );
};
export default SearchArea;
