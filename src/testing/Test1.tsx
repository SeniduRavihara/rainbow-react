import "./profile.css";

const StoreCard = () => {
  return (
    <div>
      <div className="uploaded-item-section">
        <div className="photogalary-imgs img1"></div>
        <div className="photogalary-imgs img2"></div>
        <div className="photogalary-imgs img3"></div>
        <div className="other-photo">
          <div className="other-photo-img img1" id="otherimg1"></div>
          <div className="other-photo-img img2" id="otherimg2"></div>
          <div className="other-photo-img img3" id="otherimg3"></div>
          <div className="other-photo-img img4" id="otherimg4"></div>
        </div>
      </div>

      <div className="profile-contents">
        <div className="pro-pic-img" id="logoimage">
          {/* <!-- <img src="./assets/img/profile/store_images/269742460_660707861973707_4840997105365911715_n.jpg" alt=""> --> */}
        </div>
        <div className="names-andothers">
          <div className="profile-user-name" id="profile-user-name"></div>
          <div className="profile-user-have-ratings">
            <div className="rating-rate">4.6</div>
            <div className="rating-starts-limit">
              {/* <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon> */}
            </div>
            <div className="rating-count">
              <span id="ratingCount">1</span> Ratings
            </div>
          </div>
          <div className="users-located-place">
            <div className="located-icon">
              {/* <ion-icon name="location-outline"></ion-icon> */}
            </div>
            <div className="user-location">
              <span id="location"></span>{" "}
              <div className="user-locate-bullet">•</div>
            </div>
            <div className="store-opend-time">
              <b>Opend</b> until 8:00 pm{" "}
              <div className="user-locate-bullet">•</div>
            </div>
            <div className="joined-year">Joined this year</div>
          </div>
          <div className="profile-buttons">
            <button id="shownumberbtn" className="show-number-button">
              <div className="sh-number-icon">
                {/* <ion-icon name="call"></ion-icon> */}
              </div>{" "}
              <div className="sh-number-txt">Show Number</div>
            </button>
            <div className="other-buttons-div">
              <button>
                <div className="whatsapp-sharebt-content">
                  <div className="whatsapp-bticon">
                    <img src="./assets/img/profile/whatsappico.png" alt="" />
                  </div>{" "}
                  <div className="whtsbt-txt">Chat</div>
                </div>
              </button>
            </div>
            <div className="other-seconds-btns">
              <button className="other-seconds-btns-button" id="shownumber2btn">
                Show Number
              </button>
              <button className="other-seconds-btns-button-share">
                <div className="other-seconds-btns-button-share-icon"></div>{" "}
                Share
              </button>
              <button className="other-seconds-btns-button">
                {/* <ion-icon name="heart-outline" style="font-size: 15px;"></ion-icon> */}
              </button>
              <button className="other-seconds-btns-button">
                {/* <ion-icon name="create-outline"style="font-size: 15px;"></ion-icon> */}
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />

      <div className="account-informations">
        <div className="account-info-btns">
          <button className="active">Information</button>
          <button>Gallery</button>
          <button>Street View</button>
          <button>Blog</button>
        </div>
        <div className="asdasdasdasdad">
          <div className="popular-categorys">
            <div className="popular-categorys-title">Popular Categories</div>
            <div className="popular-categories">
              <div className="categori-card">Body massage</div>
              <div className="categori-card">Cinema Halls</div>
              <div className="categori-card">Schools</div>
              <div className="categori-card">Beauty Spas</div>
              <div className="categori-card">Gyms</div>
              <div className="categori-card">Hotels</div>
              <div className="categori-card">Resorts</div>
              <div className="categori-card">Beauty Spas</div>
              <div className="categori-card">Body massage</div>
              <div className="categori-card">Cinema Halls</div>
              <div className="categori-card">Schools</div>
              <div className="categori-card">Beauty Spas</div>
              <div className="categori-card">Gyms</div>
              <div className="categori-card">Hotels</div>
              <div className="categori-card">Resorts</div>
              <div className="categori-card">Beauty Spas</div>
              <div className="categori-card">Body massage</div>
              <div className="categori-card">Cinema Halls</div>
              <div className="categori-card">Schools</div>
              <div className="categori-card">Beauty Spas</div>
              <div className="categori-card">Gyms</div>
              <div className="categori-card">Hotels</div>
              <div className="categori-card">Resorts</div>
              <div className="categori-card">Beauty Spas</div>
              <div className="categori-card">Body massage</div>
              <div className="categori-card">Cinema Halls</div>
              <div className="categori-card">Schools</div>
              <div className="categori-card">Beauty Spas</div>
              <div className="categori-card">Gyms</div>
              <div className="categori-card">Hotels</div>
              <div className="categori-card">Resorts</div>
              <div className="categori-card">Beauty Spas</div>
              <div className="categori-card">Body massage</div>
              <div className="categori-card">Cinema Halls</div>
              <div className="categori-card">Schools</div>
              <div className="categori-card">Beauty Spas</div>
              <div className="categori-card">Gyms</div>
              <div className="categori-card">Hotels</div>
              <div className="categori-card">Resorts</div>
              <div className="categori-card">Beauty Spas</div>
            </div>
          </div>
          <div className="popular-categorys">
            <div className="popular-categorys-title">Popular Categories</div>
            <div className="popular-categories">
              <div className="categori-card">Body massage</div>
              <div className="categori-card">Cinema Halls</div>
              <div className="categori-card">Schools</div>
              <div className="categori-card">Beauty Spas</div>
              <div className="categori-card">Gyms</div>
              <div className="categori-card">Hotels</div>
              <div className="categori-card">Resorts</div>
              <div className="categori-card">Beauty Spas</div>
              <div className="categori-card">Body massage</div>
              <div className="categori-card">Cinema Halls</div>
              <div className="categori-card">Schools</div>
              <div className="categori-card">Beauty Spas</div>
              <div className="categori-card">Gyms</div>
              <div className="categori-card">Hotels</div>
              <div className="categori-card">Resorts</div>
              <div className="categori-card">Beauty Spas</div>
              <div className="categori-card">Body massage</div>
              <div className="categori-card">Cinema Halls</div>
              <div className="categori-card">Schools</div>
              <div className="categori-card">Beauty Spas</div>
              <div className="categori-card">Gyms</div>
              <div className="categori-card">Hotels</div>
              <div className="categori-card">Resorts</div>
              <div className="categori-card">Beauty Spas</div>
              <div className="categori-card">Body massage</div>
              <div className="categori-card">Cinema Halls</div>
              <div className="categori-card">Schools</div>
              <div className="categori-card">Beauty Spas</div>
              <div className="categori-card">Gyms</div>
              <div className="categori-card">Hotels</div>
              <div className="categori-card">Resorts</div>
              <div className="categori-card">Beauty Spas</div>
              <div className="categori-card">Body massage</div>
              <div className="categori-card">Cinema Halls</div>
              <div className="categori-card">Schools</div>
              <div className="categori-card">Beauty Spas</div>
              <div className="categori-card">Gyms</div>
              <div className="categori-card">Hotels</div>
              <div className="categori-card">Resorts</div>
              <div className="categori-card">Beauty Spas</div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-user-reviews-and-ratings-section">
        <div className="profile-user-reviews-and-ratings-section-title">
          Reviews & Ratings
        </div>
        <div className="profile-user-reviews-and-ratings-section-rate-counter">
          <div className="profile-user-reviews-and-ratings-section-rate-counterasdasd">
            <div className="adprofile-user-reviews-and-ratings-section-rate-counterasdasd">
              <div className="rate-counter-in-dots">4.9</div>
            </div>
            <br />
            <div className="profile-user-reviews-and-ratings-section-rate-counterasdasd-asdasda">
              <div className="rating-counter-in-letters">
                <span id="ratingCountbottom"></span> Ratings
              </div>
              <div className="rating-counter-in-letters-report">
                Jd rating index based on <span id="ratingCounttext"></span>{" "}
                ratings across the web
              </div>
            </div>
          </div>
        </div>
        <div className="star-items-for-ratings-section-title">
          Star your Review
        </div>

        {/* <!-- Rating start --> */}
        <div className="stars-items-content">
          <div className="post" id="post">
            <div className="text">Thanks for rating us!</div>
            {/* <!-- <div className="edit" id="edit">EDIT</div> --> */}
          </div>
          <div className="star-widget" id="star-widget">
            <input type="radio" value="rate5" name="rate" id="rate-5" />
            <label
              htmlFor="rate-5"
              className="fas fa-star"
              style={{ marginRight: "20px" }}
            ></label>
            <input type="radio" value="rate4" name="rate" id="rate-4" />
            <label htmlFor="rate-4" className="fas fa-star"></label>
            <input type="radio" value="rate3" name="rate" id="rate-3" />
            <label htmlFor="rate-3" className="fas fa-star"></label>
            <input type="radio" value="rate2" name="rate" id="rate-2" />
            <label htmlFor="rate-2" className="fas fa-star"></label>
            <input type="radio" value="rate1" name="rate" id="rate-1" />
            <label htmlFor="rate-1" className="fas fa-star"></label>
            <form action="#" id="ratingform">
              <input type="hidden" name="create_id" id="create_id" />
              <div className="textarea">
                <textarea
                  placeholder="comment your rating.."
                  id="comment"
                ></textarea>
              </div>
              <div className="btn">
                <button type="submit" id="ratingbtn">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* <!-- Rating end --> */}

        <div>
          <div className="star-items-for-ratings-section-title">
            Recent rating trend
          </div>
          <div className="recent-user-ratings-div" id="ratingalldisplay">
            <div className="recent-user-rate">
              <div className="recnet-user-pro-pic-div">
                <div className="rated-user-pro-pic" id="ratinguserpic"></div>
              </div>
              <div className="rated-user-informations">
                <div className="rated-user-info-names">Gihan Hasintha</div>
                <div className="rated-user-info-rate">
                  {/* <ion-icon name="star" className="active"></ion-icon>
                        <ion-icon name="star" className="active"></ion-icon>
                        <ion-icon name="star" className="active"></ion-icon>
                        <ion-icon name="star" className="active"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="third-section">
          <div className="socail-links">
            <div className="adasdfdsftxt">Follow us On</div>
            <div className="ad">
              <a href="#" className="scl-md-links">
                <img
                  src="./assets/img/profile/social-platforms/fb.png"
                  alt=""
                />
              </a>
              <a href="#" className="scl-md-links">
                <img
                  src="./assets/img/profile/social-platforms/yt.png"
                  alt=""
                />
              </a>
              <a href="#" className="scl-md-links">
                <img
                  src="./assets/img/profile/social-platforms/insta.png"
                  alt=""
                />
              </a>
              <a href="#" className="scl-md-links">
                <img
                  src="./assets/img/profile/social-platforms/linkedin.png"
                  alt=""
                />
              </a>
              <a href="#" className="scl-md-links">
                <img
                  src="./assets/img/profile/social-platforms/twitter_x_new_logo_x_rounded_icon_256078.png"
                  alt=""
                />
              </a>
            </div>
          </div>
          <div className="right-side">
            <a href="#">a
              <img
                src="./assets/img/profile/Download_on_the_App_Store_Badge.svg.png"
                alt=""
              />
            </a>
            <a href="#">
              <img
                src="./assets/img/profile/Google_Play_Store_badge_EN.svg.png"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
