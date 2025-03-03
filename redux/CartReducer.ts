import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
  id: number;
  name: string;
  price: number;
  quantity?: number;
}

interface CartItem {
  item: Item;
  category: string;
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ item: Item; category: string }>) => {
      const { item, category } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.item.id === item.id
      );

      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].item.quantity!++;
      } else {
        state.cart.push({
          item: { ...item, quantity: 1 },
          category,
        });
      }
    },

    incrementQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const itemPresent = state.cart.find((cartItem) => cartItem.item.id === action.payload.id);
      if (itemPresent) {
        itemPresent.item.quantity!++;
      }
    },

    decrementQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const itemPresent = state.cart.find((cartItem) => cartItem.item.id === action.payload.id);

      if (itemPresent && itemPresent.item.quantity === 1) {
        state.cart = state.cart.filter((cartItem) => cartItem.item.id !== action.payload.id);
      } else if (itemPresent) {
        itemPresent.item.quantity!--;
      }
    },

    cleanCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, cleanCart } = CartSlice.actions;
export default CartSlice.reducer;
