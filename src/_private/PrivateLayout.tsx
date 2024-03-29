import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { Navigate, Outlet } from "react-router-dom";

const PrivateLayout = () => {
  const { currentUserData } = useData();
  const { currentUser } = useAuth();
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  if (!currentUserData) return <div>Loading...</div>;

  return currentUserData.roles.includes("user") || currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateLayout;
