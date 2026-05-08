import { NavLink } from "react-router-dom";
import { Button } from "../../reusable/button";
import { NavItem } from "../nav-item";
import { ChevronDown } from "lucide-react";
import SellingPopover from "./selling-popover";
import { LearnPopover } from "./learn-popover";
import { useState } from "react";
import { SellerLogin } from "../../../auth/seller-auth/login";

const SellerNavbar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

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
        <Button
          variant="outline"
          className="border-none"
          onClick={() => setIsLogin(true)}
        >
          login
        </Button>
        <NavLink to={"/seller/signup"}>
          <Button variant="outline" className="bg-amber-400 rounded-none">
            Start Selling
          </Button>
        </NavLink>
      </div>
      {isLogin && <SellerLogin isLogin={isLogin} setIsLogin={setIsLogin} />}
    </nav>
  );
};

export default SellerNavbar;
