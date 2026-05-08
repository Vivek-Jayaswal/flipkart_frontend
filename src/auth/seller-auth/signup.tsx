import { SellerFirstStepData } from "./first-step";
import { useEffect, useReducer, useState } from "react";
import type { SignupFormType } from "../../types/seller/signup";
import { StepProgressBar } from "../../components/reusable/step-progressbar";

export type Action =
  | {
      type: "INPUT_TEXT";
      payload: { name: string; value: string | string | number | boolean };
    }
  | { type: "RESET_FORM" }
  | { type: "ERROR"; payload: Record<string, string> };

function reducer(state: SignupFormType, action: Action) {
  switch (action.type) {
    case "INPUT_TEXT":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.name]: action.payload.value,
        },
        formError: {
          ...state.formError,
          [action.payload.name]: "",
        },
      };

    case "ERROR":
      return {
        ...state,
        formError: {
          ...state.formError,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

const inititaState: SignupFormType = {
  formData: {
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    isEmailVerified: false,
  },
  formError: {},
};

export const SellerSignup = () => {
  const [isFirstStepCompleted, setIsFirstStepCompleted] = useState<boolean>();
  const [state, dispatch] = useReducer(reducer, inititaState);

  useEffect(() => {
    const savedData = sessionStorage.getItem("isFirstStepCompleted");

    if (savedData) {
      setIsFirstStepCompleted(savedData === "true");
    }
  }, [sessionStorage.getItem("isFirstStepCompleted")]);

  return (
    <div className="w-[70%] m-auto">
      <StepProgressBar />
      <div>
        <SellerFirstStepData dispatch={dispatch} state={state} />
      </div>
    </div>
  );
};
