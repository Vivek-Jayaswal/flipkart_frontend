// ProductAddPage.tsx
import { Plus, ImagePlus, X } from "lucide-react";
import { ProgressBar } from "./progressBar";
import { FloatingInput } from "../../../../shared/reusable/floating-input";
import SelectCategory from "./select-category";
import { Label } from "../../../../shared/reusable/label";
import {
  ImagesType,
  MultipleImageSelector,
} from "../../../../shared/reusable/multi-image-selector";
import { ChangeEvent, useState } from "react";
import { Button } from "../../../../shared/reusable/button";

type ProductData = {
  name: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  thumbnail: ImagesType[];
  gallery: ImagesType[];
};

export default function ProductAddPage() {
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    categoryId: "",
    shortDescription: "",
    description: "",
    thumbnail: [],
    gallery: [],
  });

  const handleDeleteMultipleImage = (id: string) => {
    const filterdImages = productData.gallery.filter((d) => d.id != id);
    setProductData((prev) => ({
      ...prev,
      gallery: filterdImages,
    }));
  };

  const handleInputChanges = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setProductData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] flex">
      {/* SIDEBAR */}

      {/* MAIN */}
      <main className="flex-1">
        {/* CONTENT */}
        <div className="p-8">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-500 mt-1 text-sm">
              Fill all the required details to add a new product
            </p>
          </div>

          <ProgressBar />

          {/* Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* LEFT */}
            <div className="col-span-9 space-y-6">
              {/* BASIC INFO */}
              <div className="bg-white border border-gray-300 rounded p-6">
                <h2 className="text-xl font-semibold mb-6">
                  Basic Information
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  {/* LEFT FORM */}
                  <div className="space-y-5">
                    <div>
                      <FloatingInput
                        label="Product Name"
                        id="product-name"
                        value={productData.name}
                        className="border border-gray-400 px-4 focus:ring-0 focus:border-gray-400 rounded-md"
                        isBgLable={true}
                        onChange={handleInputChanges}
                      />
                    </div>

                    <SelectCategory
                      onSelectCategory={(id) =>
                        console.log("Selected category ID:", id)
                      }
                    />

                    <div>
                      <Label
                        htmlFor="short-description"
                        className="text-sm font-medium mb-2 block"
                      >
                        Short Description
                      </Label>
                      <textarea
                        maxLength={200}
                        id="short-description"
                        name="shortDescription"
                        value={productData.shortDescription}
                        placeholder="Write a short description of your product"
                        rows={3}
                        onChange={handleInputChanges}
                        className="border border-gray-300 px-4 py-2 focus:outline-none text-sm w-full focus:ring-0 focus:border-gray-400 rounded-md"
                      />
                      <Label className="text-xs text-gray-400 mt-1 block">
                        {productData.shortDescription.length || 0} / 200
                        characters
                      </Label>
                    </div>

                    <div>
                      <Label
                        htmlFor="description"
                        className="text-sm font-medium mb-2 block"
                      >
                        Description
                      </Label>
                      <textarea
                        id="description"
                        name="description"
                        value={productData.description}
                        placeholder="Write a detailed description of your product"
                        rows={5}
                        onChange={handleInputChanges}
                        className="border border-gray-300 focus:outline-none  px-4 py-2 text-sm w-full focus:ring-0 focus:border-gray-400 rounded-md"
                      />
                      <Label className="text-xs text-gray-400 mt-1 block">
                        {productData.description.length || 0} / 1000 characters
                      </Label>
                    </div>
                  </div>

                  {/* RIGHT IMAGES */}
                  <div>
                    <label className="text-sm font-medium block mb-2">
                      Product Thumbnail
                    </label>

                    <div className="border-2 border-dashed border-gray-300 rounded h-[240px] flex flex-col items-center justify-center text-center bg-gray-50">
                      <div
                        className={`${productData.thumbnail.length > 0 ? "w-36 h-36" : "w-28 h-28"} bg-white rounded-xl border border-gray-300 flex items-center justify-center shadow-sm`}
                      >
                        {productData.thumbnail.length > 0 ? (
                          <div className="relative">
                            <img
                              src={productData.thumbnail[0].URL}
                              alt="Thumbnail"
                              className="w-full h-full object-cover"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="p-0 border-0 absolute -top-8 -right-2 flex items-center justify-center rounded-xl"
                            >
                              <X
                                className="w-5 h-5 bg-white rounded-full border p-[1px] flex items-center justify-center"
                                onClick={() =>
                                  setProductData((prev) => ({
                                    ...prev,
                                    thumbnail: [],
                                  }))
                                }
                              />
                            </Button>
                          </div>
                        ) : (
                          <MultipleImageSelector
                            id="p-single"
                            selectImageType="single"
                            onChange={(images) =>
                              setProductData((prev) => ({
                                ...prev,
                                thumbnail: images,
                              }))
                            }
                          >
                            <ImagePlus className="text-gray-400" size={34} />
                          </MultipleImageSelector>
                        )}
                      </div>

                      <p className="text-sm text-gray-500 mt-4">
                        Click to upload or drag and drop
                      </p>

                      <span className="text-xs text-gray-400">
                        PNG, JPG up to 5MB
                      </span>
                    </div>

                    {/* Gallery */}
                    <div className="mt-6">
                      <label className="text-sm font-medium block mb-3">
                        Product Gallery
                      </label>

                      <div className="flex flex-wrap gap-3">
                        {productData.gallery.length > 0 &&
                          productData.gallery.map((d) => (
                            <div
                              key={d.id}
                              className="relative w-20 h-20 border border-gray-300 rounded"
                            >
                              <img
                                src={d.URL}
                                alt="Thumbnail"
                                className="w-full h-full object-cover rounded"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handleDeleteMultipleImage(d.id)}
                                className="p-0 border-0 absolute -top-2 -right-2 flex items-center justify-center rounded-xl"
                              >
                                <X
                                  className="w-5 h-5 bg-white rounded-full border p-[1px] flex items-center justify-center"
                                  onClick={() =>
                                    setProductData((prev) => ({
                                      ...prev,
                                      thumbnail: [],
                                    }))
                                  }
                                />
                              </Button>
                            </div>
                          ))}

                        <button className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <MultipleImageSelector
                            id="p-multiple"
                            selectImageType="multiple"
                            onChange={(images) =>
                              setProductData((prev) => ({
                                ...prev,
                                gallery: [...prev.gallery, ...images],
                              }))
                            }
                          >
                            <Plus className="text-gray-400" size={34} />
                          </MultipleImageSelector>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="col-span-3 space-y-6">
              {/* STATUS */}

              <div className="bg-white border p-6 border-gray-300 rounded">
                <div className="pb-3 border-b border-gray-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Product Status</h3>

                    <span className="bg-yellow-100 text-yellow-700 text-[10px] px-2 py-1 rounded-md font-medium">
                      DRAFT
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">
                    Your product is in draft mode.
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Completeness</span>
                    <span>60%</span>
                  </div>

                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-[60%] h-full bg-blue-600 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="bg-white border p-6 border-gray-300 rounded">
                <h3 className="font-semibold text-lg mb-5">Tips</h3>

                <div className="space-y-4 text-sm text-gray-600">
                  <p>✓ Use high quality images</p>
                  <p>✓ Write clear and unique descriptions</p>
                  <p>✓ Add all variants and specifications</p>
                  <p>✓ Check product policies</p>
                </div>

                <button className="mt-6 text-blue-600 font-medium text-sm">
                  View Product Guidelines →
                </button>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3">
                <Button className="">Save as Draft</Button>

                <Button className="">Save & Next</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
