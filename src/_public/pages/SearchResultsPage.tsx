import CarouselAdds from "@/components/CarouselAdds";
import Navbar from "../components/search-result-page/Navbar";
import ResultList from "../components/search-result-page/ResultList";
import SearchResultAddSection from "../components/search-result-page/SearchResultAddSection";
import SocialMediaArea from "@/components/sections/social-media-area";
import DiscriptionArea from "@/components/sections/discription-area";
import Footer from "@/components/footer";
import BottomBanner from "@/components/bottom-banner";

const SearchResultsPage = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="fixed top-0 left-0 z-50">
        <Navbar />
      </div>
      <div className="mt-20 w-full ">
        <CarouselAdds />
        <div className="flex justify-between mt-10 gap-5 px-10">
          <ResultList />
          <SearchResultAddSection />
        </div>

        <SocialMediaArea />
        <DiscriptionArea />
        <Footer />
        <BottomBanner />
      </div>
    </div>
  );
};
export default SearchResultsPage;
