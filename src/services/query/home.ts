import { queryOptions } from "@tanstack/react-query";
import api from "../../lib/api";
import { AllProductDetailsResponse } from "../../types/buyer/product";

export const queryGetAllProduct = () => {
  return queryOptions({
    queryKey: ["home-get-all-product"],
    queryFn: async () => {
      const res = await api.get<AllProductDetailsResponse>("/product/get-all-product");
      return res.data;
    },
  });
};
