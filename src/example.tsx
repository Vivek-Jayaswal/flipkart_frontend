# Flipkart Clone – Fully Working Product Creation Schema

This schema is designed for a production-level Flipkart/Amazon-style eCommerce platform.
It supports:

* Multi-category products
* Variants (size, color, storage, RAM, etc.)
* Seller-specific inventory
* Product specifications
* Images/videos
* SEO fields
* Pricing & discounts
* Ratings & reviews
* Shipping dimensions
* Return policy
* Brand management
* Search filters
* Flash sale support
* Product approval workflow

The examples below use MongoDB + Mongoose.

---

# 1. Brand Schema

```javascript
import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    logo: {
      url: String,
      public_id: String,
    },

    description: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Brand", brandSchema);
```

---

# 2. Category Schema

```javascript
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    image: {
      url: String,
      public_id: String,
    },

    level: {
      type: Number,
      default: 1,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
```

---

# 3. Product Variant Schema

Used for:

* Different sizes
* Different colors
* Different RAM/storage
* Different prices
* Different SKU

```javascript
import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
    },

    attributes: {
      color: String,
      size: String,
      ram: String,
      storage: String,
      material: String,
    },

    price: {
      type: Number,
      required: true,
    },

    salePrice: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    images: [
      {
        url: String,
        public_id: String,
      },
    ],

    weight: {
      type: Number,
    },

    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default productVariantSchema;
```

---

# 4. Product Specification Schema

```javascript
import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },

  value: {
    type: String,
    required: true,
  },
});

export default specificationSchema;
```

---

# 5. Main Product Schema

```javascript
import mongoose from "mongoose";
import productVariantSchema from "./productVariantSchema.js";
import specificationSchema from "./specificationSchema.js";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    shortDescription: {
      type: String,
      required: true,
      maxlength: 1000,
    },

    description: {
      type: String,
      required: true,
    },

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    thumbnail: {
      url: String,
      public_id: String,
    },

    gallery: [
      {
        url: String,
        public_id: String,
      },
    ],

    videoUrl: {
      type: String,
    },

    tags: [String],

    variants: [productVariantSchema],

    specifications: [specificationSchema],

    warranty: {
      type: String,
      default: "No Warranty",
    },

    returnPolicy: {
      type: String,
      default: "7 Days Return",
    },

    shippingInfo: {
      dispatchTime: {
        type: String,
        default: "2 Days",
      },

      freeShipping: {
        type: Boolean,
        default: false,
      },
    },

    ratings: {
      average: {
        type: Number,
        default: 0,
      },

      count: {
        type: Number,
        default: 0,
      },
    },

    totalSales: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },

    status: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected"],
      default: "pending",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isFlashSale: {
      type: Boolean,
      default: false,
    },

    flashSalePrice: {
      type: Number,
      default: 0,
    },

    flashSaleStart: Date,

    flashSaleEnd: Date,

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

productSchema.index({ title: "text", tags: "text" });

export default mongoose.model("Product", productSchema);
```

---

# 6. Product Review Schema

```javascript
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    title: {
      type: String,
    },

    comment: {
      type: String,
      required: true,
    },

    images: [
      {
        url: String,
        public_id: String,
      },
    ],

    likes: {
      type: Number,
      default: 0,
    },

    dislikes: {
      type: Number,
      default: 0,
    },

    verifiedPurchase: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
```

---

# 7. Inventory Schema

For advanced inventory management.

```javascript
import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    variantSku: {
      type: String,
      required: true,
    },

    warehouse: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      default: 0,
    },

    reservedQuantity: {
      type: Number,
      default: 0,
    },

    lowStockThreshold: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Inventory", inventorySchema);
```

---

# 8. Example Product JSON

```json
{
  "title": "iPhone 15 Pro Max",
  "slug": "iphone-15-pro-max",
  "shortDescription": "Latest Apple flagship smartphone",
  "description": "Detailed product description here",
  "brand": "6652a6d98f2a45b1f1234567",
  "categories": ["6652a7f08f2a45b1f1234599"],
  "seller": "6652b7f08f2a45b1f1234588",
  "tags": ["apple", "iphone", "smartphone"],
  "variants": [
    {
      "sku": "IPH15PM-256-BLK",
      "attributes": {
        "color": "Black",
        "storage": "256GB"
      },
      "price": 159999,
      "salePrice": 149999,
      "stock": 50,
      "isDefault": true
    }
  ],
  "specifications": [
    {
      "key": "Display",
      "value": "6.7 inch OLED"
    },
    {
      "key": "Processor",
      "value": "A17 Pro"
    }
  ]
}
```

---

# 9. Recommended Folder Structure

```bash
src/
 ├── models/
 │    ├── Brand.js
 │    ├── Category.js
 │    ├── Product.js
 │    ├── Review.js
 │    ├── Inventory.js
 │    ├── productVariantSchema.js
 │    └── specificationSchema.js
 │
 ├── controllers/
 │    ├── productController.js
 │
 ├── routes/
 │    ├── productRoutes.js
 │
 ├── services/
 │    ├── inventoryService.js
 │
 ├── utils/
 │    ├── slugify.js
```

---

# 10. Essential APIs for Flipkart Clone

## Product APIs

```bash
POST   /api/products
GET    /api/products
GET    /api/products/:id
PUT    /api/products/:id
DELETE /api/products/:id
```

## Category APIs

```bash
POST   /api/categories
GET    /api/categories
```

## Review APIs

