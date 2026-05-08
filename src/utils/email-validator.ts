export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isValidIndianPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[\s()-]/g, "");
  const indianPhoneRegex = /^[6-9]\d{9}$/;
  return indianPhoneRegex.test(cleaned);
};
