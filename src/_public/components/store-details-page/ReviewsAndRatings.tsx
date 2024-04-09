import { FaStar } from "react-icons/fa";
import RatingComponent from "../search-result-page/RatingComponent";

const ReviewsAndRatings = () => {
  return (
    <div className="flex flex-col gap-4 mb-10 px-5">
      <h2 className="font-medium">ReviewsAndRatings</h2>

      <div className="flex gap-3">
        <div className="p-3 flex text-3xl items-center justify-center w-14 h-14 bg-green-600 text-white rounded-xl">
          4.9
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">8 Ratings</h2>
          <p>Jd rating index based on 8 rating the web</p>
        </div>
      </div>

      <div>
        <h3>Start your Review</h3>
        <RatingComponent value={3} />
      </div>

      <h3>Recent rating trend</h3>
      <div className="flex gap-4 text-sm">
        <div className="flex items-center border rounded-lg px-2">
          <p>5.0</p>
          <FaStar className="text-green-500" size={15} />
        </div>
        <div className="flex items-center border rounded-lg px-2">
          <p>5.0</p>
          <FaStar className="text-green-500" size={15} />
        </div>
        <div className="flex items-center border rounded-lg px-2">
          <p>5.0</p>
          <FaStar className="text-green-500" size={15} />
        </div>
        <div className="flex items-center border rounded-lg px-2">
          <p>5.0</p>
          <FaStar className="text-green-500" size={15} />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17QA6doIB80ky2T2PGYpnTvi58SIeoeBSoPDZrXqXXw&s"
              alt=""
              className="w-14 h-14 rounded-md"
            />
            <div>
              <h3>Mehul Chorge</h3>
              <p>1 review</p>
            </div>
          </div>
          <RatingComponent value={5} />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17QA6doIB80ky2T2PGYpnTvi58SIeoeBSoPDZrXqXXw&s"
              alt=""
              className="w-14 h-14 rounded-md"
            />
            <div>
              <h3>Mehul Chorge</h3>
              <p>1 review</p>
            </div>
          </div>
          <RatingComponent value={5} />
        </div>
      </div>
    </div>
  );
}
export default ReviewsAndRatings