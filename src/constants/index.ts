import {
  resturant,
  DrivingSchools,
  PetShop,
  rent,
  beautySpa,
  // constructor,
  constructorpackersMovers,
  consultants,
  courierService,
  dentist,
  education,
  estateAgent,
  gym,
  homeDecore,
  hospitalEventOrganizers,
  hotel,
  pgHostels,
  weddingRequisitos,
} from "@/assets";

export const INITIAL_CURRENT_USER_DATA = {
  id: "",
  email: "",
  name: "",
  roles: [""],
};

export const INITIAL_AUTH_CONTEXT = {
  currentUser: null,
  setCurrentUser: () => {},
};

export const INITIAL_DATA_CONTEXT = {
  currentUserData: null,
  setCurrentUserData: () => {},
  sectionAdds: null,
  sectionStaticAdds: null,
  sliderAdds: null,
  popularBrands: null,
  searchResultStores: null,
  setSearchResultStores: () => {},
  searchItem: "",
  setSearchitem: () => {},
  location: "",
  setLocation: () => {},
  loadingStoreFetching: false,
  setLoadingStoreFetching: () => {},
  lastDocument: null,
  setLastDocument: () => {},
  isAllFetched: false,
  setIsAllFetched: () => {},
  userMessages: null,
  locationArr: null,
  setLocationArr: () => {},
};

export const INITIAL_SCHEDULAR_ARR = [
  { day: "Monday", time: ["08:00", "05:00"] },
  { day: "Tuesday", time: ["08:00", "05:00"] },
  { day: "Wednesday", time: ["08:00", "05:00"] },
  { day: "Thursday", time: ["08:00", "05:00"] },
  { day: "Friday", time: ["08:00", "05:00"] },
  { day: "Saturday", time: ["08:00", "05:00"] },
  { day: "Sunday", time: ["08:00", "05:00"] },
];

