import { queryOptions } from "@tanstack/react-query";
import api from "../../../lib/api";
import { FormattedCategoryResponse } from "../../../types/seller/create-product";

export const queryGetAllFormattedCategory = () => {
  return queryOptions({
    queryKey: ["category-get-formatted-categories"],
    queryFn: async () => {
      const res = await api.get<FormattedCategoryResponse>(
        "/category/get-formatted-categories",
      );
      return res.data;
    },
  });
};
