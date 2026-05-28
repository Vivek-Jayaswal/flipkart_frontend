// ProductAddPage.tsx
import {
  ChevronDown,
  Plus,
  Trash2,
  GripVertical,
  ImagePlus,
} from "lucide-react";
import { ProgressBar } from "./progressBar";
import { FloatingInput } from "../../../../components/reusable/floating-input";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from "../../../../components/reusable/select";

const variants = [
  {
    color: "Black",
    storage: "256GB",
    sku: "IPH15PM-BLK-256",
    price: "1,59,900",
    discount: "1,49,900",
    stock: "25",
  },
  {
    color: "Black",
    storage: "512GB",
    sku: "IPH15PM-BLK-512",
    price: "1,79,900",
    discount: "1,69,900",
    stock: "18",
  },
  {
    color: "Blue Titanium",
    storage: "256GB",
    sku: "IPH15PM-BLU-256",
    price: "1,59,900",
    discount: "1,49,900",
    stock: "20",
  },
];

export default function ProductAddPage() {
  return (
    <div className="min-h-screen bg-[#f6f7fb] flex">
      {/* SIDEBAR */}

      {/* MAIN */}
      <main className="flex-1">
        {/* CONTENT */}
        <div className="p-8">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Add New Product
            </h1>

            <p className="text-gray-500 mt-1">
              Fill all the required details to add a new product
            </p>
          </div>

          <ProgressBar />

          {/* Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* LEFT */}
            <div className="col-span-9 space-y-6">
              {/* BASIC INFO */}
              <div className="bg-white border rounded-2xl p-6">
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
                        value=""
                        className="border border-gray-400 px-4 focus:ring-0 focus:border-gray-400 rounded-md"
                        isBgLable={true}
                      />
                    </div>

                    <div className="w-[250px]">
                      {/* <Select
                        defaultValue="Apple"
                        onValueChange={(value) => console.log(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Brand" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="Apple">Apple</SelectItem>

                          <SelectItem value="Samsung">Samsung</SelectItem>

                          <SelectItem value="OnePlus">OnePlus</SelectItem>
                        </SelectContent>
                      </Select> */}
                    </div>
                  </div>

                  {/* RIGHT IMAGES */}
                  <div>
                    <label className="text-sm font-medium block mb-2">
                      Product Thumbnail
                    </label>

                    <div className="border-2 border-dashed rounded-2xl h-[240px] flex flex-col items-center justify-center text-center bg-gray-50">
                      <div className="w-28 h-28 bg-white rounded-xl border flex items-center justify-center shadow-sm">
                        <ImagePlus className="text-gray-400" size={34} />
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

                      <div className="flex gap-3">
                        {[1, 2, 3, 4].map((item) => (
                          <div
                            key={item}
                            className="w-20 h-20 rounded-xl border bg-gray-100 flex items-center justify-center relative"
                          >
                            <ImagePlus size={20} className="text-gray-400" />

                            <button className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full border flex items-center justify-center">
                              ×
                            </button>
                          </div>
                        ))}

                        <button className="w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center">
                          <Plus className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* VARIANTS */}
              <div className="bg-white border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Variants</h2>

                    <p className="text-sm text-gray-500">
                      Add different variants of this product
                    </p>
                  </div>

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                    <Plus size={18} />
                    Add Variant
                  </button>
                </div>

                <div className="overflow-hidden border rounded-2xl">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-sm text-gray-600">
                      <tr>
                        <th className="p-4 text-left"></th>
                        <th className="p-4 text-left">Color</th>
                        <th className="p-4 text-left">Storage</th>
                        <th className="p-4 text-left">SKU</th>
                        <th className="p-4 text-left">Price</th>
                        <th className="p-4 text-left">Discounted</th>
                        <th className="p-4 text-left">Stock</th>
                        <th className="p-4 text-left">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {/* {variants.map((variant, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-4">
                            <GripVertical size={16} className="text-gray-400" />
                          </td>

                          <td className="p-4">
                            <Select value={variant.color} />
                          </td>

                          <td className="p-4">
                            <Select value={variant.storage} />
                          </td>

                          <td className="p-4">
                            <Input value={variant.sku} />
                          </td>

                          <td className="p-4">
                            <Input value={variant.price} />
                          </td>

                          <td className="p-4">
                            <Input value={variant.discount} />
                          </td>

                          <td className="p-4">
                            <Input value={variant.stock} />
                          </td>

                          <td className="p-4">
                            <button className="text-red-500">
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="col-span-3 space-y-6">
              {/* STATUS */}
              <div className="bg-white border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Product Status</h3>

                  <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-md font-medium">
                    DRAFT
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  Your product is in draft mode.
                </p>

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

              {/* TIPS */}
              <div className="bg-white border rounded-2xl p-6">
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
                <button className="flex-1 border rounded-xl py-3 font-medium hover:bg-gray-50">
                  Save as Draft
                </button>

                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-medium">
                  Save & Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium block mb-2">{label}</label>
      {children}
    </div>
  );
}

function Input({ value }: { value: string }) {
  return (
    <input
      defaultValue={value}
      className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
