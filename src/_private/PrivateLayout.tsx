import { useData } from "@/hooks/useData";
import { Navigate, Outlet } from "react-router-dom";

const PrivateLayout = () => {
  const { currentUserData } = useData();
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  if (!currentUserData) return <div>Loading...</div>;

  return currentUserData.roles.includes("admin") ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateLayout;
