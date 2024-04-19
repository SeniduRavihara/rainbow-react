import {
  resturant,
  DrivingSchools,
  PetShop,
  rent,
  beautySpa,
  constructor,
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
  { icon: resturant, label: "Resrurant" },
  { icon: hotel, label: "Hotel" },
  { icon: beautySpa, label: "Beauty Spa" },
  { icon: homeDecore, label: "Home Decore" },
  { icon: weddingRequisitos, label: "Wedding Requisitos" },
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
  { icon: constructor, label: "Constructor" },
];
