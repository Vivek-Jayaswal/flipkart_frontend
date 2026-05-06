import React, { useEffect, type SetStateAction } from "react";
import { FloatingInput } from "../../components/reusable/floating-input";
import { Button } from "../../components/reusable/button";
import type { Action } from "./signup";
import type { SignupFormType } from "../../types/seller/signup";

type Props = {
  handleNextStep: React.Dispatch<SetStateAction<"first" | "second">>;
  handleStepCompleted?: React.Dispatch<SetStateAction<string[]>>;
  dispatch: React.Dispatch<Action>;
  state: SignupFormType;
};

export const SellerSecondStepData = ({
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

  useEffect(() => {
    // const
  }, [state]);

  return (
    <div className="space-y-4">
      <form action="" className="space-y-4">
        <FloatingInput
          className="border rounded px-4"
          label="Enter Business Name"
          id="businessName"
          isBgLable={true}
          value={state.formData.businessName}
          onChange={handleOnChange}
          name="businessName"
        />
        <FloatingInput
          isBgLable={true}
          className="border rounded px-4"
          label="Enter Store Name"
          id="storeName"
          value={state.formData.storeName}
          name="storeName"
          onChange={handleOnChange}
        />
        <FloatingInput
          isBgLable={true}
          className="border rounded px-4"
          label="Enter Business Type"
          id="businessType"
          value={state.formData.businessType}
          name="businessType"
          onChange={handleOnChange}
        />
        <FloatingInput
          className="border rounded px-4"
          isBgLable={true}
          label="Enter Tax Details"
          id="taxDetails"
          name="taxDetails"
          value={state.formData.taxDetails}
          onChange={handleOnChange}
        />
        <FloatingInput
          className="border rounded px-4"
          isBgLable={true}
          label="Enter Store Address"
          id="storeAddress"
          name="storeAddress"
          value={state.formData.storeAddress}
          onChange={handleOnChange}
        />
        <FloatingInput
          className="border rounded px-4"
          isBgLable={true}
          label="Enter Bank Details"
          id="bankDetails"
          name="bankDetails"
          value={state.formData.bankDetails}
          onChange={handleOnChange}
        />
        <FloatingInput
          className="border rounded px-4"
          isBgLable={true}
          label="Enter Address"
          id="address"
          name="address"
          value={state.formData.address}
          onChange={handleOnChange}
        />

        <div className="space-x-4">
          <Button variant="outline" onClick={() => handleNextStep("first")}>
            Back
          </Button>
          <Button variant="outline">Submit</Button>
        </div>
      </form>
    </div>
  );
};
