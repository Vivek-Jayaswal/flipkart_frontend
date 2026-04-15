import { queryOptions } from "@tanstack/react-query";
import api from "../../lib/api";
import type { GetAllProductRes } from "../../types/home-page";

export const queryGetAllProduct = () => {
  return queryOptions({
    queryKey: ["home-get-all-product"],
    queryFn: async () => {
      const res = await api.get<GetAllProductRes>("/product/get-all-product");
      return res.data;
    },
  });
};
