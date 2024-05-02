import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase/config";
import { extractYoutubeLinkFromIframe } from "@/lib/utils";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AddVideosTab = ({ storeId }: { storeId: string }) => {
  const [videoLink, setVideoLink] = useState("");
  const [videoList, setVideoList] = useState<string[]>([]);

  console.log(videoList);
  

  const handleClickAdd = async () => {
    setVideoList((pre) => [...pre, extractYoutubeLinkFromIframe(videoLink)]);
    
    setVideoLink("");

  };

    const handleClickUpdate = async () => {
      // if (!storeId) return;

      try {
        const documentRef = doc(db, "store", storeId);
        await updateDoc(documentRef, {
          youtubeVideos: videoList,
        });
        toast.success("Videos updated successfully!");
      } catch (error) {
        console.log(error);
      }
    };

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
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />
        <Button onClick={handleClickAdd}>Add</Button>
        <Button onClick={handleClickUpdate}>Update</Button>
      </div>

      {videoLink && (
        <div>
          
        </div>
      )}

      {/* <div className="flex gap-2 mt-5 mb-2 items-end justify-center">
        <Button variant="outline">Prev</Button>
        <Button variant="outline">Next</Button>
      </div> */}
    </div>
  );
};
export default AddVideosTab;
