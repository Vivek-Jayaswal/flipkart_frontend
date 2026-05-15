export const SellerDashboardNavbar = () => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-blue-600 px-8 py-4 text-white">
      <div>
        <h2 className="text-2xl font-bold">Welcome back, Seller Name 👋</h2>
        <p className="text-sm opacity-90">
          Here's what's happening with your business today.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20">
          Download App
        </button>

        <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-2">
          <div className="h-10 w-10 rounded-full bg-white/20" />
          <div>
            <p className="text-sm font-semibold">Seller Name</p>
            <p className="text-xs opacity-80">Seller ID: FS123456</p>
          </div>
        </div>
      </div>
    </header>
  );
};
