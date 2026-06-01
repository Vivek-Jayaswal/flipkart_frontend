export interface FormattedCategoryResponse {
  success: boolean;
  data: FormattedCategoryDataRes[];
}

export interface FormattedCategoryDataRes {
  value: string;
  label: string;
  children: Children[];
}

export interface Children {
  value: string;
  label: string;
  children?: Children2[];
}

export interface Children2 {
  value: string;
  label: string;
}
