import { useEffect, useState } from "react";
import { Button } from "../components/reusable.tsx/button";
import { FloatingInput } from "../components/reusable.tsx/floating-input";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import type { RegisterUserType } from "../types/auth-type";
import { RegisterUserRequest } from "../services/mutation/registration";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type ParentProps = {
  handleNextStep: (s: "one" | "two" | "three") => void;
  gmail: string;
};

export const RegisterDetails = ({ handleNextStep, gmail }: ParentProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterUserType>({
    role: "buyer",
    name: "",
    mobile: "",
    address: "",
    password: "",
    gmail: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegisterUserType) => {
      return await RegisterUserRequest(data);
    },
    onSuccess: () => {
      toast.success("User Created Successfully");
      navigate("/login");
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const error: Record<string, string> = {};
    const errField = ["name", "mobile", "address", "password"];
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

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    mutate(formData);
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, gmail: gmail }));
  }, [gmail]);

  return (
    <div className="w-full h-full">
      <div className="h-[10%] flex items-center gap-3">
        <Button
          variant="outline"
          className="border p-2 rounded-full hover:bg-[#FB641B]"
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
              id="name"
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleInputChange}
            />

            {errors && errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
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
          disabled={isPending}
          className={`${isPending ? "opacity-50 cursor-none" : ""} mt-auto px-4 py-2 w-full bg-[#FB641B] border-none text-white font-bold rounded-none`}
        >
          {isPending ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
};
