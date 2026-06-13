import { ProductDetails } from "../../../types/buyer/product";

type Props = {
  data: ProductDetails;
};

export const ProductSpecification = ({ data }: Props) => {
  const specs = [
    { key: "Brand", value: data.brand?.name },
    { key: "Model", value: data.slug },
    { key: "Category", value: data.category?.name },
    { key: "Warranty", value: data.warranty },
    { key: "Return Policy", value: data.returnPolicy },
    {
      key: "Free Shipping",
      value: data.shippingInfo?.freeShipping ? "Yes" : "No",
    },
    ...(data.specifications ?? []),
  ].filter((spec) => spec.value);

  return (
    <div className="overflow-hidden rounded border border-slate-200">
      {specs.map((spec, index) => (
        <div
          key={`${spec.key}-${index}`}
          className="grid border-b border-slate-200 last:border-b-0 sm:grid-cols-[240px_1fr]"
        >
          <div className="bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
            {spec.key}
          </div>
          <div className="px-4 py-3 text-slate-900">{spec.value}</div>
        </div>
      ))}
    </div>
  );
};
