// import { cn } from "@/lib/utils";

import { logo } from "@/assets";
import { Link } from "react-router-dom";

type HeaderProps = {
  label?: string;
};

const Header = ({ label }: HeaderProps) => {
  // console.log(label);

  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <Link to="/">
        <img src={logo} alt="logo" className="h-14 w-48" />
      </Link>
      {/* <h1 className="text-orange-400 font-bold mt-3 text-xl">{label}</h1> */}
      <p className="text-muted-foreground text-xl font-bold -mt-2">{label}</p>
    </div>
  );
};
export default Header;
