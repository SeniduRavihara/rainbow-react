import { cn } from "@/lib/utils";

const SearchBox = ({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles:string;
}) => {
  return (
    <div className={cn("border-2 border-gray-400 w-full rounded-md py-1", styles)}>
      {children}
    </div>
  );
};
export default SearchBox