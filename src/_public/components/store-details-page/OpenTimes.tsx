import { TimeValue } from "@/types";
import { Divider } from "@chakra-ui/react";

const OpenTimes = ({
  schedulArr,
}: {
  schedulArr: Array<{ day: string; time: TimeValue }>;
}) => {
  console.log(schedulArr);

  if (!schedulArr) return <></>;
  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-xl text-blue-500 font-medium">Opening Hours</h1>
      <ul>
        {schedulArr.map((day, index) => (
          <li key={index} className="flex flex-col gap-2">
            <div className="flex gap-2 items-center justify-between">
              <h3>{day.day}</h3>
              {day.time && Array.isArray(day.time) && (
                <h3>
                  {day.time[0]?.toLocaleString()} -{" "}
                  {day.time[1]?.toLocaleString()}
                </h3>
              )}
            </div>
            <Divider />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default OpenTimes;
