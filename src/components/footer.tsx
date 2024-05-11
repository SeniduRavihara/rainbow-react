import {
  americanExpress,
  fb,
  insta,
  master,
  twitter,
  visa,
  web,
  yt,
} from "@/assets";

const Footer = () => {
  return (
    <div className="w-full p-10">
      {/* <h3 className="text-2xl  font-semibold mb-5">Qucik Links</h3> */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <ul>
          <h1 className="text-orange-500 font-semibold mb-2 text-lg">
            Customer Care
          </h1>
          <li>
            <a href="">About Us</a>
          </li>
          <li>
            <a href="">Investor Relations</a>
          </li>
          <li>
            <a href="">We are Hiring</a>
          </li>
          <li>
            <a href="">Customer Care</a>
          </li>
          <li>
            <a href="">Free Listing</a>
          </li>
          <li>
            <a href="">What&apos;s New</a>
          </li>
          <li>
            <a href="">report Bug</a>
          </li>
        </ul>

        <ul>
          <h1 className="text-orange-500 font-semibold  mb-2 text-lg">
            Srilanka Business
          </h1>
          <li>
            <a href="">About</a>
          </li>
          <li>
            Careers
            <ul className="ml-10">
              <li>
                <a href="">Stores</a>
              </li>
              <li>
                <a href="">Donates</a>
              </li>
              <li>
                <a href="">Blog</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="">Terms & Conditions</a>
          </li>
          <li>
            <a href="">Privacy Policy</a>
          </li>
          <li>
            <a href="">Mobile App</a>
          </li>
          <li>
            <a href="">PayLater Edu</a>
          </li>
        </ul>

        <div>
          <h1 className="text-orange-500 font-semibold mb-2 text-lg">
            Payment Methods
          </h1>
          <div className="flex gap-2 mt-2">
            <img src={visa} className="w-12" alt="" />
            <img src={master} className="w-12" alt="" />
            <img src={americanExpress} className="w-12" alt="" />
          </div>

          <h1 className="text-xl font-semibold mt-3">Help Desk</h1>

          <a className="text-white" href="tel:0113184000">
            <p className="text-red-500 text-lg font-semibold">0113 184 000</p>
          </a>

          <h1 className="text-xl font-semibold mt-2">COMPLAIN</h1>
          <a className="text-white" href="tel:0775124000">
            <p className="text-red-500 text-lg font-semibold">0775 124 000</p>
          </a>

          <a href="info@srilankanusiness.lk">info@srilankanusiness.lk</a>
          <br />
          <a href="https://srilankabusiness.lk/">www.srilankabusiness.lk</a>
        </div>

        <div>
          <h1 className="text-orange-500 font-semibold  mb-2 text-lg">
            Exclusive Deals and Offers!
          </h1>
          <img src="/QR.jpg" className="w-[150px]" alt="" />

          <h1 className="text-orange-500 font-semibold mt-3">Follow Us</h1>
          <ul className="flex gap-2 mt-2">
            <li className="scl-md-links">
              <a href="">
                <img src={fb} alt="" />
              </a>
            </li>
            <li className="scl-md-links">
              <a href="">
                <img src={twitter} alt="" />
              </a>
            </li>
            <li className="scl-md-links">
              <a href="">
                <img src={insta} alt="" />
              </a>
            </li>
            <li className="scl-md-links">
              <a href="">
                <img src={yt} alt="" />
              </a>
            </li>
            <li className="w-[30px] -mt-[2px]">
              <a href="">
                <img src={web} alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Footer;
