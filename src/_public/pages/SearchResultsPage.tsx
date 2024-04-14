import CarouselAdds from "@/components/CarouselAdds";
import ResultList from "../components/search-result-page/ResultList";
import SearchResultAddSection from "../components/search-result-page/SearchResultAddSection";
import SocialMediaArea from "@/components/sections/social-media-area";
import DiscriptionArea from "@/components/sections/discription-area";
import Footer from "@/components/footer";
import BottomBanner from "@/components/bottom-banner";
import Navbar from "@/components/navbar";
import SearchBoxes from "@/components/SearchBoxes";
// import FilteringArea from "../components/search-result-page/FilteringArea";

const SearchResultsPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center w-screen pr-4">
      <div className="fixed top-0 left-0 z-50">
        <Navbar />
      </div>

      <div className="mt-16">
        <SearchBoxes />

        <div className="mt-10 w-full ">
          <CarouselAdds />
          {/* <FilteringArea /> */}
          <div className="flex justify-between mt-10 gap-5 px-2 md:px-10">
            <ResultList />
            <SearchResultAddSection />
          </div>

          <SocialMediaArea />
          <DiscriptionArea />
          <Footer />
          <BottomBanner />
        </div>
      </div>
    </div>
  );
};
export default SearchResultsPage;
