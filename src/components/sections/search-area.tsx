import { useState } from "react";
import SearchBox from "../search-box";
import { IoLocationOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaMicrophone } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
const SearchArea = () => {
  const [location, setLocation] = useState("");
  const [searchItem, setSearchitem] = useState("");

  return (
    <div className="lg:flex flex-col items-center gap-5 justify-center lg:mb-10 mb-20 hidden">
      <h2 className="font-bold text-3xl">
        Search across &apos;3.3 Crore+&apos;{" "}
        <span className="text-blue-600">Product & Services</span>
      </h2>

      <div className="flex items-center gap-6">
        <SearchBox>
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
        <SearchBox>
          <div className="flex justify-between items-center gap-2 h-10">
            <input
              type="text"
              placeholder="Search Items"
              className="outline-none w-[400px] font-md"
              value={searchItem}
              onChange={(e) => setSearchitem(e.target.value)}
            />
            {searchItem && (
              <RxCross2
                onClick={() => setSearchitem("")}
                className="hover:bg-gray-100 duration-200 text-2xl rounded-md w-8 h-8 p-1"
              />
            )}
            <FaMicrophone className="text-gray-500 text-xl cursor-pointer" />
            <IoIosSearch className="bg-red-400 text-white text-2xl cursor-pointer rounded-md w-8 h-8 p-1" />
          </div>
        </SearchBox>
      </div>
    </div>
  );
};
export default SearchArea;
