import { ShoppingBag } from "lucide-react";

const Navbar = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShoppingBag className="text-green-600" />
          <div>
            <h2 className="font-bold text-xl">ShopHub</h2>
            <p className="text-xs text-gray-500">Marketplace</p>
          </div>
        </div>

        <nav className="hidden lg:flex gap-10 text-gray-700">
          <a href="/">Home</a>
          <a href="/">Categories</a>
          <a href="/">Deals</a>
          <a href="/">About Us</a>
          <a href="/">Help Center</a>
        </nav>

        <div className="flex gap-3">
          <button className="px-5 py-2 border rounded-lg">Login</button>

          <button className="px-5 py-2 bg-green-600 text-white rounded-lg">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
