import React, { useState } from "react";
import { Button } from "../components/reusable.tsx/button";
import { Link } from "react-router-dom";
import type { LoginType } from "../types/navbar";
import { FloatingInput } from "../components/reusable.tsx/floating-input";
import { Eye } from "lucide-react";

export function Login() {
  const [formData, setFormData] = useState<LoginType>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<Record<string, string>>({});

  console.log(formData);
  console.log("err", error);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const errField = ["email", "password"];
    const err: Record<string, string> = {};

    errField.forEach((e) => {
      if (!formData[e as keyof typeof formData]) {
        err[e] = "This field is required";
      }
    });

    if (Object.entries(err).length > 0) {
      setError(err);
      return false;
    }

    return Object.entries(err).length === 0;
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("submitted");
  };

  return (
    <div className="h-[70%] w-full">
      <div className="w-[80%] m-auto h-full grid grid-cols-[1.3fr_2fr] shadow-[0px_0px_5px_#e5e7eb] mt-4">
        <div className="flex flex-col items-start justify-between bg-blue-500 px-6 py-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-white">Login</h2>
            <p className="text-gray-300 text-lg pt-4">
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
        <form
          onSubmit={handleSubmit}
          className="p-6 px-10 w-full flex flex-col text-gr justify-between items-start"
        >
          <div className="pt-10 flex flex-col items-start w-full gap-8">
            <FloatingInput
              label="Enter Email"
              id="login-input"
              name="email"
              placeholder=" "
              value={formData.email}
              onChange={handleInputChange}
              className="peer w-full border-b outline-none"
              RightIcon={Eye}
            />

            <FloatingInput
              id="login-password"
              label="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="peer w-full border-b outline-none"
              RightIcon={Eye}
            />

            <div className="w-full">
              <p className="text-xs font-medium text-gray-400">
                By continuing, you agree to Flipkart's clone{" "}
                <span className="text-blue-500">Terms of Use</span> and{" "}
                <span className="text-blue-500">Privacy Policy.</span>
              </p>
              <Button
                type="submit"
                className="mt-4 px-4 py-2 w-full bg-[#FB641B] border-none text-white font-bold rounded-none"
              >
                Login
              </Button>
            </div>
          </div>

          <div className="w-full flex items-center justify-center mt-auto">
            <Link to={"/signup"} className="text-blue-500 font-semibold">
              New to Flipkart? Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
