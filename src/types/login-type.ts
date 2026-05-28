export interface UserLoginResData {
  message: string;
  status: number;
  data: LoginResData;
  token?: string;
  role?: string;
}

export interface LoginResData {
  _id: string;
  email: string;
  mobile: number;
  name: string;
  password: string;
  roles: string[];
  address: string;
  isVerified: boolean;
  isProfileComplete: boolean;
  createdAt: string;
  __v: number;
}

export type InititalState = {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isVerified: boolean;
  error: string | null;
};

export type AuthUserData = {
  _id: string;
  name: string;
  mobile: string;
  gmail: string;
  role: string[];
  address: string;
};

export type LoginPayload = { gmail: string; passward: string; role: string };
