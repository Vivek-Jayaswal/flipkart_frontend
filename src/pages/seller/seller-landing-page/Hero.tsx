import {
  ShieldCheck,
  CircleDollarSign,
  Headphones
} from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-white to-green-50">
      <div className="container mx-auto px-6 py-20 grid lg:grid-cols-2 gap-10 items-center">

        <div>
          <h1 className="text-6xl font-bold leading-tight">
            Start Selling Online &
            <span className="block text-green-600">
              Grow Your Business
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-lg">
            Join thousands of sellers reaching customers across
            the country. Set up your store in minutes and start
            earning today.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-green-600 text-white px-8 py-4 rounded-xl">
              Become a Seller
            </button>

            <button className="border px-8 py-4 rounded-xl">
              Learn More
            </button>
          </div>

          <div className="flex gap-10 mt-12">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} />
              Easy Setup
            </div>

            <div className="flex items-center gap-2">
              <CircleDollarSign size={20} />
              Secure Payments
            </div>

            <div className="flex items-center gap-2">
              <Headphones size={20} />
              Support
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6">
          <img
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
            alt=""
            className="rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;