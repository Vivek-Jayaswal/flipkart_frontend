import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { queryGetProductDetails } from "../../../services/query/buyer/product";
import { ProductLeftSideDetails } from "./product-left-side-details";
import { ProductRightSideDetails } from "./product-right-side-details";
import { ProductDetails, Variant } from "../../../types/buyer/product";
import { Loader } from "../../../shared/reusable/loader";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { productDetailsReducer } from "../../../feature/productSlice/productSlice";

import { ChevronRight } from "lucide-react";

export const ProductMainDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { data, isLoading } = useQuery(queryGetProductDetails(id));
  const dispatch = useDispatch();
  const product = data?.data;
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");

  useEffect(() => {
    if (product) {
      dispatch(productDetailsReducer(product));
      const defaultVariant =
        product.variants.find(
          (variant) => variant.isDefault && variant.isActive,
        ) ??
        product.variants.find((variant) => variant.isActive) ??
        product.variants[0];
      setSelectedVariantId(defaultVariant?._id ?? "");
    }
  }, [dispatch, product]);

  const selectedVariant = useMemo<Variant | undefined>(() => {
    return product?.variants.find(
      (variant) => variant._id === selectedVariantId,
    );
  }, [product?.variants, selectedVariantId]);

  return (
    <>
      {isLoading ? (
        <div className="py-20">
          <Loader text="Loading Product Details" />
        </div>
      ) : product ? (
        <div className="mx-auto max-w-7xl space-y-4 px-4 py-4">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>Home</span>
            <ChevronRight size={15} />
            <span>{product.category?.name ?? "Product"}</span>
            <ChevronRight size={15} />
            <span className="max-w-[42rem] truncate font-medium text-slate-900">
              {product.title}
            </span>
          </nav>

          <div className="grid gap-6 rounded border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1.5fr_2fr]">
            <div>
              <ProductLeftSideDetails
                quantity={quantity}
                data={product as ProductDetails}
                selectedVariant={selectedVariant}
              />
            </div>
            <ProductRightSideDetails
              data={product as ProductDetails}
              quantity={quantity}
              setQuantity={setQuantity}
              selectedVariant={selectedVariant}
              selectedVariantId={selectedVariantId}
              onSelectedVariantId={setSelectedVariantId}
            />
          </div>
        </div>
      ) : (
        <div className="py-16 text-center font-semibold text-slate-600">
          Product details were not found.
        </div>
      )}
    </>
  );
};
