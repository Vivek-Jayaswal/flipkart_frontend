import { useState } from "react";
import { Input } from "../components/reusable/input";
import { Button } from "../components/reusable/button";
import { useNavigate } from "react-router-dom";
import { VerifyOtp } from "./verify-otp";
import { RegisterDetails } from "./register-details";
import { validateEmail } from "../utils/email-validator";
import { sendRegistrationRequest } from "../services/mutation/registration";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export function Signup() {
  const [input, setInput] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [step, setStep] = useState<"one" | "two" | "three">("one");
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsValidEmail(validateEmail(e.target.value));
    setError("");
  };

  const handleNextStep = (s: "one" | "two" | "three") => {
    setStep(s);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (d: string) => d,
    onSuccess: () => {
      toast.success("OTP sent successfully to your email!");
      setStep("two");
    },
  });

  const handleSendOtp = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) {
      setError("Email is required");
      return;
    }

    if (!isValidEmail) {
      setError("Please enter a valid email");
      return;
    }

    mutate(input);
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

        {step === "one" && (
          <form
            action=""
            onSubmit={handleSendOtp}
            className="p-6 px-10 pt-10 flex flex-col items-start w-full gap-10"
          >
            <div className="relative w-full">
              <Input
                id="login-input"
                value={input}
                onChange={handleInputChange}
                className="peer w-full border-b border-gray-400 outline-none"
              />
              <label
                htmlFor="login-input"
                className={`${input ? "-top-4" : "top-2"} absolute peer-focus:-top-4 text-gray-400 left-0 transition-all`}
              >
                Enter Email
              </label>
              {!isValidEmail && (
                <p className="text-red-500 text-xs mt-1">
                  Please enter a valid email
                </p>
              )}
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <div className="w-full">
              <p className="text-xs font-medium text-gray-400">
                By continuing, you agree to Flipkart's clone{" "}
                <span className="text-blue-500">Terms of Use</span> and{" "}
                <span className="text-blue-500">Privacy Policy.</span>
              </p>
              <Button
                disabled={isPending}
                className={`${isPending ? "opacity-50 cursor-not-allowed" : ""} mt-4 px-4 py-2 w-full bg-[#FB641B] border-none text-white font-bold rounded-none`}
              >
                {isPending ? "Sending OTP..." : "Continue"}
              </Button>
              <Button
                onClick={handleBacktoLogin}
                className="px-4 py-2 w-full bg-white text-blue-500 hover:bg-transparent shadow-[0px_0px_10px_#e5e7eb] border-none mt-4 font-bold rounded-none"
                variant="outline"
              >
                Back to Login
              </Button>
            </div>
          </form>
        )}

        {step === "two" && (
          <div className="p-6 px-10 w-full flex flex-col text-gr justify-between items-start">
            <VerifyOtp
              handleNextStep={handleNextStep}
              step={step}
              gmail={input}
            />
          </div>
        )}

        {step === "three" && (
          <div className="p-6 px-10 w-full flex flex-col text-gr justify-between items-start">
            <RegisterDetails handleNextStep={handleNextStep} gmail={input} />
          </div>
        )}
      </div>
    </div>
  );
}
