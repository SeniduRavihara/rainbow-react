import { Link } from "react-router-dom";
import { HiSpeakerphone } from "react-icons/hi";
import { BiSolidBookContent, BiSolidUserAccount } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import { DiGoogleAnalytics } from "react-icons/di";
import { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

// const sidebarItems = [
//   { item: "Advertising", to: "set-adds", icon: <HiSpeakerphone /> },
//   { item: "Stores", to: "stores", icon: <BiSolidBookContent /> },
//   { item: "Comments", to: "comments-page", icon: <FaComments /> },
//   { item: "Analytics", to: "analytics-page", icon: <DiGoogleAnalytics /> },
//   { item: "Message", to: "message", icon: <BiSolidUserAccount /> },
// ];

function Sidebar() {
  const [isOpenAddsPage, setIsOpenAddsPage] = useState(false);

  return (
    <div className="w-3/12 h-screen p-5 flex flex-col items-center justify-between left-0  bg-[#3B3486] text-white">
      <ul className="flex flex-col gap-5">
        <h1 className="text-3xl font-extrabold mb-10">LOGO</h1>

        <li onClick={() => setIsOpenAddsPage(!isOpenAddsPage)}>
          {/* <Link to="set-adds" className="flex items-center gap-3"> */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="flex">
              <HiSpeakerphone />{" "}
            </div>
            Advertising
            {isOpenAddsPage ? <IoMdArrowDropright /> : <IoMdArrowDropdown />}
          </div>
          {/* </Link> */}
          <div>
            {isOpenAddsPage && (
              <div>
                {/* <Link></Link>
                <Link></Link>
                <Link></Link>
                <Link></Link> */}
              </div>
            )}
          </div>
        </li>

        <li>
          <Link to="stores" className="flex items-center gap-3">
            <div>
              <BiSolidBookContent />{" "}
            </div>
            Stores
          </Link>
        </li>

        <li>
          <Link to="set-adds" className="flex items-center gap-3">
            <div>
              <FaComments />{" "}
            </div>
            Comments
          </Link>
        </li>

        <li>
          <Link to="analytics" className="flex items-center gap-3">
            <div>
              <DiGoogleAnalytics />{" "}
            </div>
            Analytics
          </Link>
        </li>

        <li>
          <Link to="message" className="flex items-center gap-3">
            <div>
              <BiSolidUserAccount />{" "}
            </div>
            Message
          </Link>
        </li>

        {/* {sidebarItems.map((sideItem) => (
          <li key={sideItem.item}>
            <Link to={sideItem.to} className="flex items-center gap-3">
              <div>{sideItem.icon}</div>
              {sideItem.item}
            </Link>
          </li>
        ))} */}
      </ul>

      {/* <div>Logout</div> */}
    </div>
  );
}
export default Sidebar;
