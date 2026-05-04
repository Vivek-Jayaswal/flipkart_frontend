import { NavLink } from "react-router-dom";
import { Button } from "../../reusable/button";
import { NavItem } from "../nav-item";
import { ChevronDown } from "lucide-react";
import SellingPopover from "./selling-popover";
import { LearnPopover } from "./learn-popover";

const SellerNavbar = () => {
  return (
    <nav className="w-full flex justify-between items-center py-4 border-b border-gray-100">
      <div className="flex items-center gap-2 space-x-8">
        <div>logo</div>
        <div className="flex items-center space-x-4">
          <NavItem
            name="Sell Online"
            to="/seller/selling"
            Icon2={ChevronDown}
            popover={<SellingPopover />}
          />
          <NavItem
            name="Learn"
            to="/seller/learn"
            Icon2={ChevronDown}
            popover={<LearnPopover />}
          />
          <NavItem name="Shopeasy" to="/seller/shopeasy" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <NavLink to={"/seller/login"}>login</NavLink>
        <NavLink to={"/seller/signup"}>
          <Button variant="outline" className="bg-amber-400 rounded-none">
            Start Selling
          </Button>
        </NavLink>
      </div>
    </nav>
  );
};

export default SellerNavbar;
