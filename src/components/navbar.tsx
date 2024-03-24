import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { logout } from "@/firebase/api";
import { IoIosNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <div className="w-full bg-white py-5 px-5 shadow-xl flex items-center justify-between fixed top-7 left-0">
      <div className="text-blue-800 text-3xl font-bold">ABCDEF.COM</div>

      <ul className="lg:flex gap-3 hidden">
        <li>English</li>
        <li>We Are Hiring</li>
        <li>Invester Relation</li>
        <li>Advertise</li>
        <li>Free Listing</li>
      </ul>

      <div className="flex items-center justify-between gap-5">
        <div><IoIosNotificationsOutline className="text-3xl" /></div>
        {!currentUser ? (
          <Link
            to="/login"
            className="rounded-md px-3 py-2 bg-blue-600 text-white font-semibold"
          >
            Login/Sign up
          </Link>
        ) : (
          <Button onClick={logout}>Logout</Button>
        )}
      </div>
    </div>
  );
};
export default Navbar;
