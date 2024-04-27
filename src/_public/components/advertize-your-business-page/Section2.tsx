import { anounce, marketAnalysis, marktBusiness } from "@/assets";

const Section2 = () => {
  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold text-center md:px-32 px-2">
        Srilanka Busines Ads Help You To Achieve Your Goals
      </h1>

      <ul className="flex justify-center items-center md:gap-10 lg:gap-14">
        <li>
          <img src={marktBusiness} alt="" className="w-[300px]" />
        </li>
        <li>
          <img src={marketAnalysis} className="w-[300px]" alt="" />
        </li>
        <li>
          <img src={anounce} className="w-[300px]" alt="" />
        </li>
      </ul>
    </div>
  );
}
export default Section2