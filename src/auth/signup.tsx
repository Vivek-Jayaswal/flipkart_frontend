import { useState } from "react";
import { Input } from "../components/reusable.tsx/input";
import { Button } from "../components/reusable.tsx/button";
import { Link, useNavigate } from "react-router-dom";

export function Signup() {
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleBacktoLogin = () => {
    navigate("/login");
  };
  return (
    <div className="h-[70%] w-full">
      <div className="w-[80%] m-auto h-full grid grid-cols-[1.3fr_2fr] shadow-[0px_0px_5px_#e5e7eb] mt-4">
        <div className="flex flex-col items-start justify-between bg-blue-500 px-6 py-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-white">
              Looks like you're <br /> new here!
            </h2>
            <p className="text-gray-300 text-lg pt-4">
              Sign up with your Gmail Id to get started
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
        <div className="p-6 px-10 w-full flex flex-col text-gr justify-between items-start">
          <div className="pt-10 flex flex-col items-start w-full gap-10">
            <div className="relative w-full">
              <Input
                id="login-input"
                value={input}
                onChange={handleInputChange}
                className="peer w-full border-b outline-none"
              />
              <label
                htmlFor="login-input"
                className="peer-focus:-top-4 text-gray-400 absolute top-2 left-0 transition-all"
              >
                Enter Email
              </label>
            </div>
            <div className="w-full">
              <p className="text-xs font-medium text-gray-400">
                By continuing, you agree to Flipkart's clone{" "}
                <span className="text-blue-500">Terms of Use</span> and{" "}
                <span className="text-blue-500">Privacy Policy.</span>
              </p>
              <Button className="mt-4 px-4 py-2 w-full bg-[#FB641B] border-none text-white font-bold rounded-none">
                Login
              </Button>
              <Button
                onClick={handleBacktoLogin}
                className="px-4 py-2 w-full bg-white text-blue-500 shadow-[0px_0px_10px_#e5e7eb] border-none mt-4 font-bold rounded-none"
              >
                Back to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
