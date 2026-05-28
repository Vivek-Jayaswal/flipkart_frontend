import type { LoginPayload } from "../../auth/signin";
import api from "../../lib/api";
import type { UserLoginResData } from "../../types/login-type";

export const sendUserLogin = async (data: LoginPayload) => {
  const res = await api.post<UserLoginResData>("/auth/login", data);
  return res.data;
};

export const userLogout = async (data: { role: string }) => {
  return await api.post<UserLoginResData>("/auth/logout", data);
};
