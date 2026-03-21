import { NavLink } from "react-router-dom";

import type { NavbarRightSideType } from "../../types/navbar";
import { Input } from "../reusable.tsx/search-input";
import {
  CircleUserRound,
  Search,
  ChevronDown,
  ShoppingCart,
} from "lucide-react";
import { NavItem } from "./nav-item";
import { LoginPopover } from "./login-popover";
import { MorePopover } from "./more-popover";
import TopBar from "./top-bar";
import { CartPopover } from "./cart-popover";

export function NavBar() {
  return (
    <div className="sticky top-0 left-0 bg-white">
      <TopBar />
      <div className="border-b border-gray-200 w-full grid grid-cols-[3fr_1.3fr] py-4">
        <div className="relative">
          <Input className="pl-10 pr-4 w-full rounded border border-gray-400" value="dfsdf" />
          <Search
            size={18}
            className="text-gray-400 absolute top-1/5 left-2 "
          />
        </div>

        <div className={"flex justify-between items-center px-10"}>
          <NavItem
            name="Login"
            Icon={CircleUserRound}
            Icon2={ChevronDown}
            to="/login"
            popover={<LoginPopover />}
          />
          <NavItem
            name="More"
            Icon2={ChevronDown}
            to="/more"
            popover={<MorePopover />}
          />
          <NavItem
            name="Cart"
            Icon={ShoppingCart}
            Icon2={ChevronDown}
            to="/cart"
            popover={<CartPopover />}
          />
        </div>
      </div>
    </div>
  );
}
