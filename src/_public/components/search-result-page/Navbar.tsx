import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { logout } from "@/firebase/api";
import { IonIcon } from "@ionic/react";
import { useData } from "@/hooks/useData";
import { barChartOutline } from "ionicons/icons";
import SearchBoxes from "@/components/SearchBoxes";
import { LifeBuoy, LogOut, Settings, User, Shield, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { setSearchResultStores, currentUserData } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleCreateStoreClick = () => {
    navigate("/create-store");
  };
  const handleClickAdminPanel = () => {
    navigate("/admin");
  };

  const hadleLogoClick = () => {
    setSearchResultStores(null);
    navigate("/");
  };

  // let menuItems;

  // if (currentUserData && currentUserData.roles.includes("admin")) {
  //   menuItems = [
  //     <button onClick={handleClickAdminPanel}>AdminPanel</button>,
  //     <button onClick={handleCreateStoreClick}>CreateStore</button>,
  //     <button onClick={logout}>Logout</button>,
  //   ];
  // } else {
  //   menuItems = [
  //     <button onClick={handleCreateStoreClick}>CreateStore</button>,
  //     <button onClick={logout}>Logout</button>,
  //   ];
  // }

  return (
    <div className="w-full bg-white h-20 flex items-center justify-between fixed top-0 left-0 border-b-2 border-[#00000010]">
      <div onClick={hadleLogoClick} className="nav-logo cursor-pointer">
        ABCDEF.COM
      </div>

      <SearchBoxes />

      <ul className="lg:flex gap-10 font-medium flex items-center justify-center">
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

      {!currentUser ? (
        <Link
          to="/login"
          className="rounded-md px-3 py-2 bg-blue-600 text-white font-semibold"
        >
          Login/Sign up
        </Link>
      ) : (
        <div className="mt-1">
          {/* <Menu
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
          /> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
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
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>

                {currentUserData && currentUserData.roles.includes("admin") && (
                  <DropdownMenuItem onClick={handleClickAdminPanel}>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
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
                <span>Create Store</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};
export default Navbar;
