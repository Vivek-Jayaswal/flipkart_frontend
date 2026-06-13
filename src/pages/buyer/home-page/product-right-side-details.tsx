import { useMemo, useState } from "react";
import {
  BadgeCheck,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Star,
  Tag,
  Truck,
} from "lucide-react";
import { RotateCcw, LockKeyhole } from "lucide-react";

import { ProductDetails, Variant } from "../../../types/buyer/product";
import { VariantSelector } from "./variant-selector";
import { Details } from "./details";

type props = {
  data: ProductDetails;
  selectedVariant?: Variant;
  selectedVariantId: string;
  onSelectedVariantId: (id: string) => void;
};

const formatCurrency = (value?: number) =>
  `₹${(value ?? 0).toLocaleString("en-IN")}`;

const getDiscount = (price?: number, salePrice?: number) => {
  if (!price || !salePrice || salePrice >= price) return 0;
  return Math.round(((price - salePrice) / price) * 100);
};

export const ProductRightSideDetails = ({
  data,
  selectedVariant,
  selectedVariantId,
  onSelectedVariantId,
}: props) => {
  const [quantity, setQuantity] = useState(1);
  const variant = selectedVariant ?? data.variants?.[0];
  const discount = getDiscount(variant?.price, variant?.salePrice);
  const product = data;

  const selectedAttributes = useMemo(
    () =>
      variant?.attributes.filter(
        (d) => d.name.toLowerCase().trim() === "color",
      ) ?? [],
    [variant],
  );
  const highlights = data.specifications?.slice(0, 5) ?? [];

  console.log(highlights);

  return (
    <div className="min-w-0 space-y-5">
      <div>
        <p className="font-semibold text-blue-600">{data?.brand?.name}</p>
        <h1 className="mt-2 text-xl font-semibold leading-snug text-slate-950">
          {data?.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded bg-green-600 px-2 py-1 text-sm font-semibold text-white">
            {(data.ratings?.average || 0).toFixed(1)}
            <Star size={14} fill="currentColor" />
          </span>
          <span className="text-base text-slate-600">
            {(data.ratings?.count || 0).toLocaleString("en-IN")} Ratings &
            Reviews
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-blue-700">
            <BadgeCheck size={18} />
            Assured
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-end gap-3">
          <span className="text-2xl font-bold text-slate-950">
            {formatCurrency(variant?.salePrice || variant?.price)}
          </span>
          {variant?.price &&
          variant.salePrice &&
          variant.salePrice < variant.price ? (
            <span className="pb-1 text-xl text-slate-500 line-through">
              {formatCurrency(variant.price)}
            </span>
          ) : null}
          {discount ? (
            <span className="pb-1 text-xl font-semibold text-green-600">
              {discount}% off
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-sm text-slate-600">Inclusive of all taxes</p>
      </div>

      {data.shortDescription ? (
        <p className="rounded bg-slate-50 p-3 leading-relaxed text-slate-700">
          {data.shortDescription}
        </p>
      ) : null}

      {data.variants.length > 0 ? (
        <section className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-semibold text-slate-950">Choose Variant</h2>
            {selectedAttributes.map((attribute) => (
              <span
                key={attribute._id}
                className="rounded bg-slate-100 px-2 py-1 text-sm text-slate-700"
              >
                {attribute.name} : {attribute.value}
              </span>
            ))}
          </div>
          <VariantSelector
            data={data.variants}
            activeVariantId={selectedVariantId}
            onClick={onSelectedVariantId}
          />
        </section>
      ) : null}

      <section className="rounded bg-slate-50 p-4">
        <h2 className="mb-3 font-semibold text-slate-950">Available Offers</h2>
        <div className="space-y-3 text-slate-700">
          {[
            "Bank Offer 10% off on selected credit cards",
            "Special Price extra savings included in the sale price",
            "No Cost EMI starting from ₹250/month",
            data.shippingInfo?.freeShipping
              ? "Free delivery on this product"
              : "Fast dispatch available",
          ].map((offer) => (
            <div key={offer} className="flex items-start gap-3">
              <Tag className="mt-0.5 text-green-600" size={18} />
              <span>{offer}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 border-y border-slate-200 py-4 md:grid-cols-2">
        <div className="flex gap-3">
          <Truck className="mt-1 text-blue-600" size={24} />
          <div>
            <h2 className="font-semibold text-slate-950">Delivery</h2>
            <p className="text-green-700">
              {data.shippingInfo?.freeShipping ? "FREE Delivery" : "Delivery"}{" "}
              by {data.shippingInfo?.dispatchTime || "Tomorrow"}
            </p>
            {/* <div className="mt-2 flex gap-2">
              <input
                className="h-10 min-w-0 rounded border border-slate-300 px-3 text-sm outline-none focus:border-blue-600"
                placeholder="Enter Pincode"
              />
              <button className="rounded bg-slate-900 px-4 text-sm font-semibold text-white">
                Check
              </button>
            </div> */}
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <PackageCheck className="text-blue-600" size={22} />
            <span className="font-medium text-slate-800">
              SKU: {variant?.sku || data.slug}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-blue-600" size={22} />
            <span className="font-medium text-slate-800">
              {data.warranty || "Warranty available"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-blue-600" size={22} />
            <span className="font-medium text-slate-800">
              {data.returnPolicy || "Easy returns available"}
            </span>
          </div>
        </div>
      </section>

      <section className="flex flex-wrap border-b border-gray-200 pb-4 mb-4 items-center gap-4">
        <span className="font-semibold text-slate-950">Quantity:</span>
        <div className="grid grid-cols-3 overflow-hidden rounded border border-slate-300">
          <button
            className="h-10 w-12 text-xl"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
          >
            -
          </button>
          <span className="grid h-10 w-12 place-items-center border-x border-slate-300 font-semibold">
            {quantity}
          </span>
          <button
            className="h-10 w-12 text-xl"
            onClick={() => setQuantity((current) => Math.min(10, current + 1))}
          >
            +
          </button>
        </div>
        <span className="text-sm text-slate-500">(Max 10)</span>
      </section>

      <section>
        <div className="grid gap-3 rounded border border-slate-200 bg-white p-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: RotateCcw,
              title: product.returnPolicy || "7 Days Replacement",
            },
            {
              icon: ShieldCheck,
              title: product.warranty || "1 Year Warranty",
            },
            { icon: LockKeyhole, title: "Secure Payment" },
            {
              icon: Truck,
              title: product.shippingInfo?.freeShipping
                ? "Free Delivery"
                : "Reliable Delivery",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <item.icon className="text-blue-600" size={24} />
              <span className="font-medium text-slate-800">{item.title}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Details data={product} selectedVariant={selectedVariant as Variant} />
      </section>
    </div>
  );
};
