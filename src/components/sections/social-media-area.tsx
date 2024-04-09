import {
  appStore,
  fb,
  insta,
  linkedin,
  playStore,
  twitter,
  yt,
} from "@/assets";

const SocialMediaArea = () => {
  return (
    <div className="third-section py-5 flex flex-col gap-5 lg:flex-row items-center justify-between px-10">
      <div className="socail-links">
        <div className="adasdfdsftxt">Follow us On</div>
        <div className="ad flex">
          <a href="#" className="scl-md-links">
            <img src={fb} alt="" />
          </a>
          <a href="#" className="scl-md-links">
            <img src={yt} alt="" />
          </a>
          <a href="#" className="scl-md-links">
            <img src={insta} alt="" />
          </a>
          <a href="#" className="scl-md-links">
            <img src={linkedin} alt="" />
          </a>
          <a href="#" className="scl-md-links">
            <img src={twitter} alt="" />
          </a>
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
