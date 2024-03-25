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
import CategoryCard from "../CategoryCard";


const categories = [
  { icon: resturant, label: "Resrurant" },
  { icon: hotel, label: "Hotel" },
  { icon: beautySpa, label: "Beauty Spa" },
  { icon: homeDecore, label: "Home Decore" },
  { icon: weddingRequisitos, label: "Wedding Requisitos" },
  { icon: education, label: "Education" },
  { icon: rent, label: "Rent" },
  { icon: pgHostels, label: "PG-Hostels" },
  { icon: estateAgent, label: "Estate Agent" },
  { icon: dentist, label: "Dentist" },
  { icon: gym, label: "Gym" },
  { icon: consultants, label: "Consultants" },
  { icon: hospitalEventOrganizers, label: "Hospital Event Organizers" },
  { icon: DrivingSchools, label: "Driving Schools" },
  { icon: constructorpackersMovers, label: "Constructor packers & Movers" },
  { icon: PetShop, label: "Pet Shop" },
  { icon: courierService, label: "Courier Service" },
  { icon: constructor, label: "Constructor" },
];

const CategoriesArea = () => {
  return (
    <ul className="w-full grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 border-2 px-20 sm:px-32">
      {categories.map((categoryObj, index) => (
        <li key={index}>
          <CategoryCard label={categoryObj.label} icon={categoryObj.icon} />
        </li>
      ))}
    </ul>
  );
};
export default CategoriesArea;
