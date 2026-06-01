import { useState } from "react";
import { Button } from "../../shared/reusable/button";
import { FloatingInput } from "../../shared/reusable/floating-input";
import { Modal } from "../../shared/reusable/modal-popup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { LoginPayload } from "../../types/login-type";
import { sendUserLogin } from "../../services/mutation/login";
import { validateEmail } from "../../utils/email-validator";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSellerUser } from "../../feature/authSlice/sellerAuthSlice";
import { Eye, EyeOff } from "lucide-react";

type props = {
  isLogin: boolean;
  setIsLogin: (open: boolean) => void;
};

export const SellerLogin = ({ isLogin, setIsLogin }: props) => {
  const [loginData, setLoginData] = useState<LoginPayload>({
    gmail: "",
    passward: "",
    role: "seller",
  });
  const [error, setError] = useState<Record<string, string>>({});
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password",
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginPayload) => {
      const res = await sendUserLogin(data);
      return res;
    },
    onSuccess: (data) => {
      toast.success("Login Successfull");
      setLoginData({
        gmail: "",
        passward: "",
        role: "",
      });
      setError({});
      setPasswordType("password");
      dispatch(loginSellerUser(data));
    },
  });

  console.log(loginData);

  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "gmail") {
      setIsValidEmail(validateEmail(e.target.value));
    }
    setError((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errField = ["gmail", "passward"];
    const err: Record<string, string> = {};

    errField.forEach((e) => {
      if (!loginData[e as keyof typeof loginData]) {
        err[e] = "This field is required";
      }
    });

    if (Object.entries(err).length > 0) {
      setError(err);
      return false;
    }

    return Object.entries(err).length === 0;
  };

  const handleTogglePassword = () => {
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    mutate(loginData);
  };
  return (
    <Modal
      isOpen={isLogin}
      className=""
      setIsOpen={(d) => {
        alert("calling");
        setIsLogin(d);
        setLoginData({
          gmail: "",
          passward: "",
          role: "seller",
        });
        setError({});
      }}
    >
      <div className="bg-white">
        <form onSubmit={handleSubmit} action="" className="space-y-4">
          <h2>Login</h2>
          <div>
            <FloatingInput
              className="border rounded px-4"
              label="Enter Email"
              id="email"
              isBgLable={true}
              value={loginData.gmail}
              onChange={handleOnChange}
              name="gmail"
            />
            {!isValidEmail && (
              <p className="text-red-500 text-xs mt-1">
                Please enter a valid email
              </p>
            )}
            {error.gmail && (
              <p className="text-red-500 text-xs mt-1">{error.gmail}</p>
            )}
          </div>

          <div>
            <FloatingInput
              isBgLable={true}
              type={passwordType === "password" ? "password" : "text"}
              className="border rounded px-4"
              label="Enter Password"
              id="passward"
              value={loginData.passward}
              name="passward"
              onChange={handleOnChange}
              rightElementClass=""
              rightElement={
                <Button
                  type="button"
                  variant="outline"
                  className="border-none p-0 hover:bg-transparent"
                  onClick={handleTogglePassword}
                >
                  {passwordType === "password" ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </Button>
              }
            />
            {error?.passward && (
              <p className="text-red-500 text-xs mt-1">{error?.passward}</p>
            )}
          </div>

          <Button disabled={isPending} className="w-full" variant="primary">
            {isPending ? "Please wait..." : "Login"}
          </Button>
        </form>

        <div className="mt-4 space-y-2 text-center">
          <p>Don't have an account</p>
          <Button
            type="button"
            variant="outline"
            className="border border-blue-500 text-blue-600 font-medium py-1.5 w-[60%]"
            onClick={() => {
              navigate("/seller/signup");
              setIsLogin(!isLogin);
            }}
          >
            Register for new account
          </Button>
        </div>
      </div>
    </Modal>
  );
};
