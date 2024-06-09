import {
  appStore,
  fb,
  insta,
  linkedin,
  playStore,
  tiktok,
  // twitter,
  // yt,
} from "@/assets";
// import { Link } from "react-router-dom";

const SocialMediaArea = ({
  facebookUrl = "https://www.facebook.com/srilankabusiness.lk",
  linkedinUrl = "https://www.linkedin.com/in/srilankabusiness/",
  youtubeUrl = "test",
  twitterUrl = "test",
  instagramUrl = "https://www.instagram.com/srilankabusiness.lk/",
  tiktokUrl = "https://Www.tiktok.com/@srilankabusiness.lk",
}: {
  facebookUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
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
            <a href={facebookUrl} target="_blank" className="scl-md-links">
              <img src={fb} alt="" />
            </a>
          )}

          {/* {youtubeUrl && (
            <a href={youtubeUrl} target="_blank" className="scl-md-links">
              <img src={yt} alt="" />
            </a>
          )} */}

          {instagramUrl && (
            <a href={instagramUrl} target="_blank" className="scl-md-links">
              <img src={insta} alt="" />
            </a>
          )}

          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" className="scl-md-links">
              <img src={linkedin} alt="" />
            </a>
          )}

          {tiktokUrl && (
            <a href={tiktokUrl} target="_blank" className="scl-md-links">
              <img src={tiktok} alt="" />
            </a>
          )}

          {/* {twitterUrl && (
            <a href={twitterUrl} target="_blank" className="scl-md-links">
              <img src={twitter} alt="" />
            </a>
          )} */}
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
