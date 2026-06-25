const CTA = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">

        <div className="bg-green-600 text-white rounded-2xl p-10 flex flex-col md:flex-row justify-between items-center">

          <div>
            <h2 className="text-4xl font-bold">
              Ready to Start Selling?
            </h2>

            <p className="mt-2 text-green-100">
              Join our marketplace and grow your business.
            </p>
          </div>

          <div className="flex gap-4 mt-6 md:mt-0">
            <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold">
              Become Seller
            </button>

            <button className="border border-white px-6 py-3 rounded-lg">
              Contact Sales
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTA;