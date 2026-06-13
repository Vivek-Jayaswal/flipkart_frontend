import { Camera, Cpu, Package, ShieldCheck, Star, Truck } from "lucide-react";
import { ProductDetails, Variant } from "../../../types/buyer/product";

type Props = {
  data: ProductDetails;
  selectedVariant: Variant;
};

export const ProductHighlights = ({ data, selectedVariant }: Props) => {
  const icons = [Cpu, Camera, Star, ShieldCheck, Truck, Package];

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-2 items-center space-y-4">
        {selectedVariant?.attributes?.length ? (
          selectedVariant?.attributes?.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={`${item}-${item.value}`}
                className="flex items-center gap-3 mb-0"
              >
                <Icon className="text-slate-500" size={20} />
                <span className="text-slate-800">
                  <strong>{item.name}:</strong> {item.value}
                </span>
              </div>
            );
          })
        ) : (
          <div className="rounded bg-slate-50 p-4">
            Poduct Highlights not found..
          </div>
        )}
      </div>
      <div className="rounded bg-slate-50 p-4">
        <h3 className="font-semibold text-slate-950">Description</h3>
        <p className="mt-2 whitespace-pre-line leading-relaxed text-slate-700">
          {data.description ||
            data.shortDescription ||
            "No description available for this product."}
        </p>
      </div>
    </div>
  );
};
