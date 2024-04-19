import { useData } from "@/hooks/useData";
import CustomTag from "../CustomTag";
import { fetchCatogaryData } from "@/firebase/api";
import { useNavigate } from "react-router-dom";

const popularCategories = [
  "Body Massage Centers",
  "Cinema Halls",
  "Schools",
  "Beauty Spas",
  "Dermatologists",
  "Hospitals",
  "Malls",
  "Gyms",
  "Beauty Parlours",
  "Estate Agents",
  "Banquet Halls",
  "ENT Doctors",
  "Book Shops",
  "Bike On Rent",
  "Sexologist Doctors",
  "Neurologists",
  "Gynaecologist & Obstetrician Doctors",
  "Train Ticket Booking Agents",
  "Travel Agents",
  "Paying Guest Accommodations",
  "General Physician Doctors",
  "Dentists",
  "Orthopaedic Doctors",
  "Chemists",
  "Motor Training Schools",
  "Gastroenterologists",
  "Car Rental",
  "Salons",
  "Courier Services",
  "Dance Classes",
  "Pathology Labs",
  "Taxi Services",
  "Cake Shops",
  "AC Repair & Services",
  "Mobile Phone Dealers",
  "Pet Shops",
  "Dmart",
  "Packers And Movers",
  "Psychiatrists",
  "Dharamshalas",
  "Urologist Doctors",
  "Bakeries",
  "Bicycle Dealers",
  "Coffee Shops",
  "Paediatricians",
  "Sonography Centres",
  "Yoga Classes",
  "Hostels",
  "Cardiologists",
  "Electrical Shops",
  "Skin Care Clinics",
  "Diagnostic Centres",
  "Homeopathic Doctors",
  "Physiotherapists",
  "Photo Studios",
  "Plumbers",
  "Music Classes",
  "Electricians",
  "Sports Goods Dealers",
  "Shoe Dealers",
  "Hair Stylists",
  "Gift Shops",
  "Ophthalmologists",
  "Car Repair & Services",
  "Ayurvedic Doctors",
  "Eye Clinics",
  "Restaurants",
  "Carpenters",
  "Jewellery Showrooms",
  "Cooks On Hire",
  "Stationery Shops",
  "Nephrologists",
  "Caterers",
  "Interior Designers",
  "Rehabilitation Center",
  "Drug De Addiction Center",
  "Grocery Stores",
  "Banks",
  "ATM",
  "5Star Hotels",
  "Hotels",
  "Resorts",
  "Plastic Surgeons",
];

const DiscriptionArea = () => {
    const {
      lastDocument,
      setLastDocument,
      setLoadingStoreFetching,
      setSearchResultStores,
      setIsAllFetched,
    } = useData();

    const navigate = useNavigate()

  const handleCategaryClick = async (label: string) => {
    // setSearchResultStores(null);
    // setLastDocument(null);
    await fetchCatogaryData(
      {
        lastDocument,
        setLastDocument,
        setLoadingStoreFetching,
        setSearchResultStores,
        setIsAllFetched,
      },
      label
    );
    navigate(`/search-results/category-${label}`);
  };

  return (
    <div className="flex flex-col gap-10 w-full py-10 px-3">
      <div>
        <h3 className="text-3xl font-semibold">
          One-Stop for All Local Businesses, Product and Services, Nearby Across
          srilanka
        </h3>
        <br />
        <p>
          Welcome to Sri Lanka Business. Mainly in Sri Lanka, we help you to
          find many businesses and services that you need on a daily basis. In
          addition, we have listed a lot of information of local businessmen all
          over Sri Lanka.
        </p>

        <br />

        <p>
          Our service extends from providing address and contact details of
          business establishments around the country, to making orders and
          reservations for Hotels, business places leisure, medical, financial,
          travel and domestic purposes. We enlist business information across
          varied sectors like Restaurants, Auto Care, Home Decor, Personal and
          Pet Care, Fitness, Insurance, Real Estate, Sports, Schools, etc. from
          all over the country. Holding information right from major cities in
          srilanka.
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-semibold">Popular Categories</h3>
        <br />
        {/* <div>
          {popularCategories.map((category) => (
            <CustomTag>{category}</CustomTag>
          ))}
        </div> */}
        <div className="my-1 gap-2  flex flex-wrap">
          {popularCategories.map((catoegory, index) => (
            <div key={index} onClick={() => handleCategaryClick(catoegory)}>
              <CustomTag styles="mx-[2px] text-gray-500 font-medium px-2 py-1 bg-white border cursor-pointer rounded-sm">
                {catoegory}
              </CustomTag>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DiscriptionArea;
