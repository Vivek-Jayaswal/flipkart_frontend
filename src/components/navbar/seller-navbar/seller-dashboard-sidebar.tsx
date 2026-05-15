import { NavLink } from "react-router-dom";

const sidebarItems = [
  { name: "Home", path: "home" },
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

export const SellerDashboardSideBar = () => {
  return (
    <div className="h-full overflow-auto border-r border-gray-200 bg-white">
      <aside className="flex flex-col justify-between">
        <div>
          <div className="sticky top-0 z-[999] flex items-center gap-3 border-b border-gray-100 px-6 py-[22px] bg-blue-600 text-white">
            <div className="text-2xl font-bold">🛒</div>
            <div>
              <h1 className="text-lg font-bold">Flipkart</h1>
              <p className="text-xs opacity-80">Seller Hub</p>
            </div>
          </div>

          <nav className="space-y-1 p-4">
            {sidebarItems.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={({ isActive }) =>
                  `flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <span>{item.name}</span>
                {index !== 0 && <span>›</span>}
              </NavLink>
            ))}
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
