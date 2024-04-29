import Navbar from "@/components/navbar";
import TopBanner from "@/components/top-banner";
import Section1 from "../components/we-are-hiring/Section1";
import Section2 from "../components/we-are-hiring/Section2";
import Section3 from "../components/we-are-hiring/Section3";
import Footer from "@/components/footer";
import BottomBanner from "@/components/bottom-banner";

const WeAreHiringPage = () => {
  return (
    <div className="">
      <main
        className="flex min-h-screen flex-col items-center "
        // style={{ width: "calc(100% - 200px)" }}
      >
        <div className="fixed top-0 left-0 z-50">
          <TopBanner />
          <div className="fixed top-7 left-0 w-screen pr-4">
            <Navbar />
          </div>
        </div>

        <div className="mt-28 w-full">
          <div className="lg:w-[1024px] mx-auto px-10">
            <Section1 />
            <Section2 />
            <Section3 />
            <Footer />
          </div>

          <div className="bottom-0 w-full">
            <BottomBanner />
          </div>
        </div>
      </main>
    </div>
  );
};
export default WeAreHiringPage;
