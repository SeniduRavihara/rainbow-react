import { cn } from "@/lib/utils";

const CustomTag = ({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles?: string;
}) => {
  return <div className={cn("px-2 py-1 bg-blue-400 rounded-md text-white flex items-center justify-center", styles)}>{children}</div>;
};
export default CustomTag;
