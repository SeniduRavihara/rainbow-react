import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/firebase/config";
import { extractYoutubeLinkFromIframe } from "@/lib/utils";
import { CircularProgress } from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AddVideosTab = ({ storeId }: { storeId: string }) => {
  const [videoLink, setVideoLink] = useState("");
  const [videoList, setVideoList] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleClickAdd = async () => {
    setVideoList((pre) => [...pre, extractYoutubeLinkFromIframe(videoLink)]);

    setVideoLink("");
  };

  const handleClickUpdate = async () => {
    setLoading(true);
    try {
      const documentRef = doc(db, "store", storeId);
      await updateDoc(documentRef, {
        youtubeVideos: videoList,
      });
      toast.success("Videos updated successfully!");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="px-10 flex flex-col">
      <Link
        target="_blank"
        className="text-xl font-semibold text-blue-400 mb-5"
        to="https://firebasestorage.googleapis.com/v0/b/rainbow-32f4a.appspot.com/o/guide%2Fyoutube%20guid.mp4?alt=media&token=02dac91e-7ea9-4587-9f1e-acff3b0e0471"
      >
        Video Guide To Get The Video Link
      </Link>

      <div>
        <Label>video embed url</Label>
        <div className="flex items-center justify-center gap-2">
          <Input
            type="text"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
          />
          <Button onClick={handleClickAdd}>Add</Button>
        </div>

        <div className="flex items-center justify-center gap-5 mt-3">
          {loading ? (
            <CircularProgress size="30px" isIndeterminate color="green.300" />
          ) : (
            <Button onClick={handleClickUpdate}>Update</Button>
          )}
        </div>
      </div>

      {videoLink && <div></div>}

      <div className="w-full flex items-center justify-center">
        <ul className="flex flex-wrap gap-3 mt-10">
          {videoList.map((video, index) => (
            <li key={index}>
              <iframe
                src={video}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default AddVideosTab;
