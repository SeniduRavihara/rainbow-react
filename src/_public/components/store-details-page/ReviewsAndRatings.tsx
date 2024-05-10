import { FaStar } from "react-icons/fa";
import RatingComponent from "../search-result-page/RatingComponent";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { ReviewListType } from "@/types";
import Review from "./Review";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { postReview, updteReview } from "@/firebase/api";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { CircularProgress } from "@chakra-ui/react";

const ReviewsAndRatings = ({
  selectedStoreId,
}: {
  selectedStoreId: string;
}) => {
  const [reviews, setReviews] = useState<ReviewListType | null>(null);
  const [review, setReview] = useState("");
  const [ratingVal, setRatingVal] = useState(0);
  const [openModel, setOpenModel] = useState(false);
  // const [loading, setLoading] = useState();

  const { currentUserData } = useData();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (selectedStoreId) {
      const collectionRef = collection(db, "store", selectedStoreId, "reviews");
      const q = query(collectionRef, orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        const sctionAddsArr = QuerySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as ReviewListType;

        // console.log(sctionAddsArr);
        setReviews(sctionAddsArr);
      });

      return unsubscribe;
    }
  }, [selectedStoreId]);

  useEffect(() => {
    if (selectedStoreId) {
      const updateStoreRating = async () => {
        const documentRef = doc(db, "store", selectedStoreId);
        try {
          await updateDoc(documentRef, {
            rating: parseFloat(calculateRating().toFixed(1)),
            reviewCount: getReviewCount(),
          });
        } catch (error) {
          console.error("Error updating store rating:", error);
        }
      };

      updateStoreRating();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [review, ratingVal, selectedStoreId, calculateRating]);

  const handleStartReview = async () => {
    if (review && selectedStoreId) {
      const preReview = reviews?.find(
        (reviewObj) => reviewObj.userId === currentUserData?.id
      );

      if (preReview) {
        await updteReview(
          {
            imageUrl: currentUser?.photoURL || "",
            rating: ratingVal,
            review,
            userId: currentUserData?.id || "",
            userName: currentUserData?.name || "",
          },
          selectedStoreId,
          preReview.id
        );

        console.log(parseFloat(calculateRating().toFixed(1)));

        const documentRef = doc(db, "store", selectedStoreId);
        await updateDoc(documentRef, {
          rating: parseFloat(calculateRating().toFixed(1)),
          reviewCount: getReviewCount(),
        });
      } else {
        await postReview(
          {
            imageUrl: currentUser?.photoURL || "",
            rating: ratingVal,
            review,
            userId: currentUserData?.id || "",
            userName: currentUserData?.name || "",
          },
          selectedStoreId
        );

        const documentRef = doc(db, "store", selectedStoreId);
        await updateDoc(documentRef, {
          rating: parseFloat(calculateRating().toFixed(1)),
          reviewCount: getReviewCount(),
        });
      }
    }
    setOpenModel(false);
    setReview("");
    setRatingVal(0);
  };

  const hndelCancelClick = () => {
    setOpenModel(false);
    setReview("");
    setRatingVal(0);
  };

  const getRatingCount = () => {
    return reviews?.filter((reviewObj) => reviewObj.rating).length || 1;
  };

  const getReviewCount = () => {
    return reviews?.filter((reviewObj) => reviewObj.review).length || 1;
  };

  function calculateRating(): number {
    if (!reviews) {
      return 0; // Default rating if there are no reviews
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / getRatingCount();
    return averageRating;
  }

  const getRecentRatings = () => {
    if (!reviews) return [];

    const recentReviews = reviews
      ?.filter((reviewObj) => reviewObj.rating)
      .slice(0, 3);
    return recentReviews.map((review, index) => (
      <div key={index} className="flex items-center border rounded-lg px-2">
        <p>{review.rating.toFixed(1)}</p>
        <FaStar className="text-green-500" size={15} />
      </div>
    ));
  };

  if (!selectedStoreId) return (
    <div className="w-full h-screen flex items-center justify-center">
      <CircularProgress size="60px" isIndeterminate color="green.300" />
    </div>
  );
  return (
    <div className="flex flex-col gap-4 mb-10 px-5">
      <h2 className="text-2xl font-bold">Reviews And Ratings</h2>

      <div className="flex gap-3">
        <div className="p-3 flex text-3xl items-center justify-center w-14 h-14 bg-green-600 text-white rounded-xl">
          {calculateRating().toFixed(1)}
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">{getReviewCount()} Review</h2>
          <p>SLB rating index based on {getReviewCount()} review in the web</p>
        </div>
      </div>

      <div>
        <Dialog open={openModel} onOpenChange={setOpenModel}>
          <DialogTrigger asChild>
            <Button onClick={handleStartReview}>Start your Review</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add your Review</DialogTitle>
            </DialogHeader>

            <RatingComponent
              value={ratingVal}
              readonly={false}
              setValue={setRatingVal}
            />
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Review
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter className="sm:justify-start">
              <div className="w-full flex items-center justify-center gap-2 px-10">
                <Button type="button" onClick={hndelCancelClick}>
                  Cancel
                </Button>
                <Button onClick={handleStartReview}>Add</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* <RatingComponent value={3} /> */}
      </div>

      <h3>Recent rating trend</h3>
      <div className="flex gap-4 text-sm">{getRecentRatings()}</div>

      <div className="flex flex-col gap-5">
        {reviews &&
          reviews.map((reviewObj, index) => (
            <Review obj={reviewObj} key={index} />
          ))}

        {/* <div className="flex flex-col gap-3">
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
        </div> */}
      </div>
    </div>
  );
};
export default ReviewsAndRatings;
