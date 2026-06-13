import { useEffect, useState } from "react";
import { Heart, Maximize2, ShoppingCart, Zap } from "lucide-react";
import { ProductDetails, Variant } from "../../../types/buyer/product";

type props = {
  data: ProductDetails;
  selectedVariant?: Variant;
};

export const ProductLeftSideDetails = ({ data, selectedVariant }: props) => {
  const [showImage, setShowImage] = useState<{
    url: string;
    public_id: string;
  }>({
    url: "",
    public_id: "",
  });

  const productImages = [
    data.thumbnail,
    ...(data.gallery ?? []),
    ...(selectedVariant?.images ?? []),
  ].filter((image, index, images) => {
    return (
      image?.url &&
      images.findIndex((item) => item?.public_id === image.public_id) === index
    );
  });

  useEffect(() => {
    const variantImage = selectedVariant?.images?.[0];
    if (variantImage) {
      setShowImage(variantImage);
      return;
    }

    if (data.thumbnail) {
      setShowImage(data.thumbnail);
    }
  }, [data.thumbnail, selectedVariant]);

  return (
    <div className="lg:sticky lg:top-36">
      <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-4">
        <div className="flex max-h-[560px] flex-col gap-3 overflow-y-auto pr-1">
          {productImages.map((image, index) => (
            <button
              key={image.public_id || image.url}
              type="button"
              className={`${image.public_id === showImage.public_id ? "border-blue-600 shadow-[0_0_0_1px_#2563eb]" : "border-slate-200"} h-16 w-16 shrink-0 cursor-pointer rounded border bg-white p-1 transition hover:border-blue-400`}
              onClick={() => setShowImage(image)}
              aria-label={`Show product image ${index + 1}`}
            >
              <img
                src={image.url}
                alt={`${data.title} thumbnail ${index + 1}`}
                className="h-full w-full rounded object-cover"
              />
            </button>
          ))}
        </div>

        <div className="relative flex aspect-square items-center justify-center rounded border border-slate-200 bg-slate-50 p-5">
          <button
            type="button"
            className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm"
            aria-label="Zoom product image"
          >
            <Maximize2 size={18} />
          </button>
          <button
            type="button"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm"
            aria-label="Add product to wishlist"
          >
            <Heart size={20} />
          </button>
          <img
            src={showImage.url ? showImage.url : data.thumbnail?.url}
            className="max-h-full max-w-full rounded object-contain"
            alt={data.title}
          />
        </div>
      </div>

      <div className="mt-3 text-center text-sm text-slate-500">
        {Math.max(
          productImages.findIndex(
            (image) => image.public_id === showImage.public_id,
          ) + 1,
          1,
        )}{" "}
        / {productImages.length} photos
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 rounded bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600">
          <ShoppingCart size={20} />
          Add to Cart
        </button>
        <button className="flex items-center justify-center gap-2 rounded bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700">
          <Zap size={20} />
          Buy Now
        </button>
      </div>
    </div>
  );
};
