import {
  ChevronDown,
  ChevronRight,
  Handbag,
  Home,
  RefreshCw,
  Tag,
} from "lucide-react";
import { NavItem } from "../nav-item";
import { Button } from "../../reusable/button";
import { useReducer } from "react";
import { useLocation } from "react-router-dom";

const sidebarItems = [
  { name: "Home", path: "." },
  { name: "Listings", path: "listing" },
  { name: "Orders", path: "order" },
  { name: "Returns", path: "return" },
  { name: "Payments", path: "payments" },
  { name: "Payouts", path: "payouts" },
  { name: "Reports", path: "reports" },
  { name: "Advertising", path: "advertising" },
  { name: "Growth", path: "growth" },
  { name: "Inventory", path: "inventory" },
  { name: "Pricing", path: "pricing" },
  { name: "Quality", path: "quality" },
  { name: "Support", path: "support" },
  { name: "Settings", path: "setting" },
];

type Action = {
  type: "UPDATE_ACTIVE_ROUTE";
  payload: { name: string };
};

type ActiveRouteInitialState = {
  isListingActive: boolean;
  isOrderActive: boolean;
  isReturnActive: boolean;
};
const reducer = (state: ActiveRouteInitialState, action: Action) => {
  switch (action.type) {
    case "UPDATE_ACTIVE_ROUTE": {
      return {
        ...state,
        [action.payload.name]:
          !state[action.payload.name as keyof ActiveRouteInitialState],
      };
    }

    default: {
      return state;
    }
  }
};
const initialState: ActiveRouteInitialState = {
  isListingActive: false,
  isOrderActive: false,
  isReturnActive: false,
};

export const SellerDashboardSideBar = () => {
  const [activeroutes, dispatchActiveRoutes] = useReducer(
    reducer,
    initialState,
  );

  const currentRoute = useLocation();
  console.log(currentRoute.pathname.includes("/seller/dashboard/listing"));

  const handleOnClick = (name: string) => {
    dispatchActiveRoutes({
      type: "UPDATE_ACTIVE_ROUTE",
      payload: { name: name },
    });
  };

  return (
    <div className="h-full overflow-auto border-r border-gray-200 bg-white">
      <aside className="h-full flex flex-col justify-between">
        <div>
          <div className="sticky top-0 z-[999] flex items-center gap-3 border-b border-gray-100 px-6 py-[22px] bg-blue-600 text-white">
            <div className="text-2xl font-bold">🛒</div>
            <div>
              <h1 className="text-lg font-bold">Flipkart</h1>
              <p className="text-xs opacity-80">Seller Hub</p>
            </div>
          </div>

          <nav className="space-y-1 p-4">
            <NavItem
              className={"text-gray-700 py-2"}
              name="Home"
              to="."
              Icon={Home}
              helightWhenActive={true}
            />
            <div>
              <Button
                variant="outline"
                onClick={() => handleOnClick("isListingActive")}
                className={`${currentRoute.pathname.includes("/seller/dashboard/listing") ? "bg-blue-50 rounded-md text-blue-700 font-medium" : ""} border-none cursor-pointer flex items-center justify-between w-full`}
              >
                <div className="flex items-center gap-2">
                  <span>
                    <Tag size={18} />
                  </span>
                  <span>Listing</span>
                </div>
                <div>
                  {activeroutes.isListingActive ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </div>
              </Button>
              {activeroutes.isListingActive && (
                <div className="ml-8 mt-2 transition-all">
                  <NavItem
                    className={"text-gray-700"}
                    name="Create Product"
                    to="listing/create-product"
                    helightWhenActive={true}
                  />
                  <NavItem
                    className={"text-gray-700"}
                    name="Product List"
                    to="listing/product-list"
                    helightWhenActive={true}
                  />
                  <NavItem
                    className={"text-gray-700"}
                    name="Deleted Product"
                    to="listing/deleted-product"
                    helightWhenActive={true}
                  />
                </div>
              )}
            </div>

            <div>
              <Button
                variant="outline"
                onClick={() => handleOnClick("isOrderActive")}
                className={`${currentRoute.pathname.includes("/seller/dashboard/order") ? "bg-blue-50 rounded-md text-blue-700 font-medium" : ""} border-none cursor-pointer flex items-center justify-between w-full`}
              >
                <div className="flex items-center gap-2">
                  <span>
                    <Handbag size={18} />
                  </span>
                  <span>Order</span>
                </div>
                <div>
                  {activeroutes.isOrderActive ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </div>
              </Button>
              {activeroutes.isOrderActive && (
                <div className="ml-8 mt-2 transition-all">
                  <NavItem
                    className={"text-gray-700"}
                    name="Created Order"
                    to="order/created-order"
                    helightWhenActive={true}
                  />
                  <NavItem
                    className={"text-gray-700"}
                    name="Order List"
                    to="order/order-list"
                    helightWhenActive={true}
                  />
                </div>
              )}
            </div>

            <div>
              <Button
                variant="outline"
                onClick={() => handleOnClick("isReturnActive")}
                className={`${currentRoute.pathname.includes("/seller/dashboard/return") ? "bg-blue-50 rounded-md text-blue-700 font-medium" : ""} border-none cursor-pointer flex items-center justify-between w-full`}
              >
                <div className="flex items-center gap-2">
                  <span>
                    <RefreshCw size={18} />
                  </span>
                  <span>Return</span>
                </div>
                <div>
                  {activeroutes.isReturnActive ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </div>
              </Button>
              {activeroutes.isReturnActive && (
                <div className="ml-8 mt-2 transition-all">
                  <NavItem
                    className={"text-gray-700"}
                    name="Return Product"
                    to="listing/create-product"
                    helightWhenActive={true}
                  />
                  <NavItem
                    className={"text-gray-700"}
                    name="Product List"
                    to="listing/product-list"
                    helightWhenActive={true}
                  />
                  <NavItem
                    className={"text-gray-700"}
                    name="Deleted Product"
                    to="listing/deleted-product"
                    helightWhenActive={true}
                  />
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="m-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <h3 className="font-semibold text-blue-700">
            Flipkart Seller Learning Center
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Learn and grow your business.
          </p>
        </div>
      </aside>
    </div>
  );
};
