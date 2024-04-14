import AdvertizingSection from "@/components/sections/advertizing-section/advertizing-section";
import BottomBanner from "@/components/bottom-banner";
import CarouselAdds from "@/components/CarouselAdds";
import CategoriesArea from "@/components/sections/categories-area";
import DiscriptionArea from "@/components/sections/discription-area";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import SearchArea from "@/components/sections/search-area";
import SocialMediaArea from "@/components/sections/social-media-area";
import TopBanner from "@/components/top-banner";
import ServicesArea from "@/components/sections/service-area/ServicesArea";
import PopularBrandsArea from "@/components/sections/popular-brands-section/popular-brands-area";
// import TestSearch from "@/testing/TestSearch";

const HomePage = () => {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center w-screen pr-4">
        <div className="fixed top-0 left-0 z-50">
          <TopBanner />
          <div className="fixed top-7 left-0">
            <Navbar />
          </div>
        </div>
        <div className="mt-28">
          {/* <TestSearch /> */}
          <SearchArea />
          <CarouselAdds />
          <CategoriesArea />
          <AdvertizingSection />
          <ServicesArea />
          <PopularBrandsArea />
          <SocialMediaArea />
          <DiscriptionArea />
          <Footer />
          <BottomBanner />
        </div>
      </main>
    </div>
  );
};
export default HomePage;
