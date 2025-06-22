import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface CartState {
  items: Product[];
  loading: boolean;
}

const initialState: CartState = {
  items: [],
  loading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setCart: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.loading = false; //
    },
    clearCart: (state) => {
      state.items = [];
      state.loading = false;
    },
    setCartLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setCart,
  clearCart,
  setCartLoading,
} = cartSlice.actions;
export default cartSlice.reducer;
