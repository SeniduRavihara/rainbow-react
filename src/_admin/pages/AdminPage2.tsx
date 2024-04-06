import Sidebar from "@/_admin/components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminPage2 = () => {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="flex flex-col w-full h-full ">
        <h1 className="bg-[#2F4BE5] py-3 text-white text-center">
          ADMIN PANEL
        </h1>
        <div className="overflow-y-scroll flex  w-full h-full px-20  py-5">
          <div className="w-full h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPage2;
