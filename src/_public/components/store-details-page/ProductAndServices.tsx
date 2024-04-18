import CustomTag from "@/components/CustomTag";
import { fetchCatogaryData, fetchTagData } from "@/firebase/api";
import { useData } from "@/hooks/useData";
import { useNavigate } from "react-router-dom";

const ProductAndServices = ({
  tags,
  categoriesArr,
}: {
  tags: Array<string>;
  categoriesArr: Array<string>;
}) => {
  const {
    lastDocument,
    setLastDocument,
    setLoadingStoreFetching,
    setSearchResultStores,
    setIsAllFetched,
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
      {tags && <div>
        <h1 className="text-2xl font-bold mb-3">PRODUCTS AND SERVICES</h1>

        <div className="my-1 flex">
          {tags.map((tag, index) => (
            <div key={index} onClick={() => handleTagClick(tag)}>
              <CustomTag styles="mx-[2px] text-gray-500 font-medium px-2 py-1 bg-white border cursor-pointer">
                {tag}
              </CustomTag>
            </div>
          ))}
        </div>
      </div>}

      {categoriesArr && (
        <div>
          <h1 className="text-2xl font-bold mb-3">LISTED UNDER</h1>
          <div className="my-1 flex">
            {categoriesArr.map((catoegory, index) => (
              <div key={index} onClick={() => handleCategaryClick(catoegory)}>
                <CustomTag styles="mx-[2px] text-gray-500 font-medium px-2 py-1 bg-white border cursor-pointer">
                  {catoegory}
                </CustomTag>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductAndServices;
