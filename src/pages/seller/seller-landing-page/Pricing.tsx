const Pricing = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl font-bold">Transparent Pricing</h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="font-bold">Basic Plan</h3>

            <div className="text-5xl font-bold mt-4">5%</div>

            <p className="text-gray-500">Commission</p>
          </div>

          <div className="bg-white border-2 border-green-600 p-8 rounded-xl shadow">
            <h3 className="font-bold">Premium Plan</h3>

            <div className="text-5xl font-bold mt-4">3%</div>

            <p className="text-gray-500">Commission</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="font-bold">No Hidden Fees</h3>

            <p className="text-gray-500 mt-3">What you see is what you pay.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
