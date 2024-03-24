import SearchBox from "../search-box";

const SearchArea = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="font-semibold text-2xl">
        Search across &apos;3.3 Crore+&apos; <span className="text-blue-600">Product & Services</span>
      </h2>

      <div className="flex items-center gap-6">
        <SearchBox><div>sadsa</div></SearchBox>
        <SearchBox><div>Asdsad</div></SearchBox>
      </div>
    </div>
  );
};
export default SearchArea;
