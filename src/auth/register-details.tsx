import { useState } from "react";
import { Button } from "../components/reusable.tsx/button";
import { FloatingInput } from "../components/reusable.tsx/floating-input";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import type { RegisterUserType } from "../types/auth-type";

type ParentProps = {
  handleNextStep: (s: "one" | "two" | "three") => void;
};

export const RegisterDetails = ({ handleNextStep }: ParentProps) => {
  const [formData, setFormData] = useState<RegisterUserType>({
    user: "seller",
    fullName: "",
    mobile: "",
    address: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [togglePassword, setTogglePassword] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const error: Record<string, string> = {};
    const errField = ["fullName", "mobile", "address", "password"];
    errField.forEach((field) => {
      if (!formData[field as keyof RegisterUserType]) {
        error[field] = "This field is required";
      }
    });

    if (Object.keys(error).length > 0) {
      setErrors(error);
      return false;
    }
    return Object.keys(error).length === 0;
  };

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };

  const handleRegister = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    alert("Registered successfully!");
  };

  console.log(formData);

  return (
    <div className="w-full h-full">
      <div className="h-[10%] flex items-center gap-3">
        <Button
          className="text-blue-600 p-2 rounded-full hover:bg-[#FB641B]"
          onClick={() => handleNextStep("two")}
        >
          <ChevronLeft size={18} />
        </Button>
        <p>Back</p>
      </div>
      <form
        onSubmit={handleRegister}
        className="h-[90%] flex flex-col items-start justify-between space-y-6 pt-10 w-full"
      >
        <div className="w-full space-y-6">
          <div>
            <FloatingInput
              id="fullName"
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
            />

            {errors && errors.fullName && (
              <p className="text-red-500 text-xs">{errors.fullName}</p>
            )}
          </div>

          <div>
            <FloatingInput
              id="mobile"
              name="mobile"
              label="Mobile Number"
              value={formData.mobile}
              onChange={handleInputChange}
            />
            {errors && errors.mobile && (
              <p className="text-red-500 text-xs">{errors.mobile}</p>
            )}
          </div>
          <div>
            <FloatingInput
              id="address"
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors && errors.address && (
              <p className="text-red-500 text-xs">{errors.address}</p>
            )}
          </div>

          <div>
            <FloatingInput
              id="password"
              label="Password"
              name="password"
              type={togglePassword ? "text" : "password"}
              RightIcon={togglePassword ? Eye : EyeOff}
              value={formData.password}
              togglePassword={handleTogglePassword}
              onChange={handleInputChange}
            />
            {errors && errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className="mt-auto px-4 py-2 w-full bg-[#FB641B] border-none text-white font-bold rounded-none"
        >
          Register
        </Button>
      </form>
    </div>
  );
};
