
import { FaFacebook } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";


const TopBanner = () => {
  return (
    <div className="navbar-top flex justify-between items-center">
      <div className="text-xs xsm:text-sm text-white xsm:ml-5 ml-2">
        0113 184 000 | info@srilankabusiness.lk
      </div>

      <div className="ad flex xsm:pr-5 sm:gap-1">
        <a
          href="https://www.facebook.com/srilankabusiness.lk"
          target="_blank"
          className="scl-md-links text-white xsm:text-xl text-base"
        >
          <FaFacebook />
        </a>

        <a
          href="#"
          target="_blank"
          className="scl-md-links text-white xsm:text-xl text-base"
        >
          <FaYoutube />
        </a>

        <a
          href="https://www.instagram.com/srilankabusiness.lk/"
          target="_blank"
          className="scl-md-links text-white xsm:text-xl text-base"
        >
          <AiFillInstagram />
        </a>

        <a
          href="#"
          target="_blank"
          className="scl-md-links text-white xsm:text-xl text-base"
        >
          <FaLinkedin />
        </a>

        <a
          href="#"
          target="_blank"
          className="scl-md-links text-white xsm:text-xl text-base"
        >
          <FaSquareXTwitter />
        </a>
      </div>
    </div>
  );
};
export default TopBanner;
