import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/firebase/config";
import { extractGoogleMapsLinkFromIframe } from "@/lib/utils";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AddGoogleMapLocation = ({
  storeId,
  preLocationIframe,
}: {
  storeId: string;
  preLocationIframe: string;
}) => {
  const [locationIfram, setLocationIfram] = useState("");
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleClickAdd = async () => {
    if (!storeId) return;
    setShow(true);
    setLoading(true);

    try {
      const documentRefLatest = doc(db, "latestStore", storeId);
      await updateDoc(documentRefLatest, {
        location: extractGoogleMapsLinkFromIframe(locationIfram),
      });

      const documentRef = doc(db, "store", storeId);
      await updateDoc(documentRef, {
        location: extractGoogleMapsLinkFromIframe(locationIfram),
      });

      toast.success("location added Successfully!");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="p-2 flex flex-col">
      <Link
        target="_blank"
        className="text-xl font-semibold text-blue-400 mb-5"
        to="https://firebasestorage.googleapis.com/v0/b/rainbow-32f4a.appspot.com/o/guide%2F0430.mp4?alt=media&token=23532649-00e1-4343-abf9-37458009e737"
      >
        Video Guide To Get The Location Link
      </Link>

      <Label>Location embed url</Label>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-1">
        <Input
          type="text"
          value={locationIfram}
          onChange={(e) => setLocationIfram(e.target.value)}
        />
        <Button onClick={handleClickAdd}>
          {loading ? (
            <>
              <Loader /> <span className="ml-3">Loading...</span>
            </>
          ) : (
            "Update"
          )}
        </Button>
      </div>

      {show && (
        <div className="mt-10">
          <iframe
            src={
              extractGoogleMapsLinkFromIframe(locationIfram) ||
              preLocationIframe ||
              ""
            }
            className="w-full"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}

      {/* <div className="flex gap-2 mt-5 mb-2 items-end justify-center">
        <Button variant="outline">Prev</Button>
        <Button variant="outline">Next</Button>
      </div> */}
    </div>
  );
};

export default AddGoogleMapLocation;
