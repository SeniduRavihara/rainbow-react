import Message from "@/components/admin/message";
import PopularBrands from "@/components/admin/popular-brands";
import SampleTestSetion1 from "@/components/admin/sample-test-setion1";
import SampleTest2 from "@/components/admin/sample-test2";
import SearchResultAd from "@/components/admin/search-result-ad";
import Store from "@/components/admin/store";
import { Button } from "@/components/ui/button";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const AdminPage = () => {
  return (
    <div className="p-5">
      <div className="w-full h-32 bg-red-300">
        <Button variant="link" asChild>
          <Link to="/">Back</Link>
        </Button>
      </div>
      <Tabs size="md" variant="enclosed" isFitted>
        <TabList>
          <Tab>Sample Test Section 1</Tab>
          <Tab>Sample Test 2</Tab>
          <Tab>Popular Brands</Tab>
          <Tab>Search Result Ad</Tab>
          <Tab>Store</Tab>
          <Tab>Message</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SampleTestSetion1 />
          </TabPanel>
          <TabPanel>
            <SampleTest2 />
          </TabPanel>
          <TabPanel>
            <PopularBrands />
          </TabPanel>
          <TabPanel>
            <SearchResultAd />
          </TabPanel>
          <TabPanel>
            <Store />
          </TabPanel>
          <TabPanel>
            <Message />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
export default AdminPage;
