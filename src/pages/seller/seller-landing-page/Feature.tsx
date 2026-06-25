import {
  Users,
  TrendingUp,
  Package,
  PieChart,
  ShieldCheck,
} from "lucide-react";

const items = [
  {
    title: "Reach More Customers",
    icon: Users,
    desc: "Access a growing marketplace audience.",
  },
  {
    title: "Increase Revenue",
    icon: TrendingUp,
    desc: "Sell your products 24/7.",
  },
  {
    title: "Easy Order Management",
    icon: Package,
    desc: "Manage inventory and returns.",
  },
  {
    title: "Business Analytics",
    icon: PieChart,
    desc: "Track sales and customer insights.",
  },
  {
    title: "Secure Payments",
    icon: ShieldCheck,
    desc: "Fast and reliable payouts.",
  },
];

const Features = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center">Why Sell With Us?</h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 mt-16">
          {items.map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <item.icon className="text-green-600" />
              </div>

              <h3 className="font-semibold mt-5">{item.title}</h3>

              <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
