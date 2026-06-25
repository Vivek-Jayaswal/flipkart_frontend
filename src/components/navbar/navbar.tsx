import { Input } from "../../shared/reusable/input";
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
import { useState } from "react";
import { Button } from "../../shared/reusable/button";
import { useSelector } from "react-redux";
import { RootState } from "../../feature/store";

export function NavBar() {
  const [input, setInput] = useState<string>("");
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const { totalItem } = useSelector((state: RootState) => state.cart);

  return (
    <div className="sticky top-0 left-0 bg-white z-[999]">
      <TopBar />
      <div className="border-b border-gray-200 w-full grid grid-cols-[3fr_1.3fr] py-4">
        <div className="relative">
          <Input
            className="pl-10 focus:outline-none pr-4 w-full rounded border border-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
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

          <div
            className="relative"
            onMouseEnter={() => setIsShowMore(true)}
            onMouseLeave={() => setIsShowMore(false)}
          >
            <Button
              type="button"
              variant="outline"
              className="border-none hover:bg-transparent flex items-center gap-1"
            >
              More <ChevronDown size={16} />
            </Button>
            {isShowMore && <MorePopover />}
          </div>

          <NavItem
            name="Cart"
            Icon={ShoppingCart}
            to="/cart"
            totalCount={totalItem}
          />
        </div>
      </div>
    </div>
  );
}
