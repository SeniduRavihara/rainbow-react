import { iphoneMockup } from "@/assets";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import PhoneInput from "react-phone-number-input";

const Section1 = () => {

    const [phone, setPhone] = useState<string | undefined>();

  return (
    <div className="flex flex-col md:flex-row gap-10 justify-between items-center p-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold">
          <span className="text-blue-500">Grow</span> Your Business
        </h1>

        <h3 className="text-lg font-medium">
          Advertise with{" "}
          <span className="text-2xl font-semibold text-red-500">
            Srilanka Business
          </span>
        </h3>

        <div>
          <PhoneInput
            value={phone}
            onChange={setPhone}
            placeholder="Whatsapp number"
            className="px-[1rem] py-1 mb-3 text-lg border rounded-md focus:outline-blue-400"
          />
          <Button className="-mt-4">
            Get Started
            <FaArrowRight className="ml-2" />
          </Button>
        </div>

        <ul className="font-medium">
          <li className="flex items-center gap-1">
            <TiTick className="text-green-500 text-2xl" />
            Rank Ahead of Your Competition
          </li>
          <li className="flex items-center gap-1">
            <TiTick className="text-green-500 text-2xl" />
            Find Ready to Buy Customers Instantly
          </li>
          <li className="flex items-center gap-1">
            <TiTick className="text-green-500 text-2xl" />
            Track Leads & Competition Trends
          </li>
        </ul>
      </div>

      <div>
        <img src={iphoneMockup} alt="" className="w-[300px] md:mr-10" />
      </div>
    </div>
  );
};
export default Section1;
