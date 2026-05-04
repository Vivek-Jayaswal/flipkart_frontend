import { CircleCheckBig } from "lucide-react";
import { SellerFirstStepData } from "./first-step";
import { SellerSecondStepData } from "./second-step";
import { useState } from "react";

export const SellerSignup = () => {
  const [activeFormState, setActiveFormState] = useState<"first" | "second">(
    "first",
  );
  const [stepCompleted, setStepCompleted] = useState<string[]>([]);

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
          <SellerFirstStepData handleNextStep={setActiveFormState} />
        ) : activeFormState === "second" ? (
          <SellerSecondStepData handleNextStep={setActiveFormState} />
        ) : null}
      </div>
    </div>
  );
};
