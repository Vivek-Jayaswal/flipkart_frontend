import React, { type SetStateAction } from "react";
import { FloatingInput } from "../../components/reusable/floating-input";
import { Button } from "../../components/reusable/button";
import type { Action } from "./signup";
import type { SignupFormType } from "../../types/seller/signup";

type Props = {
  handleNextStep: React.Dispatch<SetStateAction<"first" | "second">>;
  step?: string;
  dispatch: React.Dispatch<Action>;
  state: SignupFormType;
  handleStepCompleted?: React.Dispatch<SetStateAction<string[]>>;
};

export const SellerFirstStepData = ({
  handleNextStep,
  state,
  dispatch,
}: Props) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    dispatch({
      type: "INPUT_TEXT",
      payload: {
        name: name,
        value: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      <FloatingInput
        className="border rounded px-4"
        label="Enter Email"
        id="df"
        isBgLable={true}
        value={state.formData.email}
        onChange={handleOnChange}
        name="email"
      />
      <FloatingInput
        isBgLable={true}
        className="border rounded px-4"
        label="Enter Mobile Number"
        id="df"
        value={state.formData.mobile}
        name="mobile"
        onChange={handleOnChange}
      />
      <FloatingInput
        isBgLable={true}
        className="border rounded px-4"
        label="Create Password"
        id="df"
        value={state.formData.password}
        name="password"
        onChange={handleOnChange}
      />
      <FloatingInput
        className="border rounded px-4"
        isBgLable={true}
        label="Confirm Password"
        id="df"
        name="confirmPassword"
        value={state.formData.confirmPassword}
        onChange={handleOnChange}
      />

      <Button variant="outline" onClick={() => handleNextStep("second")}>
        Next
      </Button>
    </div>
  );
};
