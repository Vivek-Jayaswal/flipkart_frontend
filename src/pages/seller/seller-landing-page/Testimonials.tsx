const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl font-bold">What Our Sellers Say</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-6 rounded-xl border">
              <p className="text-gray-600">
                "Our sales increased dramatically after joining this platform."
              </p>

              <div className="flex items-center gap-4 mt-5">
                <img
                  src={`https://i.pravatar.cc/150?img=${item}`}
                  className="w-12 h-12 rounded-full"
                />

                <div>
                  <h4 className="font-semibold">Seller {item}</h4>
                  <p className="text-sm text-gray-500">Electronics Seller</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
