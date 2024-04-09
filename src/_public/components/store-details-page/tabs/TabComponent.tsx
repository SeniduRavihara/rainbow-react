import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import InfoTab from "./InfoTab";
import GalleryTab from "./GalleryTab";
import StreetViewTab from "./StreetViewTab";
import BlogTab from "./BlogTab";
import { StoreObj } from "@/types";

const TabComponent = ({ selectedStore }: { selectedStore : StoreObj | null}) => {
  return (
    <div className="my-5">
      <Tabs>
        <TabList>
          <Tab>Information</Tab>
          <Tab>Gallery</Tab>
          <Tab>Street View</Tab>
          <Tab>Blog</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {selectedStore && <InfoTab info1={selectedStore.info1} info2={selectedStore.info2} />}
          </TabPanel>
          <TabPanel>
            <GalleryTab />
          </TabPanel>
          <TabPanel>
            <StreetViewTab />
          </TabPanel>
          <TabPanel>
            <BlogTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
export default TabComponent;
