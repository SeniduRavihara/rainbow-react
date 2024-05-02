import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import InfoTab from "./InfoTab";
import GalleryTab from "./gallery-tab/GalleryTab";
import StreetViewTab from "./StreetViewTab";
import BlogTab from "./BlogTab";
import { StoreObj } from "@/types";
import CompanyProfileTab from "./CompanyProfileTab";

const TabComponent = ({
  selectedStore,
}: {
  selectedStore: StoreObj | null;
}) => {
  return (
    <div className="my-5">
      <Tabs>
        <TabList>
          <Tab>Information</Tab>
          {selectedStore && selectedStore?.gallery && <Tab>Gallery</Tab>}
          {selectedStore && selectedStore?.location && <Tab>Street View</Tab>}
          {selectedStore && selectedStore?.gallery && <Tab>Blog</Tab>}
          {selectedStore && selectedStore?.gallery && <Tab>Compay Profile</Tab>}
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

          {selectedStore && selectedStore?.gallery && (
            <TabPanel>
              <CompanyProfileTab />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </div>
  );
};
export default TabComponent;
