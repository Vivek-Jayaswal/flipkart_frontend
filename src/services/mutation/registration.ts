import api from "../../lib/api";
import type { RegisterUserType, SellerPayload } from "../../types/auth-type";
import type { SellerDetailsPayloadType } from "../../types/seller/signup";

export const sendOtpRequest = async (data: {
  gmail: string;
  role: string;
}) => {
  const response = await api.post("/auth/send-otp", {
    gmail: data.gmail,
    role: data.role,
  });
  return response.data;
};

export const verifyOtpRequest = async (data: {
  gmail: string;
  otp: string;
  role: string;
}) => {
  const response = await api.post("/auth/verify-otp", {
    gmail: data.gmail,
    otp: data.otp,
    role: data.role,
  });
  return response.data;
};

export const RegisterUserRequest = async (data: RegisterUserType) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
export const SellerRegisterUserRequest = async (data: SellerPayload) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
export const SellerRegistrationDetailsUpdateRequest = async (
  data: SellerDetailsPayloadType,
) => {
  const response = await api.post("/auth/update-seller-resiter-details", data);
  return response.data;
};
