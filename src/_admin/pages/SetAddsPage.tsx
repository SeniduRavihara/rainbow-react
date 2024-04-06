// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import PopularBrands from "../../components/admin/PopularBrandsManage";
// import SearchResultAddsManage from "../../components/admin/SearchResultAddsManage";
// import SliderAddsManage from "../../components/admin/SliderAddsManage";
// import SectionAddsManage from "../../components/admin/SectionAddsManage";
import { Outlet } from "react-router-dom";

const SetAddsPage = () => {
  return (
    <div className="w-[95%] flex items-center justify-center">
      {/* <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Popular Brands</AccordionTrigger>
          <AccordionContent>
            <PopularBrands />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Search Result Adds</AccordionTrigger>
          <AccordionContent>
            <SearchResultAddsManage />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Slider Adds</AccordionTrigger>
          <AccordionContent>
            <SliderAddsManage />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Section Adds</AccordionTrigger>
          <AccordionContent>
            <SectionAddsManage />
          </AccordionContent>
        </AccordionItem>
      </Accordion> */}
      
      <Outlet />
    </div>
  );
};
export default SetAddsPage;
