const CategoryCard = ({ label, icon }: { label: string; icon: string }) => {
  return (
    <div>
      {/* <div className="flex flex-col items-center justify-center my-4">
        <div className="w-20 h-20 flex flex-col items-center justify-center border-2 border-gray-500/30 rounded-xl">
          <img src={icon} alt={label} className="w-10 h-10" />
        </div>
        <p className="text-center font-semibold text-sm">{label}</p>
      </div> */}

      <div className=" hidden lg:flex flex-col text-center justify-center float-left mt-[50px]">
        <div className=" w-[85px] h-[85px] text-center bg-white flex items-center justify-center border-2 border-[#34343439] rounded-lg">
          <img
            src={icon}
            className="w-[40px] flex items-center justify-center"
            alt=""
          />
        </div>
        <div className="mt-[10px] font-medium text-[12px] xsm:text-sm sm:text-base ">
          {label}
        </div>
      </div>

      {/* ---------------- */}

      <div className="lg:hidden text-center flex flex-col items-center mt-[20px]">
        <div className="p-1 w-[100px] h-[100px] text-center flex-col bg-white flex items-center justify-center border-2 border-[#34343439] rounded-lg">
          <img
            src={icon}
            className="w-[30px] xsm:w-[40px] flex items-center justify-center"
            alt=""
          />
          <div className="mt-[10px] font-medium text-sm">{label}</div>
        </div>
      </div>
    </div>
  );
};
export default CategoryCard;
