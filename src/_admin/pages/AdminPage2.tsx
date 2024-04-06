
import Sidebar from "@/components/admin/Sidebar";
import { Outlet } from "react-router-dom";

const AdminPage2 = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-9/12">
        <h1 className="bg-[#2F4BE5] py-3 text-white text-center">
          ADMIN PANEL
        </h1>
        <div className="overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AdminPage2;
