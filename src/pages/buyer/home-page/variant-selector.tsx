import { baseUrl } from "../../../lib/api";
import { Variant } from "../../../types/buyer/product";

type props = {
  onClick: (id: string) => void;
  data: Variant[];
  activeVariantId: string;
};

export const VariantSelector = ({ onClick, data, activeVariantId }: props) => {
  const getVariantLabel = (variant: Variant) => {
    return (
      variant.attributes
        .filter(
          (d) =>
            d.name.toLowerCase().trim() === "color" ||
            d.name.toLowerCase().trim() === "storage",
        )
        .map((attribute) => attribute.value)
        .join(" / ") || variant.sku
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {data.map((d) => (
        <button
          key={d._id}
          type="button"
          className={`${activeVariantId === d._id ? "border-blue-600 shadow-[0_0_0_1px_#2563eb]" : "border-slate-200"} min-h-24 w-24 cursor-pointer rounded border bg-gray-50 p-2 text-left transition hover:border-blue-400 disabled:cursor-not-allowed disabled:opacity-50`}
          onClick={() => onClick(d._id)}
          disabled={!d.isActive}
        >
          {d.images?.[0]?.url ? (
            <img
              src={`${baseUrl}${d.images[0].url}`}
              alt={getVariantLabel(d)}
              className="h-14 w-full rounded object-cover object-center"
            />
          ) : null}
          <p className="mt-2 line-clamp-2 text-xs font-medium text-slate-800">
            {getVariantLabel(d)}
          </p>
        </button>
      ))}
    </div>
  );
};
