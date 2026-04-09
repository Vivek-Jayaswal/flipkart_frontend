import api from "../../lib/api";
import type { RegisterUserType } from "../../types/auth-type";

export const sendRegistrationRequest = async (data: string) => {
  const response = await api.post("/auth/send-otp", {
    gmail: data,
  });
  return response.data;
};

export const verifyOtpRequest = async (data: {
  gmail: string;
  otp: string;
}) => {
  const response = await api.post("/auth/verify-otp", {
    gmail: data.gmail,
    otp: data.otp,
  });
  return response.data;
};

export const RegisterUserRequest = async (data: RegisterUserType) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
