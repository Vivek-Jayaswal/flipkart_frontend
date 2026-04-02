import { useRef } from "react";
import { Button } from "../components/reusable.tsx/button";

type ParentProps = {
  handleNextStep: (s: "one" | "two" | "three") => void;
  handleBacktoLogin?: () => void;
  step?: "one" | "two" | "three";
};

export const VerifyOtp = ({ handleNextStep }: ParentProps) => {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="w-full p-10 flex flex-col items-center justify-center">
      <div className="flex items-center flex-col text-gray-700 mb-6">
        <p>Please enter the OTP sent to</p>
        <div className="flex items-center gap-2">
          <p className="font-semibold">9850556558</p>.{" "}
          <Button
            onClick={() => handleNextStep("one")}
            className="text-blue-600 cursor-pointer"
          >
            Change
          </Button>
        </div>
      </div>

      {/* OTP Inputs */}
      <div className="flex gap-3 mb-6">
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            // ref={(el) => (inputs.current[i] = el)}
            onChange={(e) => handleChange(e.target.value, i)}
            className="w-10 h-12 text-center border-b-2 border-gray-400 focus:border-blue-600 outline-none text-lg"
          />
        ))}
      </div>

      <Button
        onClick={() => handleNextStep("three")}
        className="w-full bg-blue-600 text-white py-3 rounded shadow hover:bg-blue-700 transition"
      >
        Verify
      </Button>

      {/* Resend */}
      <div className="text-gray-500 text-sm mt-4 text-center">
        Not received your code?{" "}
        <Button className="text-blue-600 cursor-pointer">Resend code</Button>
      </div>
    </div>
  );
};
