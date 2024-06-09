
import { Outlet } from "react-router-dom";

const SetAddsPage = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[90%] md:w-[80%]">
        <Outlet />
      </div>
    </div>
  );
};
export default SetAddsPage;
