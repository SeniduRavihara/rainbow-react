import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import InfoTab from "../InfoTab";
import GalleryTab from "../gallery-tab/GalleryTab";
import StreetViewTab from "../StreetViewTab";
import BlogTab from "../BlogTab";
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
        <TabList className="overflow-x-scroll overflow-y-hidden scrollbar-hide flex gap-4 tab-list tab-list-container">
          <Tab className="">Information</Tab>
          {selectedStore && selectedStore?.gallery && <Tab>Gallery</Tab>}
          {selectedStore && selectedStore?.location && <Tab>Street View</Tab>}
          {selectedStore && selectedStore?.gallery && <Tab>Blog</Tab>}
          {selectedStore && selectedStore?.companyProfilePdfUrl && (
            <Tab>Compay Profile</Tab>
          )}
          {selectedStore && selectedStore?.companyProfilePdfUrl && (
            <Tab>Videos</Tab>
          )}
          {selectedStore && selectedStore?.companyProfilePdfUrl && (
            <Tab>Our Products</Tab>
          )}
          {selectedStore && selectedStore?.companyProfilePdfUrl && (
            <Tab>Contact</Tab>
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

          {selectedStore && selectedStore?.gallery && (
            <TabPanel>
              <BlogTab />
            </TabPanel>
          )}

          {selectedStore && selectedStore?.companyProfilePdfUrl && (
            <TabPanel>
              <CompanyProfileTab
                companyProfilePdfUrl={selectedStore.companyProfilePdfUrl}
              />
            </TabPanel>
          )}

          {selectedStore && selectedStore?.companyProfilePdfUrl && (
            <TabPanel>
              <Videos />
            </TabPanel>
          )}

          {selectedStore && selectedStore?.companyProfilePdfUrl && (
            <TabPanel>
              <OurProductsTab />
            </TabPanel>
          )}

          {selectedStore && selectedStore?.companyProfilePdfUrl && (
            <TabPanel>
              <ContactTab />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </div>
  );
};
export default TabComponent;