export const categories = [
  { icon: resturant, label: "Restaurant" },
  { icon: hotel, label: "Hotel" },
  { icon: beautySpa, label: "Beauty Spa" },
  { icon: homeDecore, label: "Home Decor" },
  { icon: weddingRequisitos, label: "Wedding Requisites" },
  { icon: education, label: "Education" },
  { icon: rent, label: "Rent" },
  { icon: pgHostels, label: "PG Hostels" },
  { icon: estateAgent, label: "Estate Agent" },
  { icon: dentist, label: "Dentist" },
  { icon: gym, label: "Gym" },
  { icon: consultants, label: "Consultants" },
  { icon: hospitalEventOrganizers, label: "Hospital" },
  { icon: DrivingSchools, label: "Driving Schools" },
  { icon: constructorpackersMovers, label: "Constructor" },
  { icon: PetShop, label: "Pet Shop" },
  { icon: courierService, label: "Courier Service" },
  // Add additional categories here
  { icon: "", label: "Body Massage Centers" },
  { icon: "", label: "Cinema Halls" },
  { icon: "", label: "Schools" },
  { icon: "", label: "Beauty Spas" },
  { icon: "", label: "Dermatologists" },
  { icon: "", label: "Hospitals" },
  { icon: "", label: "Malls" },
  { icon: "", label: "Gyms" },
  { icon: "", label: "Beauty Parlours" },
  { icon: "", label: "Estate Agents" },
  { icon: "", label: "Banquet Halls" },
  { icon: "", label: "ENT Doctors" },
  { icon: "", label: "Book Shops" },
  { icon: "", label: "Bike On Rent" },
  { icon: "", label: "Sexologist Doctors" },
  { icon: "", label: "Neurologists" },
  { icon: "", label: "Gynaecologist & Obstetrician Doctors" },
  { icon: "", label: "Train Ticket Booking Agents" },
  { icon: "", label: "Travel Agents" },
  { icon: "", label: "Paying Guest Accommodations" },
  { icon: "", label: "General Physician Doctors" },
  { icon: "", label: "Dentists" },
  { icon: "", label: "Orthopaedic Doctors" },
  { icon: "", label: "Chemists" },
  { icon: "", label: "Motor Training Schools" },
  { icon: "", label: "Gastroenterologists" },
  { icon: "", label: "Car Rentals" },
  { icon: "", label: "Salons" },
  { icon: "", label: "Courier Services" },
  { icon: "", label: "Dance Classes" },
  { icon: "", label: "Pathology Labs" },
  { icon: "", label: "Taxi Services" },
  { icon: "", label: "Cake Shops" },
  { icon: "", label: "AC Repair & Services" },
  { icon: "", label: "Mobile Phone Dealers" },
  { icon: "", label: "Pet Shops" },
  { icon: "", label: "Dmart" },
  { icon: "", label: "Packers And Movers" },
  { icon: "", label: "Psychiatrists" },
  { icon: "", label: "Dharamshalas" },
  { icon: "", label: "Urologist Doctors" },
  { icon: "", label: "Bakeries" },
  { icon: "", label: "Bicycle Dealers" },
  { icon: "", label: "Coffee Shops" },
  { icon: "", label: "Paediatricians" },
  { icon: "", label: "Sonography Centres" },
  { icon: "", label: "Yoga Classes" },
  { icon: "", label: "Hostels" },
  { icon: "", label: "Cardiologists" },
  { icon: "", label: "Electrical Shops" },
  { icon: "", label: "Skin Care Clinics" },
  { icon: "", label: "Diagnostic Centres" },
  { icon: "", label: "Homeopathic Doctors" },
  { icon: "", label: "Physiotherapists" },
  { icon: "", label: "Photo Studios" },
  { icon: "", label: "Plumbers" },
  { icon: "", label: "Music Classes" },
  { icon: "", label: "Electricians" },
  { icon: "", label: "Sports Goods Dealers" },
  { icon: "", label: "Shoe Dealers" },
  { icon: "", label: "Hair Stylists" },
  { icon: "", label: "Gift Shops" },
  { icon: "", label: "Ophthalmologists" },
  { icon: "", label: "Car Repair & Services" },
  { icon: "", label: "Ayurvedic Doctors" },
  { icon: "", label: "Eye Clinics" },
  { icon: "", label: "Restaurants" },
  { icon: "", label: "Carpenters" },
  { icon: "", label: "Jewellery Showrooms" },
  { icon: "", label: "Cooks On Hire" },
  { icon: "", label: "Stationery Shops" },
  { icon: "", label: "Nephrologists" },
  { icon: "", label: "Caterers" },
  { icon: "", label: "Interior Designers" },
  { icon: "", label: "Rehabilitation Center" },
  { icon: "", label: "Drug De Addiction Center" },
  { icon: "", label: "Grocery Stores" },
  { icon: "", label: "Banks" },
  { icon: "", label: "ATM" },
  { icon: "", label: "5Star Hotels" },
  { icon: "", label: "Hotels" },
  { icon: "", label: "Resorts" },
  { icon: "", label: "Plastic Surgeons" },
];

export const popularCategories = [
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

export const popularCities = [
  "Akkaraipattu",
  "Ampara",
  "Anuradhapura",
  "Badulla",
  "Balangoda",
  "Bandarawela",
  "Batticaloa",
  "Chavakachcheri",
  "Chilaw",
  "Colombo",
  "Dambulla",
  "Dehiwela-Mount Lavinia",
  "Embilipitiya",
  "Eravur",
  "Galle",
  "Gampaha",
  "Gampola",
  "Hambantota",
  "Happutalle",
  "Homagama",
  "Jaffna",
  "Kalmunai",
  "Kalutara",
  "Kandy",
  "Kattankudy",
  "Kegalle",
  "Kinniya",
  "Kurunegala",
  "Kuliyapitiya",
  "Mahiyanganaya",
  "Mannar",
  "Matale",
  "Matara",
  "Mawathagama",
  "Mihintale",
  "Monaragala",
  "Mulleriyawa",
  "Negombo",
  "Nuwara Eliya",
  "Padukka",
  "Puttalam",
  "Polonnaruwa",
  "Point Pedro",
  "Ratnapura",
  "Sri Jayewardenepura Kotte",
  "Thambiluvil",
  "Trincomalee",
  "Valvettithurai",
  "Vavuniya",
  "Vijitapura",
];
