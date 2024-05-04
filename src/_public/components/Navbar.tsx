import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { logout } from "@/firebase/api";
import { IonIcon } from "@ionic/react";
import { useData } from "@/hooks/useData";
import { barChartOutline } from "ionicons/icons";
import { LogOut, Shield, Store } from "lucide-react";
import NavDropdown from "react-bootstrap/Dropdown";
import SearchBoxes2 from "@/components/SearchBoxes2";
import { logo } from "@/assets";
import { forwardRef } from "react";

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
    <div className="w-full px-3 bg-white h-20 flex items-center justify-between fixed top-0 left-0 border-b-2 border-[#00000010]">
      <img
        src={logo}
        alt=""
        className="w-40 h-14 cursor-pointer"
        onClick={hadleLogoClick}
      />

      <div className="w-[50%]">
        <SearchBoxes2 />
      </div>

      <div className="flex gap-3">
        <ul className="hidden 550:flex gap-10 font-medium items-center justify-center">
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
                <div className="text-nowrap">Free Listing</div>
              </div>
            </div>
          </li>
        </ul>

        {!currentUser ? (
          <Link
            to="/login"
            className="rounded-md px-2 md:px-3 py-2 bg-blue-600 text-white font-semibold
           text-base md:text-base"
          >
            Login
          </Link>
        ) : (
          <div className="mt-1">
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
                {/* <NavDropdown.Item className="flex items-center gap-2">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </NavDropdown.Item> */}

                {currentUserData &&
                  currentUserData.roles.includes("superAdmin") && (
                    <NavDropdown.Item
                      onClick={handleClickAdminPanel}
                      className="flex items-center gap-2"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Admin</span>
                    </NavDropdown.Item>
                  )}

                {currentUserData && currentUserData.roles.includes("admin") && (
                  <NavDropdown.Item
                    onClick={() => navigate("/manage-stores")}
                    className="flex items-center gap-2"
                  >
                    <Store className="mr-2 h-4 w-4" />
                    <span>Manage Stores</span>
                  </NavDropdown.Item>
                )}

                {currentUserData &&
                  !currentUserData.roles.includes("admin") && (
                    <NavDropdown.Item
                      onClick={handleCreateStoreClick}
                      className="flex items-center gap-2"
                    >
                      <Store className="mr-2 h-4 w-4" />
                      <span>Manage Store</span>
                    </NavDropdown.Item>
                  )}

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
