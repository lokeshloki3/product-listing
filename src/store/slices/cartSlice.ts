import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  productId: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartItem {
  productId: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ productId: number }>) => {
      state.items.push({ productId: action.payload.productId });
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