```bash
POST   /api/reviews
GET    /api/reviews/:productId
```

## Inventory APIs

```bash
PATCH /api/inventory/update
```

---

# 11. Important Production Features

## Must Have

* Redis caching
* Elasticsearch / MeiliSearch
* Cloudinary image upload
* CDN for images
* Rate limiting
* JWT authentication
* Role-based access
* Admin approval system
* Order locking
* Inventory reservation
* Payment webhook validation
* Queue system (BullMQ)
* Audit logs
* Product moderation

---

# 12. Recommended Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB
* Redis
* BullMQ
* JWT
* Cloudinary
* Razorpay / Stripe

## Frontend

* Next.js
* Redux Toolkit
* Tailwind CSS
* React Query

## DevOps

* Docker
* Nginx
* AWS EC2
* S3
* GitHub Actions

---

# 13. Product Creation Validation Rules

```javascript
export const validateProduct = {
  title: {
    required: true,
    minLength: 5,
    maxLength: 300,
  },

  description: {
    required: true,
    minLength: 20,
  },

  variants: {
    required: true,
    minItems: 1,
  },

  price: {
    required: true,
    min: 1,
  },

  stock: {
    required: true,
    min: 0,
  },
};
```

---

# 14. Advanced Product Features

## Optional Enterprise Features

* AI-generated descriptions
* Auto-tagging
* Recommendation engine
* Dynamic pricing
* Geo pricing
* Multiple sellers for same product
* Buy now pay later
* Subscription products
* Product bundles
* Digital downloads
* Live shopping
* Affiliate products
* AR/VR previews
* Voice search

---

# 15. Final Recommendation

For a real Flipkart-scale architecture:

* Keep Product lightweight
* Move inventory to separate service
* Use event-driven architecture
* Use microservices after scaling
* Store search data separately
* Use CQRS for high traffic
* Use read replicas
* Use CDN aggressively
* Avoid giant MongoDB documents
* Paginate everything
* Use background jobs for heavy tasks




// components/ui/select.tsx

import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { createContext, useContext, useEffect, useRef, useState } from "react";

/* ------------------------------------------------ */
/* TYPES */
/* ------------------------------------------------ */

interface SelectContextType {
  open: boolean;
  setOpen: (open: boolean) => void;

  value: string;
  setValue: (value: string) => void;
}

const SelectContext = createContext<SelectContextType | null>(null);

function useSelect() {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("Select components must be inside Select");
  }

  return context;
}

/* ------------------------------------------------ */
/* ROOT */
/* ------------------------------------------------ */

interface SelectProps {
  children: React.ReactNode;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function Select({
  children,
  defaultValue = "",
  onValueChange,
}: SelectProps) {
  const [open, setOpen] = useState(false);

  const [value, setValueState] = useState(defaultValue);

  const setValue = (newValue: string) => {
    setValueState(newValue);
    onValueChange?.(newValue);
  };

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        value,
        setValue,
      }}
    >
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
}

/* ------------------------------------------------ */
/* TRIGGER */
/* ------------------------------------------------ */

interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function SelectTrigger({
  children,
  className = "",
}: SelectTriggerProps) {
  const { open, setOpen } = useSelect();

  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={`
        flex
        h-11
        w-full
        items-center
        justify-between
        rounded-md
        border
        border-gray-300
        bg-white
        px-3
        py-2
        text-sm
        ring-offset-white
        placeholder:text-gray-500
        focus:outline-none
        focus:ring-2
        focus:ring-black
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    >
      {children}

      {open ? (
        <ChevronUp className="h-4 w-4 opacity-50" />
      ) : (
        <ChevronDown className="h-4 w-4 opacity-50" />
      )}
    </button>
  );
}

/* ------------------------------------------------ */
/* VALUE */
/* ------------------------------------------------ */

interface SelectValueProps {
  placeholder?: string;
}

export function SelectValue({ placeholder }: SelectValueProps) {
  const { value } = useSelect();

  return (
    <span className={!value ? "text-gray-400" : ""}>
      {value || placeholder}
    </span>
  );
}

/* ------------------------------------------------ */
/* CONTENT */
/* ------------------------------------------------ */

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

export function SelectContent({
  children,
  className = "",
}: SelectContentProps) {
  const { open, setOpen } = useSelect();

  const ref = useRef<HTMLDivElement>(null);

  // outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={`
        absolute
        z-50
        mt-2
        w-full
        overflow-hidden
        rounded-md
        border
        border-gray-200
        bg-white
        shadow-md
        animate-in
        fade-in-0
        zoom-in-95
        ${className}
      `}
    >
      <div className="p-1">{children}</div>
    </div>
  );
}

/* ------------------------------------------------ */
/* ITEM */
/* ------------------------------------------------ */

interface SelectItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export function SelectItem({
  children,
  value,
  className = "",
}: SelectItemProps) {
  const { value: selectedValue, setValue, setOpen } = useSelect();

  const selected = selectedValue === value;

  return (
    <button
      type="button"
      onClick={() => {
        setValue(value);
        setOpen(false);
      }}
      className={`
        relative
        flex
        w-full
        cursor-default
        select-none
        items-center
        rounded-sm
        py-2
        pl-8
        pr-2
        text-sm
        outline-none
        hover:bg-gray-100
        focus:bg-gray-100
        ${className}
      `}
    >
      {selected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <Check className="h-4 w-4" />
        </span>
      )}

      {children}
    </button>
  );
}
