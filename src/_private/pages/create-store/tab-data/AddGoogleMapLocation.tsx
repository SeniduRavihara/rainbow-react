import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase/config";
import { extractGoogleMapsLinkFromIframe } from "@/lib/utils";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AddGoogleMapLocation = ({ storeId }: { storeId: string }) => {
  const [locationIfram, setLocationIfram] = useState("");

  const [show, setShow] = useState(false);
  const handleClickAdd = async () => {
    if (!storeId) return;
    setShow(true);
    try {
      const documentRef = doc(db, "store", storeId);
      await updateDoc(documentRef, {
        location: extractGoogleMapsLinkFromIframe(locationIfram),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="p-10 flex flex-col">
      <Link
        target="_blank"
        to="https://firebasestorage.googleapis.com/v0/b/rainbow-32f4a.appspot.com/o/guide%2F0430.mp4?alt=media&token=23532649-00e1-4343-abf9-37458009e737"
      >
        How to get the Link
      </Link>

      <div>
        <Input
          type="text"
          value={locationIfram}
          onChange={(e) => setLocationIfram(e.target.value)}
        />
        <Button onClick={handleClickAdd}>Add</Button>
      </div>

      {show && locationIfram && (
        <div>
          <iframe
            src={extractGoogleMapsLinkFromIframe(locationIfram) || ""}
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
