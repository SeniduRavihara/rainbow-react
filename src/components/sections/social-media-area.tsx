const SocialMediaArea = () => {
  return (
    <div className="third-section py-5 flex flex-col gap-5 lg:flex-row items-center justify-between px-10">
      <div className="socail-links">
        <div className="adasdfdsftxt">Follow us On</div>
        <div className="ad flex">
          <a href="#" className="scl-md-links">
            <img src="./assets/img/social-platforms/fb.png" alt="" />
          </a>
          <a href="#" className="scl-md-links">
            <img src="./assets/img/social-platforms/yt.png" alt="" />
          </a>
          <a href="#" className="scl-md-links">
            <img src="./assets/img/social-platforms/insta.png" alt="" />
          </a>
          <a href="#" className="scl-md-links">
            <img src="./assets/img/social-platforms/linkedin.png" alt="" />
          </a>
          <a href="#" className="scl-md-links">
            <img
              src="./assets/img/social-platforms/twitter_x_new_logo_x_rounded_icon_256078.png"
              alt=""
            />
          </a>
        </div>
      </div>
      <div className="right-side flex">
        <a href="#">
          <img
            src="./assets/img/Download_on_the_App_Store_Badge.svg.png"
            alt=""
          />
        </a>
        <a href="#">
          <img src="./assets/img/Google_Play_Store_badge_EN.svg.png" alt="" />
        </a>
      </div>
    </div>
  );
};
export default SocialMediaArea;
