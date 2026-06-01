import { useRef, useState } from "react";
import { Button } from "./button";
import { toast } from "react-toastify";
import {
  sendOtpRequest,
  verifyOtpRequest,
} from "../../services/mutation/registration";
import { useMutation } from "@tanstack/react-query";

type ParentProps = { gmail: string; role: string; fn?: () => void };

type OtpData = {
  gmail: string;
  otp: string;
  role: string;
};

export const VerifyOtp = ({ gmail, role, fn }: ParentProps) => {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const [otp, setOtp] = useState<string[]>([]);
  const { mutate, isPending } = useMutation({
    mutationFn: async (d: OtpData) => await verifyOtpRequest(d),
    onSuccess: (res) => {
      const storageKey =
        role === "seller"
          ? "sellerAccessToken"
          : role === "buyer"
            ? "buyerAccessToken"
            : "adminAccessToken";
      localStorage.setItem(storageKey, res.token);
      toast.success("OTP verification successfully done");
      fn && fn();
    },
  });
  const { mutate: OTPResend, isPending: resendOtpPending } = useMutation({
    mutationFn: async (d: { gmail: string; role: string }) =>
      await sendOtpRequest(d),
    onSuccess: () => {
      toast.success("OTP Resend successfully in you mail");
    },
  });

  const handleChange = (value: string, index: number) => {
    if (!/^[a-zA-Z0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerifyOtp = async (otpValue: string[]) => {
    if (otpValue.length < 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    if (!gmail) {
      toast.error("Email is missing. Please go back and enter your email.");
      return;
    }

    const otpData: OtpData = {
      gmail: gmail!,
      otp: otpValue.join(""),
      role: role,
    };

    mutate(otpData);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="w-full p-10 flex flex-col space-y-6 items-center justify-center">
      {/* OTP Inputs */}
      <div className="flex gap-3 mb-6">
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onChange={(e) => handleChange(e.target.value, i)}
            className="w-10 h-12 text-center border-b-2 border-gray-400 focus:border-blue-600 outline-none text-lg"
          />
        ))}
      </div>

      <Button
        onClick={() => handleVerifyOtp(otp)}
        disabled={isPending}
        className={`${isPending ? "opacity-50 cursor-none" : ""} w-full bg-blue-600 text-white py-3 rounded shadow hover:bg-blue-700 transition`}
      >
        {isPending ? "Verifying OTP..." : "Verify"}
      </Button>

      {/* Resend */}
      <div className="text-gray-500 text-sm mt-4 text-center">
        Not received your code?{" "}
        <Button
          disabled={resendOtpPending}
          className={`${resendOtpPending ? "opacity-50 cursor-not-allowed" : ""} text-blue-600 cursor-pointer p-0 border-none hover:bg-transparent`}
          variant="outline"
          onClick={() => {
            const d = {
              gmail: gmail,
              role: role,
            };
            OTPResend(d);
          }}
        >
          {resendOtpPending ? "Resending..." : "Resend code"}
        </Button>
      </div>
    </div>
  );
};
