import { NavLink } from "react-router-dom";
import { Button } from "../../../shared/reusable/button";
import { NavItem } from "../nav-item";
import { ChevronDown, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { SellerLogin } from "../../../auth/seller-auth/login";

const SellerNavbar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <nav className="w-full flex justify-between items-center py-4 border-b border-gray-100 sticky top-0 bg-white">
      <div className="flex items-center gap-2 space-x-8">
        <div className="flex items-center gap-2">
          <ShoppingBag className="text-green-600" />
          <div>
            <h2 className="font-bold text-xl">ShopHub</h2>
            <p className="text-xs text-gray-500">Marketplace</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <NavItem
            name="Sell Online"
            to="/seller/selling"
            Icon2={ChevronDown}
          />
          <NavItem name="Learn" to="/seller/learn" Icon2={ChevronDown} />
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
