import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateLayout = () => {
  const { currentUserData } = useData();
  const { currentUser } = useAuth();

  const location = useLocation()

  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  if (!currentUserData) return <div>Loading...</div>;

  if (location.pathname === "/create-store" && currentUserData.haveStore) return <Navigate to="/manage-store" />

    return currentUserData.roles.includes("user") || currentUser ? (
      <Outlet />
    ) : (
      <Navigate to="/" />
    );
};

export default PrivateLayout;
