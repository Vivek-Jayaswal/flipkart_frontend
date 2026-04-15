import {
  Shirt,
  Smartphone,
  Sparkles,
  Laptop,
  Refrigerator,
  ToyBrick,
  Utensils,
  Car,
  Bike,
  Dumbbell,
  Book,
  Sofa,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const categories = [
  { name: "For You", icon: Sparkles, pathName: "/" },
  { name: "Fashion", icon: Shirt, pathName: "/fashion" },
  { name: "Mobiles", icon: Smartphone, pathName: "/mobiles" },
  { name: "Beauty", icon: Sparkles, pathName: "/beauty" },
  { name: "Electronics", icon: Laptop, pathName: "/electronics" },
  { name: "Appliances", icon: Refrigerator, pathName: "/appliances" },
  { name: "Toys", icon: ToyBrick, pathName: "/toys" },
  { name: "Food & Health", icon: Utensils, pathName: "/food-health" },
  { name: "Auto Acc.", icon: Car, pathName: "auto-acc" },
  { name: "2 Wheelers", icon: Bike, pathName: "/automobiles" },
  { name: "Sports", icon: Dumbbell, pathName: "/sports" },
  { name: "Books", icon: Book, pathName: "/books" },
  { name: "Furniture", icon: Sofa, pathName: "/furniture" },
];

export default function CategoryNavbar() {
  return (
    <div className="w-full h-full">
      <div className="w-full sticky top-[120px] bg-white border-b border-gray-400 flex px-4 pt-1 justify-between">
        {categories.map((cat) => {
          const Icon = cat.icon;

          return (
            <NavLink
              to={cat.pathName}
              key={cat.name}
              className={({ isActive }) =>
                `${isActive ? "border-b-4 border-blue-500 font-semibold" : ""} px-2 flex flex-col items-center cursor-pointer`
              }
            >
              {({ isActive }) => {
                return (
                  <>
                    <span
                      className={`${isActive ? "rounded-md bg-linear-to-b from-[#95D0FF] to-gray-50" : ""} p-2`}
                    >
                      <Icon size={24} className="text-gray-700" />
                    </span>

                    <span className="text-sm text-gray-800 whitespace-nowrap">
                      {cat.name}
                    </span>
                  </>
                );
              }}
            </NavLink>
          );
        })}
      </div>
      <div className="bg-gray-50 p-2">
        <Outlet />
      </div>
    </div>
  );
}
