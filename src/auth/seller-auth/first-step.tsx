import React, { useState, type SetStateAction } from "react";
import { FloatingInput } from "../../components/reusable/floating-input";
import { Button } from "../../components/reusable/button";

type Props = {
  handleNextStep: React.Dispatch<SetStateAction<"first" | "second">>;
  step?: string;
  handleStepCompleted: React.Dispatch<SetStateAction<string[]>>;
};

export const SellerFirstStepData = ({
  handleNextStep,
  step,
  handleStepCompleted,
}: Props) => {
  const [state, setFormData] = useState({
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-4">
      <FloatingInput
        className="border rounded px-4"
        label="Enter Email"
        id="df"
        isBgLable={true}
        value={state.email}
        onChange={handleOnChange}
        name="email"
      />
      <FloatingInput
        isBgLable={true}
        className="border rounded px-4"
        label="Enter Mobile Number"
        id="df"
        value={state.mobile}
        name="mobile"
        onChange={handleOnChange}
      />
      <FloatingInput
        isBgLable={true}
        className="border rounded px-4"
        label="Create Password"
        id="df"
        value={state.password}
        name="password"
        onChange={handleOnChange}
      />
      <FloatingInput
        className="border rounded px-4"
        isBgLable={true}
        label="Confirm Password"
        id="df"
        name="confirmPassword"
        value={state.confirmPassword}
        onChange={handleOnChange}
      />

      <Button variant="outline" onClick={() => handleNextStep("second")}>
        Next
      </Button>
    </div>
  );
};
