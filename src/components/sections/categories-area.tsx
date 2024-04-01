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
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

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
  { icon: hospitalEventOrganizers, label: "Hospital" },
  { icon: DrivingSchools, label: "Driving Schools" },
  { icon: constructorpackersMovers, label: "Constructor" },
  { icon: PetShop, label: "Pet Shop" },
  { icon: courierService, label: "Courier Service" },
  { icon: constructor, label: "Constructor" },
];

const CategoriesArea = () => {
  const [isShowAll, setIsShowAll] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [visibleCategories, setVisibleCategories] = useState(categories);

  useEffect(() => {
    setIsShowAll(false);

    if (screenWidth <= 500) {
      setVisibleCategories(categories.slice(0, 6));
    } else if (screenWidth <= 600) {
      setVisibleCategories(categories.slice(0, 8));
    } else if (screenWidth <= 768) {
      setVisibleCategories(categories.slice(0, 10));
    } else {
      setVisibleCategories(categories);
    }
  }, [screenWidth]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener to update screenWidth when window is resized
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <ul className=" w-full grid gap-x-20 grid-cols-3 xsm:grid-cols-4 sm:grid-cols-5  md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-9 px-14 sm:px-20 ">
        {isShowAll
          ? categories.map((categoryObj, index) => (
              <li key={index}>
                <CategoryCard
                  label={categoryObj.label}
                  icon={categoryObj.icon}
                />
              </li>
            ))
          : visibleCategories.map((categoryObj, index) => (
              <li key={index}>
                <CategoryCard
                  label={categoryObj.label}
                  icon={categoryObj.icon}
                />
              </li>
            ))}
      </ul>

      <div className="px-10 sm:px-20 mt-4 w-full md:hidden">
        <Button
          onClick={() => setIsShowAll(!isShowAll)}
          className="bg-[#0066FF] flex items-center justify-center gap-4 hover:bg-[#0066ff9a] h-[50px]  w-full"
        >
          {!isShowAll ? (
            <>
              <div>View All categorys</div> <FaArrowRight />
            </>
          ) : (
            <>
              <div>View less categorys</div> <FaArrowLeft />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
export default CategoriesArea;
