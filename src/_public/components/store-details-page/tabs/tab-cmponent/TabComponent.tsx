import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import InfoTab from "../InfoTab";
import GalleryTab from "../gallery-tab/GalleryTab";
import StreetViewTab from "../StreetViewTab";
// import BlogTab from "../BlogTab";
import { StoreObj } from "@/types";
import CompanyProfileTab from "../CompanyProfileTab";
import "./style.css";
import Videos from "../Videos";
import OurProductsTab from "../OurProductsTab";
import ContactTab from "../ContactTab";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";

const TabComponent = ({
  selectedStore,
}: {
  selectedStore: StoreObj | null;
}) => {
  const [haveProducts, setHaveProducts] = useState(false);
  const [haveContacts, setHaveContacts] = useState(false);
  const [videoList, setVideoList] = useState<
    Array<{ videoUrl: string; id: string }>
  >([]);
  const [gallery, setGallery] = useState<
    Array<{
      imageUrl: string;
      refName: string;
      id: string;
    }>
  >([]);

  useEffect(() => {
    if (selectedStore) {
      const collectionRef = collection(
        db,
        "store",
        selectedStore?.id,
        "gallery"
      );
      const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
        const sctionStaticAddsArr = QuerySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Array<{ imageUrl: string; refName: string; id: string }>;

        //  console.log(sctionStaticAddsArr);
        setGallery(sctionStaticAddsArr);
      });

      return unsubscribe;
    }
  }, [selectedStore, selectedStore?.id]);

  useEffect(() => {
    if (selectedStore?.id) {
      const collectionRef = collection(
        db,
        "store",
        selectedStore?.id,
        "videos"
      );
      const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
        const sctionStaticAddsArr = QuerySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Array<{ videoUrl: string; id: string }>;

        // console.log(sctionStaticAddsArr);
        setVideoList(sctionStaticAddsArr);
      });

      return unsubscribe;
    }
  }, [selectedStore?.id]);

  useEffect(() => {
    const checkCollection = async () => {
      if (selectedStore?.id) {
        try {
          const collectionRef = collection(
            db,
            "store",
            selectedStore?.id,
            "products"
          );
          const querySnapshot = await getDocs(collectionRef);
          const documentsExist = !querySnapshot.empty;
          // console.log("SENUUUUU", documentsExist);

          setHaveProducts(documentsExist);
        } catch (error) {
          console.error("Error checking collection:", error);
          setHaveProducts(false);
        }
      }
    };

    checkCollection();
  }, [selectedStore?.id]);

  useEffect(() => {
    const checkCollection = async () => {
      if (selectedStore?.id) {
        try {
          const collectionRef = collection(
            db,
            "store",
            selectedStore?.id,
            "contacts"
          );
          const querySnapshot = await getDocs(collectionRef);
          const documentsExist = !querySnapshot.empty;
          setHaveContacts(documentsExist);
        } catch (error) {
          console.error("Error checking collection:", error);
          setHaveContacts(false);
        }
      }
    };

    checkCollection();
  }, [selectedStore?.id]);

  return (
    <div className="my-5">
      <Tabs className="">
        <TabList className="overflow-x-scroll overflow-y-hidden scrollbar-hide flex gap- tab-list tab-list-container">
          <Tab className="border mb-1">Information</Tab>
          {gallery.length >= 1 && <Tab className="border mb-1">Gallery</Tab>}
          {selectedStore?.location && selectedStore?.location && (
            <Tab className="border mb-1">Street View</Tab>
          )}
          {selectedStore?.companyProfilePdfUrl &&
            selectedStore?.companyProfilePdfUrl && (
              <Tab className="border mb-1">Compay Profile</Tab>
            )}
          {/* {selectedStore && selectedStore?.gallery && (
            <Tab className="border mb-1">Blog</Tab>
          )} */}
          {videoList.length >= 1 && <Tab className="border mb-1">Videos</Tab>}
          {selectedStore && haveProducts && (
            <Tab className="border mb-1">Our Products</Tab>
          )}
          {selectedStore && haveContacts && (
            <Tab className="border mb-1">Contact</Tab>
          )}
        </TabList>

        <TabPanels>
          <TabPanel>
            {selectedStore && (
              <InfoTab
                info1={selectedStore.info1}
                info2={selectedStore.info2}
              />
            )}
          </TabPanel>

          {gallery.length >= 1 && (
            <TabPanel>
              <GalleryTab gallery={gallery.map((item) => item.imageUrl)} />
            </TabPanel>
          )}

          {selectedStore?.location && selectedStore?.location && (
            <TabPanel>
              <StreetViewTab location={selectedStore?.location} />
            </TabPanel>
          )}

          {selectedStore?.companyProfilePdfUrl &&
            selectedStore?.companyProfilePdfUrl && (
              <TabPanel>
                <CompanyProfileTab
                  companyProfilePdfUrl={selectedStore.companyProfilePdfUrl}
                />
              </TabPanel>
            )}

          {/* {selectedStore && selectedStore?.gallery && (
            <TabPanel>
              <BlogTab />
            </TabPanel>
          )} */}

          {videoList.length >= 1 && (
            <TabPanel>
              <Videos youtubeVideos={videoList.map((item) => item.videoUrl)} />
            </TabPanel>
          )}

          {selectedStore && haveProducts && (
            <TabPanel>
              <OurProductsTab storeId={selectedStore?.id} />
            </TabPanel>
          )}

          {selectedStore && haveContacts && (
            <TabPanel>
              <ContactTab storeId={selectedStore?.id} />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </div>
  );
};
export default TabComponent;
