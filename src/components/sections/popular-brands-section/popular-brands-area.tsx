// import { placeholderPopularBrands } from "@/assets";
import ImageSlider from "@/components/image-slider/ImageSlider";
import { useData } from "@/hooks/useData";
import { CircularProgress } from "@chakra-ui/react";

const PopularBrandsArea = () => {
  const { popularBrands } = useData();

  if (!popularBrands) {
    return (
      <div className="px-3 md:px-10">
        <h1 className="text-2xl">Popular brands</h1>
        <div className="flex items-center justify-center h-[200px]">
          <CircularProgress size="30px" isIndeterminate color="green.300" />
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 flex flex-col gap-3 px-3 md:px-10">
      <h1 className="text-2xl font-semibold flex items-center justify-center sm:justify-start  px-3 md:px-10">
        Popular brands
      </h1>

      <ImageSlider images={popularBrands} />
    </div>
  );
};
export default PopularBrandsArea;
