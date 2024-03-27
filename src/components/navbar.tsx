import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { logout } from "@/firebase/api";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { IonIcon } from "@ionic/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  languageOutline,
  chevronDownOutline,
  barChartOutline,
} from "ionicons/icons";
import Menu from "./Menu";
import { useData } from "@/hooks/useData";

const Navbar = () => {
  const { currentUser } = useAuth();
  const { currentUserData } = useData();
  const navigate = useNavigate();

  const handleCreateStoreClick = () => {
    navigate("/create-store");
  };
  const handleClickAdminPanel = () => {
    navigate("/admin");
  };

  let menuItems;

  if (currentUserData && currentUserData.roles.includes("admin")) {
    menuItems = [
      <button onClick={handleClickAdminPanel}>AdminPanel</button>,
      <button onClick={handleCreateStoreClick}>CreateStore</button>,
      <button onClick={logout}>Logout</button>,
    ];
  } else {
    menuItems = [
      <button onClick={handleCreateStoreClick}>CreateStore</button>,
      <button onClick={logout}>Logout</button>,
    ];
  }

  return (
    <div className="w-full bg-white pt-3 h-20 px-5 flex items-center justify-between fixed top-7 left-0 border-b-2 border-[#00000010]">
      <div className="nav-logo cursor-pointer">ABCDEF.COM</div>

      <ul className="lg:flex gap-10 font-medium hidden items-center justify-center">
        <li className="flex items-center justify-center gap-1 cursor-pointer icon-with-links">
          <IonIcon icon={languageOutline}></IonIcon>
          <div className="txt">English</div>
          <IonIcon icon={chevronDownOutline}></IonIcon>
        </li>
        <li className="cursor-pointer">We Are Hiring</li>
        <li className="cursor-pointer">Invester Relation</li>
        <li className="flex items-center justify-center gap-1 cursor-pointer">
          <div className="icon">
            <img src="/assets/img/loaudspeacker.png" alt="" />
          </div>
          <div>Advertise</div>
        </li>
        <li className="cursor-pointer">
          <div className="flex flex-col -mt-4">
            <div
              className="bg-[#dd3636] flex items-center justify-center text-white rounded-md px-[9px] font-semibold
               text-sm"
            >
              BUSSINES
            </div>
            <div className="flex items-center justify-center gap-1">
              <div className="icon">
                <IonIcon icon={barChartOutline}></IonIcon>
              </div>
              <div className="txt">Free Listing</div>
            </div>
          </div>
        </li>
      </ul>

      <div className="lg:flex items-center hidden justify-between gap-5">
        <div>
          <IoIosNotificationsOutline className="text-3xl cursor-pointer" />
        </div>
        {!currentUser ? (
          <Link
            to="/login"
            className="rounded-md px-3 py-2 bg-blue-600 text-white font-semibold"
          >
            Login/Sign up
          </Link>
        ) : (
          <div className="mt-1">
            <Menu
              items={menuItems}
              menuBtn={
                <div>
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <HiOutlineUserCircle className="text-3xl" />
                  )}
                </div>
              }
              styles="right-5 top-24"
            />
          </div>
        )}
      </div>

      <div className="flex lg:hidden gap-5">
        <IoIosSearch className="text-3xl cursor-pointer" />

        <Sheet>
          <SheetTrigger>
            <IoIosMenu className="text-3xl cursor-pointer" />
          </SheetTrigger>
          <SheetContent className="w-screen">
            <ul className="flex flex-col gap-10 font-medium items-center justify-center">
              <li className="flex items-center justify-center gap-1 cursor-pointer icon-with-links">
                <IonIcon icon={languageOutline}></IonIcon>
                <div className="txt">English</div>
                <IonIcon icon={chevronDownOutline}></IonIcon>
              </li>
              <li className="cursor-pointer">We Are Hiring</li>
              <li className="cursor-pointer">Invester Relation</li>
              <li className="flex items-center justify-center gap-1 cursor-pointer">
                <div className="icon">
                  <img src="/assets/img/loaudspeacker.png" alt="" />
                </div>
                <div>Advertise</div>
              </li>
              <li className="cursor-pointer">
                <div className="flex flex-col -mt-4">
                  <div
                    className="bg-[#dd3636] flex items-center justify-center text-white rounded-md px-[9px] font-semibold
               text-sm"
                  >
                    BUSSINES
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="icon">
                      <IonIcon icon={barChartOutline}></IonIcon>
                    </div>
                    <div className="txt">Free Listing</div>
                  </div>
                </div>
              </li>
            </ul>

            <div className="flex flex-col items-center justify-between gap-5">
              {!currentUser ? (
                <Link
                  to="/login"
                  className="rounded-md px-3 py-2 bg-blue-600 text-white font-semibold"
                >
                  Login/Sign up
                </Link>
              ) : (
                <div className="mt-1">
                  <Menu
                    items={menuItems}
                    menuBtn={
                      <div>
                        {currentUser.photoURL ? (
                          <img
                            src={currentUser.photoURL}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <HiOutlineUserCircle className="text-3xl" />
                        )}
                      </div>
                    }
                    styles="right-5 top-24"
                  />
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
export default Navbar;
