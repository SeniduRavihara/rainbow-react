import { Link } from "react-router-dom";

import { IoNewspaperSharp } from "react-icons/io5";
import { HiSpeakerphone } from "react-icons/hi";
import { BiSolidBookContent, BiSolidUserAccount } from "react-icons/bi";
import { FaComments } from "react-icons/fa";
import { DiGoogleAnalytics } from "react-icons/di";

const sidebarItems = [
  { item: "New Post", to: "/", icon: <IoNewspaperSharp /> },
  { item: "Advertising", to: "/advertising-page", icon: <HiSpeakerphone /> },
  { item: "Content", to: "/content-page", icon: <BiSolidBookContent /> },
  { item: "Comments", to: "/comments-page", icon: <FaComments /> },
  { item: "Analytics", to: "/analytics-page", icon: <DiGoogleAnalytics /> },
  { item: "Accounts", to: "/accounts-page", icon: <BiSolidUserAccount /> },
];

function Sidebar() {
  return (
    <div className="w-3/12 h-screen p-5 flex flex-col items-center justify-between left-0  bg-[#3B3486] text-white">
      <ul className="flex flex-col gap-5">
        <h1 className="text-3xl font-extrabold mb-10">LOGO</h1>

        {sidebarItems.map((sideItem) => (
          <li key={sideItem.item}>
            <Link to={sideItem.to} className="flex items-center gap-3">
              <div>{sideItem.icon}</div>
              {sideItem.item}
            </Link>
          </li>
        ))}
      </ul>

      <div>Logout</div>
    </div>
  );
}
export default Sidebar;
