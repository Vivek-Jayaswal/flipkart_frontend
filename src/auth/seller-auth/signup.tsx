import { useEffect, useReducer, useState } from "react";
import { StepProgressBar } from "../../components/reusable/step-progressbar";
import { FloatingInput } from "../../components/reusable/floating-input";
import { Button } from "../../components/reusable/button";
import type { SignupFormType } from "../../types/seller/signup";
import { BadgeCheck, Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  SellerRegisterUserRequest,
  sendOtpRequest,
} from "../../services/mutation/registration";
import { Modal } from "../../components/reusable/modal-popup";
import { VerifyOtp } from "../../components/reusable/verify-otp";
import type { SellerPayload } from "../../types/auth-type";
import { useDispatch } from "react-redux";
import { loginSellerUser } from "../../feature/authSlice/sellerAuthSlice";
import { useNavigate } from "react-router-dom";
import { isValidIndianPhone, validateEmail } from "../../utils/email-validator";

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
  const [state, dispatch] = useReducer(reducer, inititaState);
  const [isToggle, setIsToggle] = useState<{
    confirmPassword: boolean;
    password: boolean;
  }>({ confirmPassword: false, password: false });
  const [isVerify, setIsVerify] = useState<boolean>(false);
  const reduxDispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (d: { gmail: string; role: string }) =>
      await sendOtpRequest(d),
    onSuccess() {
      toast.success("Otp send successfully");
      setIsVerify(true);
    },
  });

  const { mutate: registerSeller, isPending: isRegistering } = useMutation({
    mutationFn: async (d: SellerPayload) => await SellerRegisterUserRequest(d),
    onSuccess(data) {
      toast.success("Registration successfully");
      sessionStorage.removeItem("sellerSignup");
      localStorage.removeItem("sellerAccessToken");
      reduxDispatch(loginSellerUser(data));
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

    if (name === "email") {
      dispatch({
        type: "INPUT_TEXT",
        payload: {
          name: "isEmailVerified",
          value: false,
        },
      });
    }
  };

  const handleTogglePasswoard = (field: keyof typeof isToggle) => {
    setIsToggle((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validateForm = () => {
    const requiredField = ["email", "mobile", "password", "confirmPassword"];
    const error: Record<string, string> = {};
    requiredField.map((v) => {
      if (!state.formData[v as keyof typeof state.formData]) {
        error[v] = "this field is required";
      }
    });

    if (state.formData.mobile && !isValidIndianPhone(state.formData.mobile)) {
      if (Number(state.formData.mobile.charAt(0)) < 6) {
        error.mobile = "Phone number must be in indian format only";
      } else {
        error.mobile = "Invalid phone number it must only 10 digit";
      }
    }
    if (state.formData.email && !validateEmail(state.formData.email)) {
      error.mobile = "Invalid gmail format";
    }

    if (
      state.formData.password &&
      state.formData.confirmPassword &&
      state.formData.password !== state.formData.confirmPassword
    ) {
      error.confirmPassword = "passward mismatch";
    }

    if (Object.keys(error).length > 0) {
      dispatch({
        type: "ERROR",
        payload: error,
      });
      return false;
    }

    return Object.keys(error).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) return;
    if (!state.formData.isEmailVerified) {
      toast.error("Please verify your email first");
      return;
    }
    const payload: SellerPayload = {
      gmail: state.formData.email,
      mobile: state.formData.mobile,
      password: state.formData.password,
      role: "seller",
    };
    registerSeller(payload);
  };

  const handleEmailVerification = () => {
    if (!state.formData.email) {
      dispatch({
        type: "ERROR",
        payload: { email: "Email is required" },
      });
      return false;
    }
    mutate({ gmail: state.formData.email, role: "seller" });
  };

  useEffect(() => {
    const savedData = sessionStorage.getItem("sellerSignup");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      Object.keys(parsed).forEach((key) => {
        dispatch({
          type: "INPUT_TEXT",
          payload: {
            name: key,
            value: parsed[key],
          },
        });
      });
    }
  }, []);

  return (
    <div className="w-[70%] m-auto">
      <StepProgressBar />

      <div>
        {
          <Modal isOpen={isVerify} setIsOpen={(b: boolean) => setIsVerify(b)}>
            <VerifyOtp
              fn={() => {
                setIsVerify(false);
                dispatch({
                  type: "INPUT_TEXT",
                  payload: {
                    name: "isEmailVerified",
                    value: true,
                  },
                });

                sessionStorage.setItem(
                  "sellerSignup",
                  JSON.stringify({
                    ...state.formData,
                    isEmailVerified: true,
                  }),
                );
              }}
              gmail={state.formData.email}
              role="seller"
            />
          </Modal>
        }
        <form className="space-y-4">
          <div>
            <FloatingInput
              className="border rounded px-4"
              label="Enter Email"
              id="email"
              isBgLable={true}
              value={state.formData.email}
              onChange={handleOnChange}
              name="email"
              rightElementClass="top-2"
              rightElement={
                <Button
                  type="button"
                  onClick={handleEmailVerification}
                  variant="outline"
                  disabled={state.formData.isEmailVerified}
                  className={`border-none p-0 hover:bg-transparent ${state.formData.isEmailVerified && "cursor-not-allowed hover:bg-transparent"}`}
                >
                  {state.formData.isEmailVerified ? (
                    <span className="text-green-800 flex items-center gap-1">
                      Verified <BadgeCheck color="green" size={18} />
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-blue-600">
                      {isPending ? "Sending..." : "Send Otp"}
                    </span>
                  )}
                </Button>
              }
            />
            {state.formError.email && (
              <span className="text-red-500 text-sm font-medium">
                {state.formError.email}
              </span>
            )}
          </div>

          <div>
            <FloatingInput
              isBgLable={true}
              className="border rounded px-4"
              label="Enter Mobile Number"
              id="mobile"
              value={state.formData.mobile}
              name="mobile"
              onChange={handleOnChange}
            />
            {state.formError.mobile && (
              <span className="text-red-500 text-sm font-medium">
                {state.formError.mobile}
              </span>
            )}
          </div>

          <div>
            <FloatingInput
              isBgLable={true}
              className="border rounded px-4"
              label="Create Password"
              id="password"
              value={state.formData.password}
              name="password"
              onChange={handleOnChange}
              type={isToggle.password ? "text" : "password"}
              rightElement={
                <Button
                  type="button"
                  onClick={() => handleTogglePasswoard("password")}
                  variant="outline"
                  className="border-none p-0 hover:bg-none"
                >
                  {isToggle.password ? <Eye size={18} /> : <EyeOff size={18} />}
                </Button>
              }
            />
            {state.formError.password && (
              <span className="text-red-500 text-sm font-medium">
                {state.formError.password}
              </span>
            )}
          </div>

          <div>
            <FloatingInput
              className="border rounded px-4"
              isBgLable={true}
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              value={state.formData.confirmPassword}
              onChange={handleOnChange}
              type={isToggle.confirmPassword ? "text" : "password"}
              rightElement={
                <Button
                  type="button"
                  onClick={() => handleTogglePasswoard("confirmPassword")}
                  variant="outline"
                  className="border-none p-0 hover:bg-none"
                >
                  {isToggle.confirmPassword ? (
                    <Eye size={18} />
                  ) : (
                    <EyeOff size={18} />
                  )}
                </Button>
              }
            />
            {state.formError.confirmPassword && (
              <span className="text-red-500 text-sm font-medium">
                {state.formError.confirmPassword}
              </span>
            )}
          </div>

          <Button
            type="button"
            variant="primary"
            disabled={isRegistering}
            onClick={handleNext}
          >
            {isRegistering ? "Registering....." : "Register & Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
};
