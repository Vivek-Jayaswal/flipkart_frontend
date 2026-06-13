import React, { useReducer } from "react";
import type {
  SellerDetailsPayloadType,
  SellerDetailsSubmissionType,
} from "../../../types/seller/signup";
import { FloatingInput } from "../../../shared/reusable/floating-input";
import { Button } from "../../../shared/reusable/button";
import { StepProgressBar } from "../../../shared/reusable/step-progressbar";
import { Mail, Phone } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../types/store/store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { SellerRegistrationDetailsUpdateRequest } from "../../../services/mutation/registration";
import { useNavigate } from "react-router-dom";
import { completeProfile } from "../../../feature/authSlice/sellerAuthSlice";

export type Action =
  | {
      type: "INPUT_TEXT";
      payload: { name: string; value: string | string | number | boolean };
    }
  | { type: "RESET_FORM" }
  | { type: "ERROR"; payload: Record<string, string> };

function reducer(state: SellerDetailsSubmissionType, action: Action) {
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

const inititaState: SellerDetailsSubmissionType = {
  formData: {
    name: "",
    sellerAddress: "",
    storeName: "",
    storeAddress: "",
    city: "",
    state: "",
    pincode: "",
    businessType: "",
    pan: "",
    gstin: "",
    accountNumber: "",
    ifsc: "",
    bankName: "",
  },
  formError: {},
};

export const SellerDashboard = () => {
  const { data } = useSelector((state: RootState) => state?.sellerAuth);
  const [form, dispatch] = useReducer(reducer, inititaState);
  const navigate = useNavigate();
  const regDispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: async (d: SellerDetailsPayloadType) =>
      await SellerRegistrationDetailsUpdateRequest(d),
    onSuccess(data, variables, onMutateResult) {
      console.log(data, variables, onMutateResult);
      toast.success("Otp send successfully");
      regDispatch(completeProfile());
      navigate("/seller/dashboard");
    },
  });

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

  const validateForm = () => {
    const requiredField = [
      "name",
      "sellerAddress",
      "storeName",
      "storeAddress",
      "city",
      "state",
      "pincode",
      "businessType",
      "pan",
      "gstin",
      "accountNumber",
      "ifsc",
      "bankName",
    ];
    const error: Record<string, string> = {};
    requiredField.map((v) => {
      if (!form.formData[v as keyof typeof form.formData]) {
        error[v] = "this field is required";
      }
    });

    if (Object.keys(error).length > 0) {
      dispatch({
        type: "ERROR",
        payload: error,
      });
      return false;
    }

    return Object.keys(error).length === 0;
  };

  const handleSubmitDetails = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;
    const d = form.formData;
    const payload: SellerDetailsPayloadType = {
      name: d.name,
      address: d.sellerAddress,
      businessType: "Individual",
      role: "seller",
      taxDetails: {
        pan: d.pan,
        gstin: d.gstin,
      },
      storeAddress: {
        storeName: d.storeName,
        address: d.storeAddress,
        city: d.city,
        state: d.state,
        pincode: d.pincode,
      },
      bankDetails: {
        accountNumber: d.accountNumber,
        ifsc: d.ifsc,
        bankName: d.bankName,
      },
    };

    mutate(payload);
  };

  return (
    <div className="space-y-4 w-[70%] m-auto">
      <div className="flex items-center justify-between">
        <StepProgressBar />
        <Button
          variant="outline"
          className="px-4 py-1 rounded-2xl hover:bg-transparent font-semibold"
        >
          Logout
        </Button>
      </div>

      <div className="space-y-4 border-b pb-4 border-gray-400">
        <div>
          <h1 className="text-xl pb-1 font-semibold">Hello</h1>
          <h2 className="text-sm font-medium">Mobile & Email Verification</h2>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone size={18} />
              <p>{data?.mobile || "Missing"}</p>
            </div>
            <div className="bg-green-100 rounded-xl text-green-600 px-3 py-1 text-sm font-medium">
              {data?.mobile ? "Verified" : "Pending"}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail size={18} />
              <p>{data?.gmail || "NA"}</p>
            </div>
            <div className="bg-green-100 rounded-xl text-green-600 px-3 py-1 text-sm font-medium">
              {data?.gmail ? "Verified" : "Pending"}
            </div>
          </div>
        </div>
      </div>

      <form action="" onSubmit={handleSubmitDetails} className="space-y-4 pb-6">
        <div className="space-y-4">
          <h2 className="text-sm font-medium">Id Details</h2>

          <div>
            <FloatingInput
              className="border rounded px-4"
              label="Enter Seller Name"
              id="name"
              isBgLable={true}
              value={form.formData.name}
              onChange={handleOnChange}
              name="name"
            />

            {form.formError.name && (
              <span className="text-red-500 font-medium text-sm">
                {form.formError.name}
              </span>
            )}
          </div>
          <div>
            <FloatingInput
              className="border rounded px-4"
              label="Enter Seller Address"
              id="sellerAddress"
              isBgLable={true}
              value={form.formData.sellerAddress}
              onChange={handleOnChange}
              name="sellerAddress"
            />

            {form.formError.sellerAddress && (
              <span className="text-red-500 font-medium text-sm">
                {form.formError.sellerAddress}
              </span>
            )}
          </div>

          <div>
            <FloatingInput
              className="border rounded px-4"
              isBgLable={true}
              label="Enter GST No. Details"
              id="gstin"
              name="gstin"
              value={form.formData.gstin}
              onChange={handleOnChange}
            />
            {form.formError.gstin && (
              <span className="text-red-500 font-medium text-sm">
                {form.formError.gstin}
              </span>
            )}
          </div>
          <div>
            <FloatingInput
              className="border rounded px-4"
              isBgLable={true}
              label="Enter PAN Details"
              id="pan"
              name="pan"
              value={form.formData.pan}
              onChange={handleOnChange}
            />
            {form.formError.pan && (
              <span className="text-red-500 font-medium text-sm">
                {form.formError.pan}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-medium">Store & Pickup Details</h2>
          <div>
            <FloatingInput
              isBgLable={true}
              className="border rounded px-4"
              label="Enter Business Type"
              id="businessType"
              value={form.formData.businessType}
              name="businessType"
              onChange={handleOnChange}
            />
            {form.formError.businessType && (
              <span className="text-red-500 font-medium text-sm">
                {form.formError.businessType}
              </span>
            )}
          </div>

          <div>
            <FloatingInput
              isBgLable={true}
              className="border rounded px-4"
              label="Enter Store Name"
              id="storeName"
              value={form.formData.storeName}
              name="storeName"
              onChange={handleOnChange}
            />
            {form.formError.storeName && (
              <span className="text-red-500 font-medium text-sm">
                {form.formError.storeName}
              </span>
            )}
          </div>

          <div>
            <FloatingInput
              className="border rounded px-4"
              isBgLable={true}
              label="Enter Store Address"
              id="storeAddress"
              name="storeAddress"
              value={form.formData.storeAddress}
              onChange={handleOnChange}
            />
            {form.formError.storeAddress && (
              <span className="text-red-500 font-medium text-sm">
                {form.formError.storeAddress}
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <FloatingInput
                className="border rounded px-4"
                isBgLable={true}
                label="Enter City Name"
                id="city"
                name="city"
                value={form.formData.city}
                onChange={handleOnChange}
              />
              {form.formError.city && (
                <span className="text-red-500 font-medium text-sm">
                  {form.formError.city}
                </span>
              )}
            </div>

            <div>
              <FloatingInput
                className="border rounded px-4"
                isBgLable={true}
                label="Enter State Name"
                id="state"
                name="state"
                value={form.formData.state}
                onChange={handleOnChange}
              />
              {form.formError.state && (
                <span className="text-red-500 font-medium text-sm">
                  {form.formError.state}
                </span>
              )}
            </div>

            <div>
              <FloatingInput
                className="border rounded px-4"
                isBgLable={true}
                label="Enter Pincode"
                id="pincode"
                type="number"
                name="pincode"
                value={form.formData.pincode}
                onChange={handleOnChange}
              />
              {form.formError.pincode && (
                <span className="text-red-500 font-medium text-sm">
                  {form.formError.pincode}
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          <FloatingInput
            className="border rounded px-4"
            isBgLable={true}
            label="Enter Bank Name"
            id="bankName"
            name="bankName"
            value={form.formData.bankName}
            onChange={handleOnChange}
          />
          {form.formError.bankName && (
            <span className="text-red-500 font-medium text-sm">
              {form.formError.bankName}
            </span>
          )}
        </div>

        <div>
          <FloatingInput
            className="border rounded px-4"
            isBgLable={true}
            label="Enter Account Number"
            id="accountNumber"
            name="accountNumber"
            type="number"
            value={form.formData.accountNumber}
            onChange={handleOnChange}
          />
          {form.formError.accountNumber && (
            <span className="text-red-500 font-medium text-sm">
              {form.formError.accountNumber}
            </span>
          )}
        </div>

        <div>
          <FloatingInput
            className="border rounded px-4"
            isBgLable={true}
            label="Enter IFSC Code"
            id="ifsc"
            name="ifsc"
            value={form.formData.ifsc}
            onChange={handleOnChange}
          />
          {form.formError.ifsc && (
            <span className="text-red-500 font-medium text-sm">
              {form.formError.ifsc}
            </span>
          )}
        </div>

        <div className="space-x-4">
          <Button disabled={isPending}>
            {isPending ? "Submitting Details...." : "Submit Details"}
          </Button>
        </div>
      </form>
    </div>
  );
};
