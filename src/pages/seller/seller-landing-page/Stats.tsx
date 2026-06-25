const stats = [
  "10,000+ Active Sellers",
  "1 Million+ Customers",
  "₹50 Crore+ Revenue",
  "99% Success Rate",
];

const Stats = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-6">
        <div className="bg-green-600 rounded-2xl text-white grid md:grid-cols-4 p-10">
          {stats.map((item) => (
            <div key={item} className="text-center">
              <h3 className="text-3xl font-bold">{item.split(" ")[0]}</h3>

              <p className="mt-2">{item.replace(item.split(" ")[0], "")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
