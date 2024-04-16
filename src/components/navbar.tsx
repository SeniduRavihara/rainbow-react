import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { handleUserMessageDelete, logout, updateAsSeen } from "@/firebase/api";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { IonIcon } from "@ionic/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {  LogOut, User, Shield, Store } from "lucide-react";
import NavDropdown from "react-bootstrap/Dropdown";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import {
  languageOutline,
  chevronDownOutline,
  barChartOutline,
} from "ionicons/icons";
import { useData } from "@/hooks/useData";
import { cn, getTimeDifference } from "@/lib/utils";
import { logo, placeholderReviewPic } from "@/assets";
import { RxCross1 } from "react-icons/rx";
import { forwardRef, useEffect, useState } from "react";
import { messageObjType } from "@/types";

const Navbar = () => {
  const { currentUser } = useAuth();
  const [notSeenMsg, setNowSeenMsg] = useState<messageObjType[] | null>(null);

  const { currentUserData, setSearchResultStores, userMessages } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (userMessages) {
      setNowSeenMsg(userMessages?.filter((msgObj) => !msgObj.seen));
    }
  }, [userMessages]);

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

  const handleSeenMessage = () => {
    if (!currentUserData) return;
    setTimeout(async () => {
      await updateAsSeen(currentUserData.id);
    }, 1000);
  };

  const CustomToggle = forwardRef(
    (
      {
        children,
        onClick,
      }: {
        children: React.ReactNode;
        onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
      },
      ref: React.ForwardedRef<HTMLAnchorElement>
    ) => (
      <a
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
      </a>
    )
  );
  return (
    <div className="w-full fixed bg-white pt-3 h-[70px] px-4 md:px-5 flex items-center justify-between  border-b-2 border-[#00000010]">
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

        <img
          src={logo}
          alt=""
          className="w-36 h-14 cursor-pointer"
          onClick={hadleLogoClick}
        />
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

      <div className="flex items-center justify-between gap-3 md:gap-5">
        <div className="flex mt-1 items-center justify-center">
          {currentUser && currentUserData?.haveStore && (
            <Sheet onOpenChange={handleSeenMessage}>
              <SheetTrigger>
                <div className="relative">
                  <IoIosNotificationsOutline
                    className="text-3xl cursor-pointer"
                    onClick={() => currentUser?.reload()}
                  />
                  <div className="absolute -top-2 left-4 flex items-center justify-center rounded-full w-5 h-5 bg-red-500 text-white">
                    {notSeenMsg?.length}
                  </div>
                </div>
              </SheetTrigger>
              <SheetContent className="w-screen p-0 overflow-y-scroll">
                <ul className="flex flex-col mt-10 font-medium items-center justify-center">
                  {userMessages &&
                    userMessages.map((messageObj, index) => (
                      <li
                        className={cn(
                          "w-full flex items-center justify-between border-b py-4 px-4",
                          !messageObj.seen && "bg-green-400/50"
                        )}
                        key={index}
                      >
                        <div className="flex items-center justify-center gap-2 py-2 w-[90%]">
                          <img
                            src={messageObj.imageUrl || placeholderReviewPic}
                            alt="profile"
                            className="w-14 h-14 rounded-md"
                          />
                          <div className="w-full">
                            <div className=" px-3 py-1 rounded-xl w-full">
                              <div className="text-[12px] font-semibold">
                                {messageObj.fromName}
                              </div>
                              <div>{messageObj.message}</div>
                            </div>
                            <div className="flex gap-3 text-[12px] ml-4 font-semibold text-gray-600/70">
                              <div className="">
                                {getTimeDifference(
                                  messageObj.createdAt.toDate()
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <RxCross1
                          className="cursor-pointer"
                          onClick={() =>
                            handleUserMessageDelete(
                              currentUser.uid,
                              messageObj.id
                            )
                          }
                        />
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
            {/* <DropdownMenu>
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
            </DropdownMenu> */}
            <NavDropdown>
              <NavDropdown.Toggle
                as={CustomToggle}
                variant=""
                id="NavDropdown-basic"
                className="flex ring-0 outline-none items-center justify-center"
              >
                <div>
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      className="w-10 h-10 rounded-full cursor-pointer"
                    />
                  ) : (
                    <HiOutlineUserCircle className="text-3xl cursor-pointer" />
                  )}
                </div>
              </NavDropdown.Toggle>

              <NavDropdown.Menu>
                <NavDropdown.Item className="flex items-center gap-2">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </NavDropdown.Item>
                {currentUserData && currentUserData.roles.includes("admin") && (
                  <NavDropdown.Item
                    onClick={handleClickAdminPanel}
                    className="flex items-center gap-2"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin</span>
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item
                  onClick={handleCreateStoreClick}
                  className="flex items-center gap-2"
                >
                  <Store className="mr-2 h-4 w-4" />
                  <span>Manage Store</span>
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={logout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </NavDropdown.Item>
              </NavDropdown.Menu>
            </NavDropdown>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
