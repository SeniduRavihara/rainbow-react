import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiSpeakerphone } from "react-icons/hi";
import {
  BiSolidBookContent,
  BiSolidCategory,
  BiSolidUserAccount,
} from "react-icons/bi";
// import { FaComments } from "react-icons/fa";
import { DiGoogleAnalytics } from "react-icons/di";
import { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { logo } from "@/assets";
import { cn } from "@/lib/utils";

// const sidebarItems = [
//   { item: "Advertising", to: "set-adds", icon: <HiSpeakerphone /> },
//   { item: "Stores", to: "stores", icon: <BiSolidBookContent /> },
//   { item: "Comments", to: "comments-page", icon: <FaComments /> },
//   { item: "Analytics", to: "analytics-page", icon: <DiGoogleAnalytics /> },
//   { item: "Message", to: "message", icon: <BiSolidUserAccount /> },
// ];

function Sidebar() {
  const [isOpenAddsPage, setIsOpenAddsPage] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <div className="w-[200px] h-screen p-5 flex flex-col items-center justify-between left-0  bg-green-600 text-white">
      <ul className="flex flex-col gap-5">
        <img
          src={logo}
          alt=""
          className="w-44 h-15 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <li onClick={() => setIsOpenAddsPage(!isOpenAddsPage)}>
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="flex">
              <HiSpeakerphone />{" "}
            </div>
            Advertising
            {isOpenAddsPage ? <IoMdArrowDropright /> : <IoMdArrowDropdown />}
          </div>
          <div>
            {isOpenAddsPage && (
              <div className="flex flex-col gap-2 ml-5">
                <Link
                  to="popular-brands"
                  className={`${
                    location.pathname === "/admin/popular-brands"
                      ? "text-blue-700 font-semibold"
                      : ""
                  }`}
                >
                  Popular Brands
                </Link>
                <Link
                  to="search-result-adds"
                  className={`${
                    location.pathname === "/admin/search-result-adds"
                      ? "text-blue-700 font-semibold"
                      : ""
                  }`}
                >
                  Search Result Adds
                </Link>
                <Link
                  to="slider-adds"
                  className={`${
                    location.pathname === "/admin/slider-adds"
                      ? "text-blue-700 font-semibold"
                      : ""
                  }`}
                >
                  Slider Adds
                </Link>
                <Link
                  to="section-adds"
                  className={`${
                    location.pathname === "/admin/section-adds"
                      ? "text-blue-700 font-semibold"
                      : ""
                  }`}
                >
                  Section Adds
                </Link>
                <Link
                  to="details-page-adds"
                  className={`${
                    location.pathname === "/admin/details-page-adds"
                      ? "text-blue-700 font-semibold"
                      : ""
                  }`}
                >
                  DetailsPage Adds
                </Link>
                <Link
                  to="searchresult-slider-adds"
                  className={`${
                    location.pathname === "/admin/searchresult-slider-adds"
                      ? "text-blue-700 font-semibold"
                      : ""
                  }`}
                >
                  SearchResultSlider Adds
                </Link>
                <Link
                  to="detailspage-slider-adds"
                  className={`${
                    location.pathname === "/admin/detailspage-slider-adds"
                      ? "text-blue-700 font-semibold"
                      : ""
                  }`}
                >
                  DetailsPageSlider Adds
                </Link>
              </div>
            )}
          </div>
        </li>

        <li>
          <Link
            to="business"
            className={cn(
              "flex items-center gap-3",
              location.pathname === "/admin/business"
                ? "text-pink-800 font-semibold"
                : ""
            )}
          >
            <div>
              <BiSolidBookContent />{" "}
            </div>
            Business
          </Link>
        </li>

        {/* <li>
          <Link to="comments" className="flex items-center gap-3">
            <div>
              <FaComments />{" "}
            </div>
            Comments
          </Link>
        </li> */}

        <li>
          <Link
            to=""
            className={cn(
              "flex items-center gap-3",
              location.pathname === "/admin"
                ? "text-pink-800 font-semibold"
                : ""
            )}
          >
            <div>
              <DiGoogleAnalytics />{" "}
            </div>
            Analytics
          </Link>
        </li>

        <li>
          <Link
            to="message"
            className={cn(
              "flex items-center gap-3",
              location.pathname === "/admin/message"
                ? "text-pink-800 font-semibold"
                : ""
            )}
          >
            <div>
              <BiSolidUserAccount />{" "}
            </div>
            Message
          </Link>
        </li>

        <li>
          <Link
            to="manage"
            className={cn(
              "flex items-center gap-3",
              location.pathname === "/admin/manage"
                ? "text-pink-800 font-semibold"
                : ""
            )}
          >
            <div>
              <MdManageAccounts />{" "}
            </div>
            Manage
          </Link>
        </li>

        <li>
          <Link
            to="create-category"
            className={cn(
              "flex items-center gap-3",
              location.pathname === "/admin/create-category"
                ? "text-pink-800 font-semibold"
                : ""
            )}
          >
            <div>
              <BiSolidCategory />{" "}
            </div>
            categories
          </Link>
        </li>

        {/* {sidebarItems.map((sideItem) => (
          <li key={sideItem.item}>
            <Link to={sideItem.to} className={cn(
              "flex items-center gap-3",
              location.pathname === "/admin/business"
                ? "text-pink-800 font-semibold"
                : ""
            )}>
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
