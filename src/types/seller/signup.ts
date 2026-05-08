export type FormDataType = {
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  isEmailVerified: boolean;
};

export type SellerDetailsFormDataType = {
  name: string;
  sellerAddress: string;
  storeName: string;
  storeAddress: string;
  city: string;
  state: string;
  pincode: string;
  businessType: string;
  pan: string;
  gstin: string;
  accountNumber: string;
  ifsc: string;
  bankName: string;
};

export type SignupFormType = {
  formData: FormDataType;
  formError: Record<string, string>;
};

export type SellerDetailsSubmissionType = {
  formData: SellerDetailsFormDataType;
  formError: Record<string, string>;
};

export type SellerDetailsPayloadType = {
  name: string;
  address: string;
  businessType: "Individual" | "Partnership" | "Company";
  role: string;
  taxDetails: {
    pan: string;
    gstin: string;
  };
  storeAddress: {
    storeName: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  bankDetails: {
    accountNumber: string;
    ifsc: string;
    bankName: string;
  };
};
