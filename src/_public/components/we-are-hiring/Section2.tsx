const Section2 = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between w-full mt-10">
      <div className="flex flex-col gap-2 md:w-1/2">
        <img src="/it-room1.jpg" className="w-full h-[200px]" alt="" />
        <div className="flex gap-[10px]">
          <img src="/it-room2.jpg" className="w-[49%]" alt="" />
          <img src="/it-room3.jpeg" className="w-[49%]" alt="" />
        </div>
      </div>

      <div className="md:w-1/2 mt-10 md:mt-0 ml-5">
        <h1 className="text-3xl font-bold">Our Story</h1>
        <p>
          Welcome to Sri Lanka Business. Mainly in Sri Lanka, we help you to
          find many businesses and services that you need on a daily basis. In
          addition, we have listed a lot of information of local businessmen all
          over Sri Lanka. Our service extends from providing address and contact
          details of business establishments around the country, to making
          orders and reservations for Hotels, business places leisure, medical,
          financial, travel and domestic purposes. We enlist business
          information across varied sectors like Restaurants, Auto Care, Home
          Decor, Personal and Pet Care, Fitness, Insurance, Real Estate, Sports,
          Schools, etc. from all over the country. Holding informa- tion right
          from major cities in srilanka.
        </p>
      </div>
    </div>
  );
};
export default Section2;
