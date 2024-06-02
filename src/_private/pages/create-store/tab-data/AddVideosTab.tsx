import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/firebase/config";
import { extractYoutubeLinkFromIframe } from "@/lib/utils";
// import { CircularProgress } from "@chakra-ui/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AddVideosTab = ({
  storeId,
}: {
  storeId: string;
}) => {
  const [videoLink, setVideoLink] = useState("");
  const [videoList, setVideoList] = useState<
    Array<{ videoUrl: string; id: string }>
  >([]);
  // const [loading, setLoading] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState({
    status: false,
    id: "",
  });

  useEffect(() => {
    const collectionRef = collection(db, "latestStore", storeId, "videos");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const sctionStaticAddsArr = QuerySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<{ videoUrl: string; id: string }>;

      console.log(sctionStaticAddsArr);
      setVideoList(sctionStaticAddsArr);
    });

    return unsubscribe;
  }, [storeId]);

  const handleClickAdd = async () => {
    const documentRef = doc(db, "latestStore", storeId);
    const latestData = await getDoc(documentRef);

    await setDoc(documentRef, {
      ...latestData.data(),
      haveUpdate: [
        ...(latestData?.data()?.haveUpdate ?? []),
        latestData?.data()?.haveUpdate.includes("videos")
          ? undefined
          : "videos",
      ].filter((txt) => txt),
    });

    const collectionRef = collection(db, "latestStore", storeId, "videos");

    await addDoc(collectionRef, {
      videoUrl: extractYoutubeLinkFromIframe(videoLink),
    });

    setVideoLink("");
  };

  // const handleClickUpdate = async () => {
  //   setLoading(true);

  //   try {
  //     const documentRef = doc(db, "latestStore", storeId);
  //     await updateDoc(documentRef, {
  //       youtubeVideos: videoList,
  //     });
  //     toast.success("Videos updated successfully!");
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setLoading(false);
  // };

  const handleDeleteVideo = async (id: string) => {
    try {
      // Delete the product document
      const documentRefLatest = doc(db, "latestStore", storeId, "videos", id);
      await deleteDoc(documentRefLatest);
      toast.success("Product successfully deleted!");

      const documentRef = doc(db, "store", storeId, "videos", id);
      await deleteDoc(documentRef);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product and image");
    }
  };

  return (
    <div className="px-3 flex flex-col">
      <Link
        target="_blank"
        className="text-xl font-semibold text-blue-400 mb-5"
        to="https://firebasestorage.googleapis.com/v0/b/rainbow-32f4a.appspot.com/o/guide%2Fyoutube%20guid.mp4?alt=media&token=02dac91e-7ea9-4587-9f1e-acff3b0e0471"
      >
        Video Guide To Get The Video Link
      </Link>

      <div>
        <Label>video embed url</Label>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
          <Input
            type="text"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
          />
          <Button onClick={handleClickAdd}>Add</Button>
        </div>

        {/* <div className="flex items-center justify-center gap-5 mt-3">
          {loading ? (
            <CircularProgress size="30px" isIndeterminate color="green.300" />
          ) : (
            <Button onClick={handleClickUpdate}>Update</Button>
          )}
        </div> */}
      </div>

      {videoLink && <div></div>}

      {/* <div className="w-full flex items-center justify-center">
        <ul className="flex flex-wrap gap-3 mt-10">
          {videoList.map((video, index) => (
            <li key={index}>
              <iframe
                src={extractYoutubeLinkFromIframe(video.videoUrl)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </li>
          ))}
        </ul>
      </div> */}

      {/* {videoList.length === 0 && (
        <div className="w-full flex items-center justify-center">
          <ul className="flex flex-wrap gap-3 mt-10">
            {videos.map((video, index) => (
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
      )} */}

      <div className="flex flex-wrap gap-3 mt-10">
        {videoList &&
          videoList.map((videoObj, index) => (
            <div
              key={index}
              className="relative my-3"
              onMouseEnter={() =>
                setShowDeleteIcon({
                  status: true,
                  id: videoObj.id,
                })
              }
              onMouseLeave={() =>
                setShowDeleteIcon({
                  status: true,
                  id: "",
                })
              }
            >
              <iframe
                src={videoObj.videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>

              {showDeleteIcon.id === videoObj.id && (
                <div
                  className="cursor-pointer w-full text-center hover:text-red-500 duration-200 text-2xl absolute bottom-0 backdrop-blur-xl"
                  onClick={() => handleDeleteVideo(videoObj.id)}
                >
                  <Button variant="link" className="invert	">
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
export default AddVideosTab;
