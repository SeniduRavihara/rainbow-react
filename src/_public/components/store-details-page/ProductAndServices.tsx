import CustomTag from "@/components/CustomTag";
import { fetchCatogaryData, fetchTagData } from "@/firebase/api";
import { useData } from "@/hooks/useData";
import { useNavigate } from "react-router-dom";

const ProductAndServices = ({
  tags,
  category,
}: {
  tags: Array<string>;
  category: string;
}) => {
  const {
    lastDocument,
    setLastDocument,
    setLoadingStoreFetching,
    setSearchResultStores,
    setIsAllFetched,
    setCurrentPage,
  } = useData();
  const navigate = useNavigate();

  const handleTagClick = async (tag: string) => {
    // setSearchResultStores(null);
    // setLastDocument(null);
    await fetchTagData(
      {
        lastDocument,
        setLastDocument,
        setLoadingStoreFetching,
        setSearchResultStores,
        setIsAllFetched,
      },
      tag
    );
    navigate(`/search-results/tags-${tag}`);
  };

  const handleCategaryClick = async (label: string) => {
    // setSearchResultStores(null);
    // setLastDocument(null);
    setCurrentPage(1);
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

  // if (!tags && !categoriesArr) return <>Loading...</>;
  return (
    <div className="mb-10 px-10 flex flex-col gap-5">
      {tags && (
        <div>
          <h1 className="text-xl md:text-xl font-bold mb-3">
            PRODUCTS AND SERVICES
          </h1>

          <div className="my-1 gap-2 flex flex-wrap">
            {tags.map((tag, index) => (
              <div key={index} onClick={() => handleTagClick(tag)}>
                <CustomTag styles="mx-[2px] text-gray-500 font-medium px-2 py-1 bg-white border cursor-pointer rounded-sm">
                  {tag}
                </CustomTag>
              </div>
            ))}
          </div>
        </div>
      )}

      {category && (
        <div>
          <h1 className="text-xl md:text-xl font-bold mb-3">LISTED UNDER</h1>

          <div
            className="my-1 gap-2  flex flex-wrap"
            onClick={() => handleCategaryClick(category)}
          >
            {/* {categoriesArr.map((catoegory, index) => (
              <div key={index} onClick={() => handleCategaryClick(catoegory)}>
                <CustomTag styles="mx-[2px] text-gray-500 font-medium px-2 py-1 bg-white border cursor-pointer rounded-sm">
                  {catoegory}
                </CustomTag>
              </div>
            ))} */}
            <CustomTag styles="mx-[2px] text-gray-500 font-medium px-2 py-1 bg-white border cursor-pointer rounded-sm">
              {category}
            </CustomTag>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductAndServices;
