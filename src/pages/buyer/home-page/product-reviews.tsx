import { Star } from "lucide-react";
import { ProductDetails } from "../../../types/buyer/product";

type Props = {
  data: ProductDetails;
};

export const ProductReviews = ({ data }: Props) => {
  const rating = data.ratings?.average || 0;
  const count = data.ratings?.count || 0;
  const distribution = [5, 4, 3, 2, 1].map((stars, index) => ({
    stars,
    percent: Math.max(4, Math.round((rating / stars) * 18) - index * 5),
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-5xl font-bold text-slate-950">{rating.toFixed(1)}</span>
          <Star className="text-amber-400" size={30} fill="currentColor" />
        </div>
        <p className="mt-2 text-slate-600">
          Based on {count.toLocaleString("en-IN")} ratings and reviews
        </p>
        <button className="mt-5 rounded bg-blue-600 px-6 py-2 font-semibold text-white">
          Write a Review
        </button>
      </div>

      <div className="space-y-3">
        {distribution.map((item) => (
          <div key={item.stars} className="grid grid-cols-[36px_1fr_48px] items-center gap-3">
            <span className="flex items-center gap-1 text-sm text-slate-700">
              {item.stars}
              <Star size={12} fill="currentColor" />
            </span>
            <div className="h-2 overflow-hidden rounded bg-slate-200">
              <div
                className="h-full rounded bg-green-600"
                style={{ width: `${Math.min(item.percent, 100)}%` }}
              />
            </div>
            <span className="text-right text-sm text-slate-500">
              {Math.min(item.percent, 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
