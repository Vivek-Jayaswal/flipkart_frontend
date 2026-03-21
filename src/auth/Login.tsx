import { useState } from "react";
import { Input } from "../components/reusable.tsx/search-input";

export function Login() {
  const [input, setInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <div className="h-[70%] w-full">
      <div className="w-[80%] m-auto h-full grid grid-cols-[1.3fr_2fr] shadow mt-4">
        <div className="flex flex-col items-start justify-between bg-blue-500 p-4">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-white">Login</h2>
            <p className="text-gray-300 text-xl">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <div className="w-full flex items-center">
            <img
              src="/login.png"
              className="w-full h-52 object-contain"
              alt="login img"
            />
          </div>
        </div>
        <div className="p-4">
          <Input
            value=""
            onChange={handleInputChange}
            className="peer w-full border-b outline-none"
          />
          <label></label>
        </div>
      </div>
    </div>
  );
}
