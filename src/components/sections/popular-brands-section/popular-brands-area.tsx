import { placeholderPopularBrands } from "@/assets";
import ImageSlider from "@/components/image-slider/ImageSlider";
import { useData } from "@/hooks/useData";

const PopularBrandsArea = () => {
  const { popularBrands } = useData();

  if (!popularBrands) {
    return <ImageSlider images={placeholderPopularBrands} />;
  }

  return <ImageSlider images={popularBrands} />;
};
export default PopularBrandsArea;
