import CarouselAdds from "@/components/CarouselAdds";
import Navbar from "../components/Navbar";
import ResultList from "../components/search-result-page/ResultList";
import SearchResultAddSection from "../components/search-result-page/SearchResultAddSection";
import SocialMediaArea from "@/components/sections/social-media-area";
import DiscriptionArea from "@/components/sections/discription-area";
import Footer from "@/components/footer";
import BottomBanner from "@/components/bottom-banner";
import { useEffect } from "react";

const SearchResultsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen">
      <div className="fixed top-0 left-0 z-50">
        <Navbar />
      </div>
      <div className="mt-48 md:mt-20 w-full">
        <CarouselAdds />
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
  );
};

export default SearchResultsPage;
