import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
// import PhoneInput from "react-phone-number-input";


const Section3 = () => {
   const [phone, setPhone] = useState("");

   const handleClickGetStarted = () => {
     if (phone) {
       window.open(
         `https://wa.me/715335640?text=I'm%20interested%20in%20advertising%20my%20business%20with%20Srilanka%20Business.%20Could%20you%20please%20provide%20me%20with%20more%20information%20on%20the%20advertising%20options%20available%3F%0AMy%20phone%20number%20is%3A%20${phone}`
       );
     }
   };

  return (
    <div className="flex flex-col gap-5 mt-10">
      <div>
        <h1 className="text-4xl font-bold text-center">
          <span className="text-blue-500">Grow</span> Your Business
        </h1>

        <h3 className="font-medium text-xl text-center">
          Advertise with <span className="text-red-500">Srilanka Business</span>
        </h3>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between mx-2 md:mx-20 md:px-20 space-y-7 bg-blue-50 rounded-xl py-5">
        <div>
          <h3 className="text-xl font-bold mb-5">
            <span className="text-blue-500">Grow</span> Your Business
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-items-center gap-3">
            <div className="border-2 flex rounded-lg pl-2 items-center justify-between border-blue-500">
              <img
                src="/icons/sri-lanka-flag.png"
                alt=""
                className="w-10 h-6"
              />
              {/* <p className="text-xl font-bold text-gray-600">+94</p> */}
              <input
                type="tel"
                className="focus:outline-none px-2 font-medium bg-blue-50 w-[150px] sm:w-auto"
                placeholder="Enter Mobile No"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button
                className="px-2 md:px-4 bg-blue-500 hover:bg-blue-500/90 rounded-none"
                onClick={handleClickGetStarted}
              >
                Get Started
                <FaArrowRight className="hidden md:block md:ml-2" />
              </Button>
            </div>
            {/* <PhoneInput
              value={phone}
              onChange={setPhone}
              placeholder="Whatsapp number"
              className="px-[1rem] py-1 mb-3 text-lg lg:w-[400px] border rounded-md focus:outline-blue-400"
            />
            <Button className="-mt-4">
              Get Started
              <FaArrowRight className="ml-2" />
            </Button> */}
          </div>
        </div>

        <div>
          <img
            src="/undraw_team_collaboration_re_ow29.svg"
            className="w-[250px] md:w-[300px]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default Section3;
