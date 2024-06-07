// import { cn } from "@/lib/utils";

import { logo } from "@/assets";
import { Link } from "react-router-dom";

type HeaderProps = {
  label: string;
};

const Header = ({ label }: HeaderProps) => {
  console.log(label);
  
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <Link to="/">
        <img src={logo} alt="logo" className="h-14 w-52" />
      </Link>
      {/* <p className="text-muted-foreground text-3xl font-bold -mt-2">{label}</p> */}
    </div>
  );
};
export default Header;
