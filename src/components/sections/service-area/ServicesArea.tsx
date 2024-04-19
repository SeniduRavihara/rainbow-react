import {
  bus,
  carRental,
  dth,
  electricity,
  flight,
  gas,
  hotel,
  insurance,
  recharge,
  train,
  water,
} from "@/assets";
import { Link } from "react-router-dom";

const billsAndRechargeIcons = [
  { icon: recharge, title: "Mobile" },
  { icon: electricity, title: "Electricity" },
  { icon: dth, title: "DTH" },
  { icon: water, title: "Water" },
  { icon: gas, title: "Gas" },
  { icon: insurance, title: "Insurance" },
];

const travelBookingsIcons = [
  { icon: flight, title: "Flight" },
  { icon: bus, title: "Bus" },
  { icon: train, title: "Train" },
  { icon: hotel, title: "Hotel" },
  { icon: carRental, title: "Car Rental" },
];

const ServicesArea = () => {
  return (
    <div className="">
      <center className="hidden lg:block">
        <div className="other-services">
          <div className=" fstotsediv w-[80%] flex gap-3 items-center justify-between flex-col xl:flex-row p-5 border-2 border-[#00000037] rounded-t-md rounded-b-0">
            <div className="oth-ser-div-left">
              <h1>Bills & Recharge</h1>
              <p>Bills & Recharge Pay your bills & recharge instantly with </p>
              <a href="#" className="expr-link">
                Srilanka Business
              </a>
            </div>
            <div className="oth-ser-div-right-section flex gap-4">
              {billsAndRechargeIcons.map((obj) => (
                <div
                  key={obj.title}
                  className="text-center float-left mt-[50px]"
                >
                  <div className=" w-[85px] h-[85px] text-center bg-white flex items-center justify-center border-2 border-[#34343439] rounded-lg">
                    <img
                      src={obj.icon}
                      className="w-[40px] flex items-center justify-center"
                      alt=""
                    />
                  </div>
                  <div className="mt-[10px] font-medium text-sm whitespace-nowrap">
                    {obj.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* -------------------- */}

          <div className=" w-[80%] flex gap-3 items-center justify-between flex-col xl:flex-row p-5 border-2 border-[#00000037] rounded-t-0 rounded-b-[7px]">
            <div className="oth-ser-div-lefta">
              <h1>Travel Bookings</h1>
              <p>Instance bookings for your best experience </p>
              <a href="#" className="expr-link">
                Explore More
              </a>
            </div>
            <div className="oth-ser-div-right-section flex gap-5">
              {travelBookingsIcons.map((obj) => (
                <div
                  key={obj.title}
                  className="text-center float-left mt-[50px]"
                >
                  <div className="w-[85px] h-[85px] text-center bg-white flex items-center justify-center border-2 border-[#34343439] rounded-lg">
                    <img
                      src={obj.icon}
                      className="w-[40px] flex items-center justify-center"
                      alt=""
                    />
                  </div>
                  <div className="mt-[10px] font-medium text-sm whitespace-nowrap">
                    {obj.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </center>

      {/* -------------------Mobile View---------------------- */}

      <div className="flex flex-col gap-5 lg:hidden px-10">
        <div className="flex flex-col">
          <div className="text-center">
            <h1 className="font-semibold text-2xl">Bills & Recharge</h1>
            <p>Pay your bills & recharge instantly with</p>
            <Link to="/" className="expr-link text-[#005eff] font-semibold">
              Explore More
            </Link>
          </div>

          <div>
            <div className="grid grid-cols-3">
              {billsAndRechargeIcons.map((obj) => (
                <div
                  key={obj.title}
                  className="text-center flex flex-col items-center mt-[50px]"
                >
                  <div className="w-[80px] h-[80px] xsm:w-[100px] xsm:h-[100px] sm:w-[120px] sm:h-[120px] text-center flex-col bg-white flex items-center justify-center border-2 border-[#34343439] rounded-lg">
                    <img
                      src={obj.icon}
                      className="w-[40px] flex items-center justify-center"
                      alt=""
                    />
                    <div className="mt-[10px] font-medium text-[12px] xsm:text-sm sm:text-base whitespace-nowrap">
                      {obj.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-center">
            <h1 className="font-semibold text-2xl">Travel Bookings</h1>
            <p>Instance bookings for your best experience</p>
            <Link to="/" className="expr-link text-[#005eff] font-semibold">
              Explore More
            </Link>
          </div>

          <div>
            <div className="grid grid-cols-3">
              {travelBookingsIcons.map((obj) => (
                <div
                  key={obj.title}
                  className="text-center flex flex-col items-center mt-[50px]"
                >
                  <div className="w-[80px] h-[80px] xsm:w-[100px] xsm:h-[100px] sm:w-[120px] sm:h-[120px] text-center flex-col bg-white flex items-center justify-center border-2 border-[#34343439] rounded-lg">
                    <img
                      src={obj.icon}
                      className="w-[40px] flex items-center justify-center"
                      alt=""
                    />
                    <div className="mt-[10px] font-medium text-[12px] xsm:text-sm sm:text-base whitespace-nowrap">
                      {obj.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServicesArea;
