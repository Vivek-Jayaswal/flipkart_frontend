import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../types/buyer/cart";

export const CART_STORAGE_KEY = "shopkart-cart";

export type UpdateCartItem = {
  itemId: string;
  quantity: number;
};

type CartInitialStateType = {
  totalItem: number;
  totalAmount: number;
  cartItem: CartItem[];
};

const getTotalCartItem = (data: CartInitialStateType) => {
  return data.cartItem.length || 0;
};

const addItemToCart = (items: CartItem[], payload: CartItem) => {
  const ci = items.find((d) => d.variantId === payload.variantId);

  if (ci) {
    ci.quantity = ci.quantity + payload.quantity;
    return [items, ci];
  } else {
    return items.push(payload);
  }
};

const recalculateCart = (state: CartInitialStateType) => {
  state.totalItem = state.cartItem.length || 0;
  // state.totalAmount = state.cartItem.reduce(
  //   (total, item) => total + getItemPrice(item) * item.quantity,
  //   0,
  // );
};

const getInitialState = (): CartInitialStateType => {
  if (typeof window === "undefined") {
    return { cartItem: [], totalAmount: 0, totalItem: 0 };
  }

  try {
    const savedItems = localStorage.getItem(CART_STORAGE_KEY);
    if (!savedItems) {
      return {
        totalAmount: 0,
        totalItem: 0,
        cartItem: [],
      };
    }
    const parsedItem = JSON.parse(savedItems) as CartInitialStateType;
    return {
      totalItem: getTotalCartItem(parsedItem),
      totalAmount: 0,
      cartItem: Array.isArray(parsedItem.cartItem) ? parsedItem.cartItem : [],
    };
  } catch (error) {
    return {
      totalItem: 0,
      totalAmount: 0,
      cartItem: [],
    };
  }
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: getInitialState(),
  reducers: {
    addToCart: (state, actions: PayloadAction<CartItem>) => {
      addItemToCart(state.cartItem, actions.payload);
      recalculateCart(state);
    },
    clearCart: (state) => {
      console.log("calling");
      ((state.totalAmount = 0), (state.totalItem = 0), (state.cartItem = []));
      localStorage.removeItem(CART_STORAGE_KEY);
    },
    updateCartQuantity: (state, actions: PayloadAction<UpdateCartItem>) => {
      const item = state.cartItem.find(
        (d) => d.variantId === actions.payload.itemId,
      ) as CartItem;
      if (item) {
        item.quantity = item.quantity = Math.min(
          Math.max(actions.payload.quantity, 1),
          10,
        );
      }
      recalculateCart(state);
    },
    removeItemFromCart: (state, actions: PayloadAction<string>) => {
      state.cartItem = state.cartItem.filter(
        (d) => d.variantId != actions.payload,
      );
      recalculateCart(state);
    },
  },
});

export const { addToCart, clearCart, updateCartQuantity, removeItemFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
