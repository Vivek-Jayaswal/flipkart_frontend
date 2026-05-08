export type RegisterUserType = {
  role: "seller" | "buyer" | "admin";
  name: string;
  mobile: string;
  address: string;
  password: string;
  gmail: string;
};

export type SellerPayload = {
  gmail: string;
  mobile: string;
  password: string;
  role: string;
};
