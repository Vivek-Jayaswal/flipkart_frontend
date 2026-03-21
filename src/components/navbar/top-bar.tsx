import { MapPin, ChevronRight, Plane } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full flex items-center justify-between pt-3">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Flipkart Button */}
        <div className="flex items-center gap-2 bg-yellow-300 px-5 py-2 rounded-xl font-semibold">
          <span className="text-blue-700 font-bold">f</span>
          <span>Flipkart</span>
        </div>

        {/* Travel Button */}
        <div className="flex items-center gap-2 bg-gray-200 px-5 py-2 rounded-xl text-gray-700">
          <span>
            <Plane size={18} className="text-orange-500" />
          </span>
          <span>Travel</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 text-sm">
        <MapPin size={16} className="font-bold text-gray-600" />
        <span className="text-gray-700 font-medium">Location not set</span>
        <button className="flex items-center gap-1 text-blue-600 font-medium">
          Select delivery location
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
