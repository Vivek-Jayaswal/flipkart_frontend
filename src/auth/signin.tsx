import React, { useEffect, useState } from "react";
import { Button } from "../shared/reusable/button";
import { Link, useNavigate } from "react-router-dom";
import type { LoginType } from "../types/navbar";
import { FloatingInput } from "../shared/reusable/floating-input";
import { Eye, EyeOff } from "lucide-react";
import { validateEmail } from "../utils/email-validator";
import { useMutation } from "@tanstack/react-query";
import { sendUserLogin } from "../services/mutation/login";
import { toast } from "react-toastify";
import { loginUser } from "../feature/authSlice/authSlice";
import { useDispatch } from "react-redux";

export type LoginPayload = { gmail: string; passward: string; role: string };

export function Login({ role }: { role: "buyer" | "seller" | "admin" }) {
  const [formData, setFormData] = useState<LoginType>({
    gmail: "",
    password: "",
    role: "buyer",
  });
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password",
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<Record<string, string>>({});
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginPayload) => sendUserLogin(data),
    onSuccess: (res) => {
      if (res.role === "buyer") {
        dispatch(loginUser(res));
      }
      if (res.role === "admin") {
      }
      toast.success("Login Successfully");
      navigate("/");
    },
  });

  console.log(formData);

  const handleTogglePassword = () => {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    if (e.target.name === "gmail") {
      setIsValidEmail(validateEmail(e.target.value));
    }
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateForm = () => {
    const errField = ["gmail", "password"];
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
    const data: LoginPayload = {
      gmail: formData.gmail,
      passward: formData.password,
      role: formData.role,
    };
    mutate(data);
  };

  useEffect(() => {
    if (role) {
      setFormData((prev) => ({ ...prev, role: role }));
    }
  }, [role]);

  return (
    <div className="h-[70%] w-full">
      <div className="w-[80%] m-auto h-full grid grid-cols-[1.3fr_2fr] bg-white shadow-[0px_0px_5px_#e5e7eb] mt-4">
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
            <div className="w-full">
              <FloatingInput
                label="Enter Gmail"
                id="login-input"
                name="gmail"
                placeholder=""
                value={formData.gmail}
                onChange={handleInputChange}
                className="peer w-full border-b outline-none"
              />
              {!isValidEmail && (
                <p className="text-red-500 text-xs mt-1">
                  Please enter a valid email
                </p>
              )}
              {error.gmail && (
                <p className="text-red-500 text-xs mt-1">{error.gmail}</p>
              )}
            </div>

            <div className="w-full">
              <FloatingInput
                id="login-password"
                label="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="peer w-full border-b outline-none"
                rightElement={
                  <Button
                    onClick={handleTogglePassword}
                    variant="outline"
                    className="border-none p-0 hover:bg-transparent"
                    type="button"
                  >
                    {passwordType === "password" ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </Button>
                }
                type={passwordType}
              />
              {error.password && (
                <p className="text-red-500 text-xs mt-1">{error.password}</p>
              )}
            </div>

            <div className="w-full">
              <p className="text-xs font-medium text-gray-400">
                By continuing, you agree to Flipkart's clone{" "}
                <span className="text-blue-500">Terms of Use</span> and{" "}
                <span className="text-blue-500">Privacy Policy.</span>
              </p>
              <Button
                type="submit"
                className="mt-4 px-4 py-2 w-full bg-[#FB641B] hover:bg-[#FB641B] border-none text-white font-bold rounded-none"
              >
                {isPending ? "Logging in..." : "Login"}
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
