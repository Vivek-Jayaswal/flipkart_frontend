import { useState } from "react";
import { Button } from "../../../shared/reusable/button";
import { ProductHighlights } from "./product-highlights";
import { ProductSpecification } from "./product-specification";
import { ProductReviews } from "./product-reviews";
import { ProductDetails, Variant } from "../../../types/buyer/product";

type Props = {
  data: ProductDetails;
  selectedVariant: Variant;
};

export const Details = ({ data, selectedVariant }: Props) => {
  const [activeTab, setActiveTab] = useState<string>("highlights");

  return (
    <section className="rounded border border-slate-200 bg-white">
      <div className="flex border-b border-slate-200 text-sm">
        <Button
          variant="outline"
          onClick={() => setActiveTab("highlights")}
          className={`${activeTab === "highlights" ? "border-b-2 border-blue-600 text-blue-600" : "border-transparent text-slate-700"} rounded-none border-0 border-b-2 text-base font-semibold hover:bg-slate-50`}
        >
          Product Highlights
        </Button>
        <Button
          className={`${activeTab === "specification" ? "border-b-2 border-blue-600 text-blue-600" : "border-transparent text-slate-700"} rounded-none border-0 border-b-2 font-semibold hover:bg-slate-50`}
          variant="outline"
          onClick={() => setActiveTab("specification")}
        >
          Specifications
        </Button>
        <Button
          className={`${activeTab === "reviews" ? "border-b-2 border-blue-600 text-blue-600" : "border-transparent text-slate-700"} rounded-none border-0 border-b-2 font-semibold hover:bg-slate-50`}
          variant="outline"
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </Button>
        <Button
          className={`${activeTab === "questions" ? "border-b-2 border-blue-600 text-blue-600" : "border-transparent text-slate-700"} rounded-none border-0 border-b-2 font-semibold hover:bg-slate-50`}
          variant="outline"
          onClick={() => setActiveTab("questions")}
        >
          Questions & Answers
        </Button>
      </div>
      <div className="p-5">
        {activeTab === "highlights" ? (
          <ProductHighlights data={data} selectedVariant={selectedVariant} />
        ) : activeTab === "specification" ? (
          <ProductSpecification data={data} />
        ) : activeTab === "reviews" ? (
          <ProductReviews data={data} />
        ) : (
          <div className="grid gap-4 text-sm">
            <div>
              <p className="font-semibold text-slate-950">
                Q: Is this product eligible for return?
              </p>
              <p className="mt-1 text-slate-600">
                A:{" "}
                {data.returnPolicy ||
                  "Return policy is available for this product."}
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-950">
                Q: Does it include warranty?
              </p>
              <p className="mt-1 text-slate-600">
                A:{" "}
                {data.warranty ||
                  "Warranty details are provided by the seller."}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
