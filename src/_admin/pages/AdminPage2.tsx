import Sidebar from "@/_admin/components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminPage2 = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full h-full ">
        {/* <h1 className="bg-green-600 py-3 text-white text-center">
          ADMIN PANEL
        </h1> */}

        <div className="flex w-full bg-green-50">
          <div className="w-full h-screen  overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPage2;
