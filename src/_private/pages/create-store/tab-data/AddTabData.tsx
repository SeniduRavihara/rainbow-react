import Accordion from "react-bootstrap/Accordion";
import { useNavigate, useParams } from "react-router-dom";
// import CreateGallery from "./CreateGallery";
import AddGoogleMapLocation from "./AddGoogleMapLocation";
import CreateCompanyProfile from "./CreateCompanyProfile";
import AddVideosTab from "./AddVideosTab";
import AddOurProductsTab from "./AddOurProductsTab";
import AddContactTab from "./AddContactTab";
// import AddBlogTab from "./AddBlogTab";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import AddInfoTab from "./AddInfoTab";
import AddGalleryTab from "./AddGalleryTab";
import UpdateTopSlider from "@/_private/pages/create-store/tab-data/UpdateTopSlider";
import toast from "react-hot-toast";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StoreObj } from "@/types";
import { db } from "@/firebase/config";
import { useData } from "@/hooks/useData";
import { CircularProgress } from "@chakra-ui/react";

const AddTabData = () => {
  const [currentUserStore, setCurrentUserStore] = useState<StoreObj | null>(
    null
  );
  const params = useParams();
  const { currentUserData } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.storeId) {
      const documentRef = doc(db, "latestStore", params.storeId);
      const unsubscribe = onSnapshot(documentRef, (QuerySnapshot) => {
        // console.log(sctionAddsArr);
        setCurrentUserStore(QuerySnapshot.data() as StoreObj);
      });

      return unsubscribe;
    }
  }, [params.storeId]);

  const handlePrevClick = () => {
    if (currentUserData?.roles.includes("admin")) {
      if (params.storeId) navigate(`/manage-store/${params.storeId}`);
    } else {
      if (params.storeId) navigate(`/manage-store/userStore`);
    }
  };

  const handleClickRequestSend = async () => {
    if (currentUserStore) {
      const adminMessagesCollectionRef = collection(db, "adminMessages");
      await addDoc(adminMessagesCollectionRef, {
        message: `I want To Update My Busness Profile: ${currentUserStore.title}`,
        createdAt: new Date(),
        imageUrl: "",
        fromName: "",
        fromId: currentUserStore.userId,
        toName: "admin",
        toId: "",
        seen: false,
      });

      toast.success("Request Send to Admin");
    }
  };

  if (!currentUserStore)
    return <CircularProgress size="30px" isIndeterminate color="green.300" />;

  return (
    <div className="p-10">
      <Button variant="outline" className="mb-10" onClick={handlePrevClick}>
        <FaArrowLeft />
      </Button>

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Setup Infomation</Accordion.Header>
          <Accordion.Body>
            <AddInfoTab
              storeId={params.storeId || ""}
              preInfo1={currentUserStore?.info1 || ""}
              preInfo2={currentUserStore?.info2 || ""}
            />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Setup Gallery</Accordion.Header>
          <Accordion.Body>
            <AddGalleryTab
              storeId={params.storeId || ""}
              gallery={currentUserStore.gallery || []}
            />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Setup Location</Accordion.Header>
          <Accordion.Body>
            <AddGoogleMapLocation
              storeId={params.storeId || ""}
              preLocationIframe={currentUserStore.location || ""}
            />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Setup Company Profile</Accordion.Header>
          <Accordion.Body>
            <CreateCompanyProfile
              storeId={params.storeId || ""}
              pdfUrl={currentUserStore.companyProfilePdfUrl}
            />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>Setup Videos</Accordion.Header>
          <Accordion.Body>
            <AddVideosTab
              storeId={params.storeId || ""}
              videos={currentUserStore.youtubeVideos || []}
            />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>Setup Products</Accordion.Header>
          <Accordion.Body>
            <AddOurProductsTab storeId={params.storeId || ""} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="7">
          <Accordion.Header>Setup Contact</Accordion.Header>
          <Accordion.Body>
            <AddContactTab storeId={params.storeId || ""} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="8">
          <Accordion.Header>Setup Top Slider</Accordion.Header>
          <Accordion.Body>
            <UpdateTopSlider storeId={params.storeId || ""} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-center mt-5 text-red-500">
          Need a Admin Aprove for update, Please send a admin Request
        </h1>

        <Button
          onClick={handleClickRequestSend}
          className=" md:w-[200px] m-[10px] rounded-xl flex items-center justify-center p-3 text-white "
        >
          Request For Update
        </Button>
      </div>
    </div>
  );
};
export default AddTabData;
