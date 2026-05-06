import { useState } from "react";
import { Button } from "../../components/reusable/button";
import { FloatingInput } from "../../components/reusable/floating-input";
import { Modal } from "../../components/reusable/modal-popup";
import { useNavigate } from "react-router-dom";

export const SellerLogin = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="">
      <div>
        <Button onClick={() => setIsLogin(true)}>Login</Button>
      </div>
      <Modal
        isOpen={isLogin}
        className=""
        setIsOpen={(d) => {
          setIsLogin(d);
        }}
      >
        <div className="bg-white">
          <form action="" className="space-y-4">
            <h2>Login</h2>
            <FloatingInput
              className="border rounded px-4"
              label="Enter Email"
              id="email"
              isBgLable={true}
              value={loginData.email}
              onChange={handleOnChange}
              name="email"
            />
            <FloatingInput
              isBgLable={true}
              className="border rounded px-4"
              label="Enter Password"
              id="password"
              value={loginData.password}
              name="password"
              onChange={handleOnChange}
            />

            <Button className="w-full" variant="primary" onClick={() => ""}>
              Login
            </Button>
          </form>

          <div className="mt-4 space-y-2 text-center">
            <p>Don't have an account</p>
            <Button
              type="button"
              variant="outline"
              className="border border-blue-500 text-blue-600 font-medium py-1.5 w-[60%]"
              onClick={() => navigate("/seller/signup")}
            >
              Register for new account
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
