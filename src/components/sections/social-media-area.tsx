import {
  appStore,
  fb,
  insta,
  linkedin,
  playStore,
  twitter,
  yt,
} from "@/assets";
import { Link } from "react-router-dom";

const SocialMediaArea = ({
  facebookUrl,
  linkedinUrl,
  youtubeUrl,
  twitterUrl,
  instagramUrl,
}: {
  facebookUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
}) => {
  return (
    <div className="third-section py-5 flex flex-col gap-5 md:flex-row items-center justify-between px-1">
      <div className="socail-links">
        {(facebookUrl ||
          linkedinUrl ||
          youtubeUrl ||
          twitterUrl ||
          instagramUrl) && (
          <div className="adasdfdsftxt mr-5">Follow us On</div>
        )}
        <div className="ad flex">
          {facebookUrl && (
            <Link to={facebookUrl} target="_blank" className="scl-md-links">
              <img src={fb} alt="" />
            </Link>
          )}

          {youtubeUrl && (
            <Link to={youtubeUrl} target="_blank" className="scl-md-links">
              <img src={yt} alt="" />
            </Link>
          )}

          {instagramUrl && (
            <Link to={instagramUrl} target="_blank" className="scl-md-links">
              <img src={insta} alt="" />
            </Link>
          )}

          {linkedinUrl && (
            <Link to={linkedinUrl} target="_blank" className="scl-md-links">
              <img src={linkedin} alt="" />
            </Link>
          )}

          {twitterUrl && (
            <Link to={twitterUrl} target="_blank" className="scl-md-links">
              <img src={twitter} alt="" />
            </Link>
          )}
        </div>
      </div>
      <div className="right-side flex">
        <a href="#">
          <img src={appStore} alt="" />
        </a>
        <a href="#">
          <img src={playStore} alt="" />
        </a>
      </div>
    </div>
  );
};
export default SocialMediaArea;
