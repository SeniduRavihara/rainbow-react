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
      <h3 className="text-2xl  font-semibold mb-5">Qucik Links</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <ul>
          <h1 className="text-orange-500 font-semibold mb-2 text-lg">
            Customer Care
          </h1>
          <li>About Us</li>
          <li>Investor Relations</li>
          <li>We are Hiring</li>
          <li>Customer Care</li>
          <li>Free Listing</li>
          <li>What&apos;s New</li>
          <li>report Bug</li>
        </ul>

        <ul>
          <h1 className="text-orange-500 font-semibold  mb-2 text-lg">
            Srilanka Business
          </h1>
          <li>About</li>
          <li>
            Careers
            <ul className="ml-10">
              <li>Stores</li>
              <li>Donates</li>
              <li>Blog</li>
            </ul>
          </li>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
          <li>Mobile App</li>
          <li>PayLater Edu</li>
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
          <p className="text-red-500 text-lg font-semibold">0113 184 000</p>

          <h1 className="text-xl font-semibold mt-2">COMPLAIN</h1>
          <p className="text-red-500 text-lg font-semibold mb-3">
            0775 124 000
          </p>

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
              <img src={fb} alt="" />
            </li>
            <li className="scl-md-links">
              <img src={twitter} alt="" />
            </li>
            <li className="scl-md-links">
              <img src={insta} alt="" />
            </li>
            <li className="scl-md-links">
              <img src={yt} alt="" />
            </li>
            <li className="w-[30px] -mt-[2px]">
              <img src={web} alt="" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Footer;
