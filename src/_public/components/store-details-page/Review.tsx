import { placeholderReviewPic } from "@/assets";
import { ReviewObjType } from "@/types";
import RatingComponent from "../search-result-page/RatingComponent";
import { getTimeDifference } from "@/lib/utils";

function Review({ obj }: { obj: ReviewObjType }) {


  return (
    <div className="flex flex-col  w-full">
      <div className="flex items-center justify-center gap-2 py-2 w-full">
        <img
          src={obj.imageUrl || placeholderReviewPic}
          alt="profile"
          className="w-14 h-14 rounded-md"
        />
        <div className="w-full">
          <div className=" px-3 py-1 rounded-xl w-full">
            <div className="text-[12px] font-semibold">{obj.userName}</div>
            <div>{obj.review}</div>
          </div>
          <div className="flex gap-3 text-[12px] ml-4 font-semibold text-gray-600/70">
            <div className="">{getTimeDifference(obj.createdAt.toDate())}</div>
          </div>
        </div>
      </div>
      <div className="">
        <RatingComponent value={obj.rating} />
      </div>
    </div>
  );
}
export default Review;
