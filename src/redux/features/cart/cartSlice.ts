import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { Extra, Size } from "@prisma/client";

// Define a type for the slice state
export type CartItem = {
  name: string;
  id: string;
  image: string;
  basePrice: number;
  quantity?: number;
  size?: Size;
  extras?: Extra[];
};
type CartState = {
  items: CartItem[];
};
const getInitialCartItems = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

const initialState: CartState = {
  items: getInitialCartItems(),
};
// const initialCartItems = localStorage.getItem("cartItems");
// const initialState: CartState = {
//   items: initialCartItems ? JSON.parse(initialCartItems) : [],
// };

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      console.log(action.payload.extras);
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
        existingItem.size = action.payload.size;
        existingItem.extras = action.payload.extras;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCartItem: (state, action: PayloadAction<{ id: string }>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        if (existingItem.quantity == 1) {
          state.items = state.items.filter(
            (item) => item.id !== existingItem.id
          );
        } else {
          existingItem.quantity! -= 1;
        }
      }
    },
    removeItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addCartItem, clearCart, removeItemFromCart, removeCartItem } =
  cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
