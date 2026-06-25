const steps = [
  "Register Seller Account",
  "Create Your Store",
  "Upload Products",
  "Receive Orders",
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl font-bold">How It Works</h2>

        <div className="grid md:grid-cols-4 gap-10 mt-16">
          {steps.map((step, index) => (
            <div key={step} className="text-center">
              <div className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center mx-auto font-bold">
                {index + 1}
              </div>

              <h3 className="font-semibold mt-4">{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
