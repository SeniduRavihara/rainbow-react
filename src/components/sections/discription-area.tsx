import { useData } from "@/hooks/useData";
import CustomTag from "../CustomTag";
import { fetchCatogaryData } from "@/firebase/api";
import { useNavigate } from "react-router-dom";
import { popularCategories, popularCities } from "@/constants";

const DiscriptionArea = () => {
    const {
      lastDocument,
      setLastDocument,
      setLoadingStoreFetching,
      setSearchResultStores,
      setIsAllFetched,
    } = useData();

    const navigate = useNavigate()

  const handleCategaryClick = async (label: string) => {
    // setSearchResultStores(null);
    // setLastDocument(null);
    await fetchCatogaryData(
      {
        lastDocument,
        setLastDocument,
        setLoadingStoreFetching,
        setSearchResultStores,
        setIsAllFetched,
      },
      label
    );
    navigate(`/search-results/category-${label}`);
  };

  return (
    <div className="flex flex-col gap-10 w-full py-10 items-center justify-center">
      <div className="w-[95%] md:w-[92%]">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
          One-Stop for All Local Businesses, Product and Services, Nearby Across
          srilanka
        </h3>
        <br />
        <p>
          Welcome to Sri Lanka Business. Mainly in Sri Lanka, we help you to
          find many businesses and services that you need on a daily basis. In
          addition, we have listed a lot of information of local businessmen all
          over Sri Lanka.
        </p>

        <br />

        <p>
          Our service extends from providing address and contact details of
          business establishments around the country, to making orders and
          reservations for Hotels, business places leisure, medical, financial,
          travel and domestic purposes. We enlist business information across
          varied sectors like Restaurants, Auto Care, Home Decor, Personal and
          Pet Care, Fitness, Insurance, Real Estate, Sports, Schools, etc. from
          all over the country. Holding information right from major cities in
          srilanka.
        </p>
      </div>

      <div className="w-[95%] md:w-[92%]">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
          Popular Categories
        </h3>
        <br />
        {/* <div>
          {popularCategories.map((category) => (
            <CustomTag>{category}</CustomTag>
          ))}
        </div> */}
        <div className="my-1 gap-1 md:gap-2  flex flex-wrap">
          {popularCategories.map((catoegory, index) => (
            <div
              key={index}
              onClick={() => handleCategaryClick(catoegory)}
              className="flex items-center justify-center"
            >
              <CustomTag styles="text-gray-600 text-[13px] md:text-sm px-1 bg-white cursor-pointer rounded-0 border-gray-400  borderl-0">
                {catoegory}
              </CustomTag>
              <div className="w-[2px] h-4 bg-slate-400"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[95%] md:w-[92%]">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold">
          Popular Cities
        </h3>
        <br />
        {/* <div>
          {popularCategories.map((category) => (
            <CustomTag>{category}</CustomTag>
          ))}
        </div> */}
        <div className="my-1 gap-1 md:gap-2  flex flex-wrap">
          {popularCities.map((catoegory, index) => (
            <div
              key={index}
              // onClick={() => handleCategaryClick(catoegory)}
              className="flex items-center justify-center"
            >
              <CustomTag styles="text-gray-600 text-sm px-1 bg-white cursor-pointer rounded-0 border-gray-400  borderl-0">
                {catoegory}
              </CustomTag>
              <div className="w-[2px] h-4 bg-slate-400"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DiscriptionArea;
