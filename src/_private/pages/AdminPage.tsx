import Message from "@/components/admin/message";
import PopularBrands from "@/components/admin/popular-brands";
import SampleTestSetion1 from "@/components/admin/sample-test-setion1";
import SampleTest2 from "@/components/admin/sample-test2";
import SearchResultAd from "@/components/admin/search-result-ad";
import Store from "@/components/admin/store";
import { Button } from "@/components/ui/button";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
const AdminPage = () => {
  return (
    <div className="p-5 w-full min-h-screen flex flex-col gap-5">
      <div>
        <h1 className="font-extrabold text-4xl text-center">Admin Panel</h1>
        <Button variant="outline" asChild>
          <Link to="/">
            <IoArrowBack />
          </Link>
        </Button>
      </div>
      <Tabs size="md" variant="enclosed" isFitted>
        <TabList>
          <Tab>Sample Test Section 1</Tab>
          <Tab>Sample Test 2</Tab>
          <Tab>Popular Brands</Tab>
          <Tab>Search Result Ad</Tab>
          <Tab>Store</Tab>a
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
