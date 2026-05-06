import { CircleCheckBig } from "lucide-react";
import { SellerFirstStepData } from "./first-step";
import { SellerSecondStepData } from "./second-step";
import { useReducer, useState } from "react";
import type { SignupFormType } from "../../types/seller/signup";

export type Action =
  | { type: "INPUT_TEXT"; payload: { name: string; value: string } }
  | { type: "RESET_FORM" }
  | { type: "ERROR" };

function reducer(state: SignupFormType, action: Action) {
  switch (action.type) {
    case "INPUT_TEXT":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.name]: action.payload.value,
        },
      };

    case "ERROR":
      return {
        ...state,
      };
    default:
      return state;
  }
}

const inititaState: SignupFormType = {
  formData: {
    email: "",
    name: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    storeName: "",
    businessType: "",
    taxDetails: "",
    storeAddress: "",
    bankDetails: "",
    address: "",
  },
  formError: {},
};

export const SellerSignup = () => {
  const [activeFormState, setActiveFormState] = useState<"first" | "second">(
    "first",
  );
  const [state, dispatch] = useReducer(reducer, inititaState);

  console.log(state);

  return (
    <div className="w-[70%] m-auto">
      <div className="flex items-center gap-6 py-4">
        <div className="flex items-center gap-3">
          <CircleCheckBig size={24} />
          <h1>EMAIL & PASSWORD</h1>
        </div>
        <div className="w-20 border-b-2"></div>
        <div className="flex items-center gap-3">
          <CircleCheckBig size={24} />
          <h1>BUSINESS DETAILS</h1>
        </div>
      </div>

      <div>
        {activeFormState === "first" ? (
          <SellerFirstStepData
            dispatch={dispatch}
            handleNextStep={setActiveFormState}
            state={state}
          />
        ) : activeFormState === "second" ? (
          <SellerSecondStepData
            dispatch={dispatch}
            state={state}
            handleNextStep={setActiveFormState}
          />
        ) : null}
      </div>
    </div>
  );
};
