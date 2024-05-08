import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";

const Section1 = () => {
  const handleClickJoinOutTeam = () => {
    window.open(
      `https://wa.me/715335640?text=I%27m%20interested%20in%20joining%20your%20team%20at%20Srilanka%20Business.%20Could%20you%20please%20provide%20me%20with%20more%20details%20about%20the%20available%20positions%20and%20the%20application%20process%3F`
    );
  };

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center md:px-10">
      <div className="space-y-3 mt-10 md:mt-0">
        <h1 className="text-3xl">
          Grow With Us And Build Your <span className="font-bold">Career</span>
        </h1>
        <h3 className="text-sm font-medium">
          Largest Business Directory in srilanka
        </h3>
        <Button onClick={handleClickJoinOutTeam}>
          Join Our Team
          <FaArrowRight className="mt-1 ml-2" />
        </Button>
      </div>

      <div className="mt-10 md:mt-10 md:mr-">
        <img
          src="/hiring-page-imgs/business-mans.png"
          className="w-[400px]"
          alt=""
        />
      </div>
    </div>
  );
};
export default Section1;
