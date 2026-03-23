import {
  CircleUserRound,
  Gift,
  Heart,
  Package,
  PackageOpen,
  ShoppingCart,
} from "lucide-react";
import type { NavbarRightSideType } from "../../types/navbar";
import { Link, NavLink } from "react-router-dom";

const pages: NavbarRightSideType[] = [
  {
    name: "My Profile",
    pathName: "my-profile",
    icon: CircleUserRound,
  },
  {
    name: "Orders",
    pathName: "orders",
    icon: Package,
  },
  {
    name: "Wishlist",
    pathName: "wishlist",
    icon: Heart,
  },
  {
    name: "Rewards",
    pathName: "rewards",
    icon: Gift,
  },
  {
    name: "Gift Cards",
    pathName: "gift-cards",
    icon: Gift,
  },
  {
    name: "Become a Seller",
    pathName: "become-a-seller",
    icon: PackageOpen,
  },
  {
    name: "Wishlist",
    pathName: "cart",
    icon: ShoppingCart,
  },
];

export function LoginPopover() {
  return (
    <div className="absolute top-5 -left-8 mt-2 w-56 bg-white shadow-lg rounded-lg p-6 pl-3 z-50">
      <div className="flex justify-between items-center mb-3">
        <h2 className="pl-3">New customer?</h2>
        <Link to={"/sign-up"} className="text-blue-600 text-sm font-medium">
          Sign Up
        </Link>
      </div>

      <ul className="space-y-1 text-sm">
        {pages.map((d, i) => {
          const Icon = d?.icon;
          return (
            <li
              key={i}
              className="hover:bg-linear-to-r from-blue-100 from-65% to-gray-100 p-2 pl-3 rounded"
            >
              <NavLink to={d.pathName} className={"flex items-center gap-2"}>
                {d.icon && (
                  <span>
                    <Icon size={18} />
                  </span>
                )}
                <span>{d.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
