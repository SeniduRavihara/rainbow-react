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
import ServicesArea from "@/components/sections/ServicesArea";

const HomePage = () => {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center">
        <div className="fixed top-0 left-0 z-50">
          <TopBanner />
          <Navbar />
        </div>
        <div className="mt-32">
          <SearchArea />
          <CarouselAdds />
          {/* <CategoriesArea /> */}
          {/* <AdvertizingSection /> */}
          {/* <ServicesArea /> */}
          {/* <SocialMediaArea /> */}
          {/* <DiscriptionArea /> */}
          {/* <Footer /> */}
          <BottomBanner />
        </div>
      </main>
    </div>
  );
};
export default HomePage;
