import { Attribute } from "./product";

export type CartItem = {
  productId: string;
  productName: string;
  productSlug: string;
  variantId: string;
  brandId: string;
  brandName: string;
  attributes: Attribute[];
  price: number;
  salePrice: number;
  quantity: number;
  thumbnail: string;
};
