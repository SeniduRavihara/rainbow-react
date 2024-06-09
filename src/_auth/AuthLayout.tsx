import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const token = localStorage.getItem("token");

  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/img/auth-background.png')",
        backgroundSize: "cover",
      }}
    >
      <div className="">{!token ? <Outlet /> : <Navigate to="/" />}</div>
    </div>
  );
};
export default AuthLayout;
