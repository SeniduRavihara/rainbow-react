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

const TabComponent = ({
  selectedStore,
}: {
  selectedStore: StoreObj | null;
}) => {
  return (
    <div className="my-5">
      <Tabs className="">
        <TabList className="overflow-x-scroll overflow-y-hidden scrollbar-hide flex gap- tab-list tab-list-container">
          <Tab className="border mb-1">Information</Tab>
          {selectedStore && selectedStore?.gallery && (
            <Tab className="border mb-1">Gallery</Tab>
          )}
          {selectedStore && selectedStore?.location && (
            <Tab className="border mb-1">Street View</Tab>
          )}
          {selectedStore && selectedStore?.companyProfilePdfUrl && (
            <Tab className="border mb-1">Compay Profile</Tab>
          )}
          {/* {selectedStore && selectedStore?.gallery && (
            <Tab className="border mb-1">Blog</Tab>
          )} */}
          {selectedStore && selectedStore?.youtubeVideos && (
            <Tab className="border mb-1">Videos</Tab>
          )}
          {selectedStore && selectedStore?.companyProfilePdfUrl && (
            <Tab className="border mb-1">Our Products</Tab>
          )}
          {selectedStore && selectedStore?.companyProfilePdfUrl && (
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

          {selectedStore && selectedStore?.gallery && (
            <TabPanel>
              <GalleryTab gallery={selectedStore?.gallery} />
            </TabPanel>
          )}

          {selectedStore && selectedStore?.location && (
            <TabPanel>
              <StreetViewTab location={selectedStore?.location} />
            </TabPanel>
          )}

          {selectedStore && selectedStore?.companyProfilePdfUrl && (
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

          {selectedStore && selectedStore?.youtubeVideos && (
            <TabPanel>
              <Videos youtubeVideos={selectedStore.youtubeVideos} />
            </TabPanel>
          )}

          {selectedStore && selectedStore?.companyProfilePdfUrl && (
            <TabPanel>
              <OurProductsTab storeId={selectedStore?.id} />
            </TabPanel>
          )}

          {selectedStore && selectedStore?.companyProfilePdfUrl && (
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
