import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartState } from '../types';

const localCart = localStorage.getItem('cart');
const initialState: CartState = localCart
  ? JSON.parse(localCart)
  : { cartItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existItem = state.cartItems.find(
        (product) => product._id === item._id,
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((product) =>
          product._id === existItem._id ? item : product,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );

      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
