export function CartPopover() {
  return (
    <div className="absolute top-full -right-4 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
      <p className="text-sm font-medium">Your Cart is empty</p>
      <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded">
        Shop Now
      </button>
    </div>
  );
}
