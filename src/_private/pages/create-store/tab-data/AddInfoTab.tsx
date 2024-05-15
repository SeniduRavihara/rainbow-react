import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";

const AddInfoTab = ({
  storeId,
  preInfo1,
  preInfo2,
}: {
  storeId: string;
  preInfo1: string;
  preInfo2: string;
}) => {
  const [info1, setInfo1] = useState(preInfo1);
  const [info2, setInfo2] = useState(preInfo2);
  const [loading, setLoading] = useState(false);

  const handleClickUpdate = async () => {
    setLoading(true);

    const documentRef = doc(db, "latestStore", storeId);
    await updateDoc(documentRef, {
      info1,
      info2,
    });

    setLoading(false);
    toast.success("Store Updated Successfully");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full">
          <Label htmlFor="info1">Discription1</Label>
          <Textarea
            id="info1"
            value={info1}
            onChange={(e) => setInfo1(e.target.value)}
            required
            placeholder=" info1"
            className="h-[200px] focus-visible:ring-blue-500 focus-visible:ring-1"
          />
        </div>

        <div className="w-full">
          <Label htmlFor="info2">Discription2</Label>
          <Textarea
            id="info2"
            value={info2}
            onChange={(e) => setInfo2(e.target.value)}
            required
            placeholder="info2"
            className="h-[200px] focus-visible:ring-blue-500 focus-visible:ring-1"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Button onClick={handleClickUpdate} className="">
          {loading ? (
            <>
              <Loader /> <span className="ml-3">Loading...</span>
            </>
          ) : (
            "Update"
          )}
        </Button>
      </div>
    </div>
  );
};
export default AddInfoTab;
