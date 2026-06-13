export interface ProductDetailsResponse {
  success: boolean;
  message: string;
  data: ProductDetails;
}
export interface AllProductDetailsResponse {
  success: boolean;
  message: string;
  data: ProductDetails[];
}

export interface ProductDetails {
  thumbnail: Thumbnail;
  shippingInfo: ShippingInfo;
  ratings: Ratings;
  seo: Seo;
  _id: string;
  seller: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  brand: Brand;
  category: Category;
  gallery: Gallery[];
  tags: string[];
  warranty: string;
  returnPolicy: string;
  currentStep: number;
  totalSales: number;
  views: number;
  status: string;
  isFeatured: boolean;
  isFlashSale: boolean;
  flashSalePrice: number;
  isDeleted: boolean;
  variants: Variant[];
  specifications: Specification[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  rejectedBy: string;
  rejectionReason: string;
}

export interface Thumbnail {
  url: string;
  public_id: string;
}

export interface ShippingInfo {
  dispatchTime: string;
  freeShipping: boolean;
}

export interface Ratings {
  average: number;
  count: number;
}

export interface Seo {
  keywords: any[];
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  logo: string;
  logoPath: string;
  description: string;
  website: string;
  isFeatured: boolean;
  status: string;
  createdBy: string;
  updatedBy: any;
  updateHistory: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  parentCategory: string;
  level: number;
  isFeatured: boolean;
  createdBy: string;
  updatedBy: any;
  updateHistory: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Gallery {
  url: string;
  public_id: string;
  _id: string;
}

export interface Variant {
  sku: string;
  attributes: Attribute[];
  price: number;
  salePrice: number;
  weight: number;
  isDefault: boolean;
  isActive: boolean;
  _id: string;
  images: Image[];
  createdAt: string;
  updatedAt: string;
}

export interface Attribute {
  name: string;
  value: string;
  _id: string;
}

export interface Image {
  url: string;
  public_id: string;
  _id: string;
}

export interface Specification {
  key: string;
  value: string;
  _id: string;
}
