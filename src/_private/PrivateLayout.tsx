import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { CircularProgress } from "@chakra-ui/react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateLayout = () => {
  const { currentUserData } = useData();
  const { currentUser } = useAuth();

  const location = useLocation();

  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  if (!currentUserData)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <CircularProgress size="60px" isIndeterminate color="green.300" />
      </div>
    );

  if (
    location.pathname.includes("/create-store") &&
    currentUserData.haveStore &&
    !currentUserData.roles.includes("admin")
  ) {
    return <Navigate to="/manage-store/userStore" />;
  }

  if (
    location.pathname.includes("/manage-stores") &&
    currentUserData.haveStore &&
    !currentUserData.roles.includes("admin")
  ) {
    return <Navigate to="/" />;
  }

  return currentUserData.roles.includes("user") || currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateLayout;
