import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-[2048px] ">
        <Outlet />
       </div>
    </div>
  );
}
export default RootLayout