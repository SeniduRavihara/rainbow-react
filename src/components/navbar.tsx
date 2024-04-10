import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { logout } from "@/firebase/api";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { IonIcon } from "@ionic/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LifeBuoy, LogOut, Settings, User, Shield, Store } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  languageOutline,
  chevronDownOutline,
  barChartOutline,
} from "ionicons/icons";
import { useData } from "@/hooks/useData";
import { getTimeDifference } from "@/lib/utils";

const Navbar = () => {
  const { currentUser } = useAuth();
  const { currentUserData, setSearchResultStores, messagesToAll } = useData();
  const navigate = useNavigate();

  const handleCreateStoreClick = () => {
    navigate("/manage-store");
  };
  const handleClickAdminPanel = () => {
    navigate("/admin");
  };

  const hadleLogoClick = () => {
    setSearchResultStores(null);
    navigate("/");
  };

  return (
    <div className="w-full bg-white pt-3 h-20 px-2 md:px-5 flex items-center justify-between fixed top-7 left-0 border-b-2 border-[#00000010]">
      <div className="flex items-center justify-center">
        {/* ----------------Mobile---------------------- */}
        <div className="flex lg:hidden gap-5">
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
            </SheetContent>
          </Sheet>
        </div>
        {/* --------------------------------------------- */}

        <div onClick={hadleLogoClick} className="nav-logo cursor-pointer">
          ABCDEF.COM
        </div>
      </div>

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

      <div className="flex items-center  justify-between gap-3 md:gap-5">
        <div className="flex mt-1 items-center justify-center">
          {currentUser && currentUserData?.haveStore && (
            <Sheet>
              <SheetTrigger>
                <IoIosNotificationsOutline
                  className="text-3xl cursor-pointer"
                  onClick={() => currentUser?.reload()}
                />
              </SheetTrigger>
              <SheetContent className="w-screen p-0 overflow-y-scroll">
                <ul className="flex flex-col mt-10 font-medium items-center justify-center">
                  {messagesToAll &&
                    messagesToAll.map((messageObj, index) => (
                      <li
                        className="w-full text-xl border-b py-4 px-4"
                        key={index}
                      >
                        {messageObj.message}
                        <div className="text-sm">
                          {getTimeDifference(messageObj.createdAt.toDate())} ago
                        </div>
                      </li>
                    ))}
                </ul>
              </SheetContent>
            </Sheet>
          )}
        </div>
        {!currentUser ? (
          <Link
            to="/login"
            className="rounded-md px-2 md:px-3 py-2 bg-blue-600 text-white font-semibold
           text-xs md:text-base"
          >
            Login/Sign up
          </Link>
        ) : (
          <div className="mt-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
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
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>

                  {currentUserData &&
                    currentUserData.roles.includes("admin") && (
                      <DropdownMenuItem onClick={handleClickAdminPanel}>
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Admin</span>
                      </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCreateStoreClick}>
                  <Store className="mr-2 h-4 w-4" />
                  <span>Manage Store</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
