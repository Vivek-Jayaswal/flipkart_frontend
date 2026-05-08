import { CircleCheckBig } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../types/store/store";

export const StepProgressBar = () => {
  const { sellerData, token } = useSelector(
    (state: RootState) => state?.sellerAuth,
  );

  return (
    <div className="flex items-center gap-6 py-4">
      <div
        className={`flex items-center gap-3 ${sellerData && token ? "text-green-500" : ""}`}
      >
        <CircleCheckBig size={20} />
        <h1 className="text-sm font-medium">EMAIL & PASSWORD</h1>
      </div>
      <div
        className={`w-20 border-b-2 ${sellerData && token ? "text-green-500" : ""}`}
      ></div>
      <div className="flex items-center gap-3">
        <CircleCheckBig size={20} />
        <h1 className="text-sm font-medium">BUSINESS DETAILS</h1>
      </div>
    </div>
  );
};
