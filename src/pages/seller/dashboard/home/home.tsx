// export const DashboarLayout = () => {
//   return <div>main dashboard</div>;
// };

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function HomePage() {
  const salesData = [
    { date: "16 May", sales: 3.8, orders: 2.6 },
    { date: "17 May", sales: 3.5, orders: 2.5 },
    { date: "18 May", sales: 4.9, orders: 3.9 },
    { date: "19 May", sales: 6.8, orders: 5.6 },
    { date: "20 May", sales: 4.5, orders: 3.3 },
    { date: "21 May", sales: 5.2, orders: 4.1 },
    { date: "22 May", sales: 6.3, orders: 5.1 },
  ];

  const stats = [
    {
      title: "Total Orders",
      value: "1,248",
      growth: "+12.5%",
      icon: "📦",
    },
    {
      title: "Total Sales",
      value: "₹ 18,76,890",
      growth: "+15.3%",
      icon: "💰",
    },
    {
      title: "Units Sold",
      value: "1,585",
      growth: "+10.8%",
      icon: "📊",
    },
    {
      title: "Conversion Rate",
      value: "3.65%",
      growth: "+0.6%",
      icon: "📈",
    },
    {
      title: "Seller Rating",
      value: "4.6",
      growth: "+0.2",
      icon: "⭐",
    },
  ];

  const sidebarItems = [
    "Home",
    "Listings",
    "Orders",
    "Returns",
    "Payments",
    "Payouts",
    "Reports",
    "Advertising",
    "Growth",
    "Inventory",
    "Pricing",
    "Quality",
    "Support",
    "Settings",
  ];

  return (
    <div className="flex min-h-screen bg-[#f5f6fa] text-gray-800">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
            {stats.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-xl">
                    {item.icon}
                  </div>
                </div>

                <p className="text-sm text-gray-500">{item.title}</p>
                <h3 className="mt-1 text-2xl font-bold">{item.value}</h3>

                <p className="mt-2 text-sm text-green-600">
                  ▲ {item.growth} vs last 7 days
                </p>
              </div>
            ))}
          </div>

          {/* Charts + Right Sidebar */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Sales Overview */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm xl:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold">Sales Overview</h3>
                <button className="text-sm font-medium text-blue-600">
                  View Report
                </button>
              </div>

              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />

                    <XAxis dataKey="date" />
                    <YAxis />

                    <Tooltip />
                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 7 }}
                      name="Sales (₹)"
                    />

                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#93c5fd"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      name="Orders"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Panels */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-lg font-bold">Orders to Ship</h3>
                  <button className="text-sm text-blue-600">View all</button>
                </div>

                <div className="space-y-4">
                  {[
                    ["New Orders", "24"],
                    ["Orders to Ship", "18"],
                    ["Orders to be Picked Up", "7"],
                  ].map(([title, value]) => (
                    <div
                      key={title}
                      className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
                    >
                      <p className="text-sm font-medium">{title}</p>
                      <span className="font-bold text-blue-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-lg font-bold">Notifications</h3>
                  <button className="text-sm text-blue-600">View all</button>
                </div>

                <div className="space-y-4">
                  {[
                    ["New Returns Received", "12"],
                    ["Out of Stock Listings", "8"],
                    ["Low Stock Alerts", "15"],
                  ].map(([title, count]) => (
                    <div
                      key={title}
                      className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-none"
                    >
                      <div>
                        <p className="font-medium">{title}</p>
                        <p className="text-sm text-gray-500">Action required</p>
                      </div>

                      <div className="rounded-lg bg-red-50 px-3 py-1 text-sm font-semibold text-red-500">
                        {count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold">Payments Overview</h3>
                  <button className="text-sm text-blue-600">View all</button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Next Payout</p>
                    <h4 className="mt-1 text-3xl font-bold text-green-600">
                      ₹ 2,34,567
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Expected by 24 May 2024
                    </p>
                  </div>

                  <div className="text-4xl">🏦</div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Insights */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold">Business Insights</h3>
              <button className="text-sm text-blue-600">
                View all Insights
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="rounded-2xl bg-green-50 p-5">
                <h4 className="text-lg font-bold text-green-700">
                  High Demand
                </h4>
                <p className="mt-2 text-gray-700">
                  Wireless earbuds category is trending.
                </p>
                <button className="mt-4 font-medium text-blue-600">
                  Upload more listings →
                </button>
              </div>

              <div className="rounded-2xl bg-blue-50 p-5">
                <h4 className="text-lg font-bold text-blue-700">Boost Sales</h4>
                <p className="mt-2 text-gray-700">
                  Boost your sales by running ads.
                </p>
                <button className="mt-4 font-medium text-blue-600">
                  Create Ad →
                </button>
              </div>

              <div className="rounded-2xl bg-yellow-50 p-5">
                <h4 className="text-lg font-bold text-yellow-700">
                  Improve Ratings
                </h4>
                <p className="mt-2 text-gray-700">
                  You have 3 low rating products.
                </p>
                <button className="mt-4 font-medium text-blue-600">
                  Improve Now →
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-xl font-bold">Quick Actions</h3>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-7">
              {[
                "Add Listing",
                "Manage Listings",
                "Process Returns",
                "Advertise Now",
                "View Reports",
                "Seller Learning",
                "Support",
              ].map((action) => (
                <button
                  key={action}
                  className="rounded-2xl border border-gray-200 p-5 text-center font-medium transition-all hover:border-blue-500 hover:bg-blue-50"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
