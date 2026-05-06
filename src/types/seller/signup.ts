export type FormDataType = {
  email: string;
  name: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  businessName: string;
  storeName: string;
  businessType: string;
  taxDetails: string;
  storeAddress: string;
  bankDetails: string;
  address: string;
};

export type SignupFormType = {
  formData: FormDataType;
  formError: Record<string, string>;
};
