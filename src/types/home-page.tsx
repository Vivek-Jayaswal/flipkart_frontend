export interface GetAllProductRes {
  status: number;
  message: string;
  data: ProductListRes[];
}

export interface ProductListRes {
  _id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  discountPrice: number;
  stock: number;
  imagePath: string;
  imageURL: string;
  sellerId: string;
  ratings: number;
  numReviews: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
