import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";

const Section1 = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center">
      <div className="space-y-3 mt-10 md:mt-0">
        <h1 className="text-3xl">
          Grow With Us And Build Your <span className="font-bold">Career</span>
        </h1>
        <h3 className="text-sm font-medium">
          Largest Business Directory in srilanka
        </h3>
        <Button>
          Join Our Team
          <FaArrowRight className="mt-1 ml-2" />
        </Button>
      </div>

      <div className="mt-10 md:mt-0">
        <img src="/business-mans.jpg" className="w-[300px]" alt="" />
      </div>
    </div>
  );
}
export default Section1