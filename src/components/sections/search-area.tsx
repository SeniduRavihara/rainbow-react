import { useEffect, useState } from "react";
import SearchBox from "../search-box";
import { IoLocationOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaMicrophone } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { cn } from "@/lib/utils";

const SearchArea = () => {
  const [location, setLocation] = useState("");
  const [searchItem, setSearchitem] = useState("");

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

  return (
    <div className="flex w-full flex-col items-center gap-5 justify-center lg:mb-10 mb-5 ">
      <h2 className="font-bold text-3xl hidden lg:flex">
        Search across &apos;3.3 Crore<span className="font-extrabold">+</span>
        &apos; <span className="text-blue-600">Product & Services</span>
      </h2>

      <div className="items-center gap-6 hidden lg:flex">
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
      </div>

      {/* --------------------Mobile Searchbox----------------------- */}
      <div className="items-center flex lg:hidden bg-slate-40 w-full justify-center px-">
        <SearchBox styles="px-2 w-[90%] sm:w-[85%] md:w-[80%]">
          <div className="flex w-full justify-between items-center gap-2 h-10">
            <IoIosSearch className="bg-red-400 text-white text-2xl cursor-pointer rounded-md w-8 h-8 p-1" />
            <input
              type="text"
              placeholder="Restaurants near me"
              className="outline-none w-[70%] px-2 font-md"
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
                "text-gray-500 text-2xl cursor-pointer",
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
export default SearchArea;
