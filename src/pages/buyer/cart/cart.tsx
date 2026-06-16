import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../feature/store";
import { Button } from "../../../shared/reusable/button";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { baseUrl } from "../../../lib/api";
import {
  clearCart,
  removeItemFromCart,
  updateCartQuantity,
} from "../../../feature/cartSlice/cartSlice";

export const Cart = () => {
  const { totalItem, cartItem } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (cartItem.length <= 0) {
    return (
      <div>
        <div className="rounded shadow-[0px_0px_5px_#F1F3F6] border border-gray-200 p-4 mt-8 flex flex-col justify-center items-center">
          <div className="h-30 w-40">
            <img
              src="/empty-cart.png"
              alt=""
              className="w-full object-contain h-full"
            />
          </div>
          <div className="mt-4 flex flex-col items-center gap-4">
            <div className="text-center">
              <h3 className="text-2xl text-gray-600 font-bold">
                Your Cart Is Empty
              </h3>
              <p className="text-gray-400">
                Add products you like and they will appear here.
              </p>
            </div>
            <Button onClick={() => navigate("/")}>Shop Now</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 py-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="rounded border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h1 className="text-xl font-bold text-slate-950">
            My Cart ({totalItem || 0})
          </h1>
          <Button
            onClick={() => dispatch(clearCart())}
            variant="outline"
            className="text-sm font-semibold text-red-600 border-none"
          >
            Clear Cart
          </Button>
        </div>

        <div className="divide-y divide-slate-200">
          {cartItem.map((item) => {
            const price = item.salePrice || item.price || 0;
            return (
              <article
                key={item.productId}
                className="grid gap-4 p-5 sm:grid-cols-[120px_1fr]"
              >
                <div className="flex h-28 w-28 items-center justify-center rounded bg-slate-50 p-2">
                  <img
                    src={`${baseUrl}${item.thumbnail}`}
                    alt={item.productName}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex gap-4">
                    <div className="min-w-0 flex-1">
                      <h2 className="line-clamp-2 font-semibold text-slate-950">
                        {item.productName}
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.brandName} | SKU: {item.productSlug}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.attributes.map((attribute) => (
                          <span
                            key={attribute._id}
                            className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700"
                          >
                            {attribute.name}: {attribute.value}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() =>
                        dispatch(removeItemFromCart(item.variantId))
                      }
                      className="h-9 w-12 text-slate-500 hover:text-red-600"
                      aria-label="Remove item from cart"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center overflow-hidden rounded border border-slate-300">
                      <Button
                        // size="icon"
                        variant="outline"
                        onClick={() =>
                          dispatch(
                            updateCartQuantity({
                              itemId: item.variantId,
                              quantity: item.quantity - 1,
                            }),
                          )
                        }
                        className="h-9 w-12 border-none rounded-none"
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="grid h-9 w-12 place-items-center border-x border-slate-300 font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        // size="icon"
                        variant="outline"
                        onClick={() =>
                          dispatch(
                            updateCartQuantity({
                              itemId: item.variantId,
                              quantity: item.quantity + 1,
                            }),
                          )
                        }
                        className="h-9 w-12 border-none rounded-none"
                      >
                        <Plus size={14} />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-slate-950">
                        {/* {formatCurrency(price * item.quantity)} */} 0
                      </p>
                      {item.price > price ? (
                        <p className="text-sm text-slate-500 line-through">
                          {/* {formatCurrency(item.product.price * item.quantity)} */}
                          5
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <aside className="h-fit rounded border border-slate-200 bg-white p-5">
        <h2 className="border-b border-slate-200 pb-3 font-bold text-slate-950">
          Price Details
        </h2>
        <div className="space-y-3 py-4 text-slate-700">
          <div className="flex justify-between">
            <span>Items</span>
            <span>{totalItem}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{0}</span>
            {/* <span>{formatCurrency(totalAmount)}</span> */}
          </div>
          <div className="flex justify-between text-green-700">
            <span>Delivery</span>
            <span>Free</span>
          </div>
        </div>
        <div className="flex justify-between border-t border-slate-200 py-4 text-lg font-bold text-slate-950">
          <span>Total</span>
          <span>{0}</span>
          {/* <span>{formatCurrency(totalAmount)}</span> */}
        </div>
        <Button className="w-full rounded bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600">
          Place Order
        </Button>
      </aside>
    </div>
  );
};
