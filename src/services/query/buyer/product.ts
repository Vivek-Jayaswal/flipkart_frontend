import { queryOptions } from "@tanstack/react-query";
import api from "../../../lib/api";
import { ProductDetailsResponse } from "../../../types/buyer/product";

export const queryGetProductDetails = (id: string | undefined) => {
  return queryOptions({
    queryKey: ["get-product-details-by-id", id],
    queryFn: async () => {
      const res = await api.get<ProductDetailsResponse>(
        `/product/get-product-details/${id}`,
      );
      return res.data;
    },
  });
};
